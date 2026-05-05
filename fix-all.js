const fs = require('fs');
const lines = fs.readFileSync('room-main.txt', 'utf8').split('\n');

// Fix 1: Move orphaned botState properties (lines 135-163, 0-indexed) inside botState object
// botState closes at line 106 (0-indexed 105) with };
const orphanedProps = lines.slice(134, 163); // lines 135-163 (0-indexed 134-162)
// These are object properties like "    titanValues: {},"

// Remove orphaned lines and the extra };
const newLines = [];
for (let i = 0; i < lines.length; i++) {
    if (i >= 134 && i <= 162) continue; // Skip orphaned properties (lines 135-163)
    newLines.push(lines[i]);
}

// Now find the botState closing }; and insert properties before it
const result = [];
for (let i = 0; i < newLines.length; i++) {
    // The botState closing is at original line 106, which is now at a different index
    // because we removed lines 135-163 (29 lines). But it's before line 135 so index is same.
    if (newLines[i] === '};' && i > 100 && i < 110) {
        // This is the botState closing - insert properties before it
        for (const prop of orphanedProps) {
            result.push(prop);
        }
        result.push(newLines[i]);
    } else {
        result.push(newLines[i]);
    }
}

console.log('After Fix 1:', result.length, 'lines (was', lines.length, ')');

// Fix 2: Remove 3 duplicate !reiniciar handler bodies
// The correct handler is at lines 4407-4450 (1-indexed) = 4406-4449 (0-indexed)
// But after Fix 1, line numbers shifted by 0 (we removed 29 and added 29 back = same count)
// Actually no: we removed lines 135-163 (29 lines) and added them back in a different place
// So total line count is the same, but the line numbers of content after line 163 shifted.

// Wait, let me re-check. We removed 29 lines (135-163) from the middle.
// Then we inserted 29 lines before line 106.
// So lines after 163 are now at index-29+0 = index-29... no.
// Before: lines 0-134, orphaned(135-163), lines 164+
// After: lines 0-105, newlines(orphaned props), }, lines 106-134(original), lines 164+(original)
// Hmm, this is confusing. Let me just search for the patterns.

const finalLines = [];
let skipFrom = -1;
let skipTo = -1;

// Find "if (message.toLowerCase().startsWith('!reiniciar'))" 
// Then find its closing }
// Then skip everything that looks like duplicate body until the next real code
for (let i = 0; i < result.length; i++) {
    if (result[i].includes("if (message.toLowerCase().startsWith('!reiniciar'))")) {
        // Found the start of the correct handler
        // Find its closing }
        let depth = 0;
        let handlerEnd = -1;
        for (let j = i; j < result.length; j++) {
            for (let k = 0; k < result[j].length; k++) {
                const ch = result[j][k];
                const nx = result[j][k+1];
                // Skip strings and comments
                if (ch === '/' && nx === '/') break;
                if (ch === '{') depth++;
                if (ch === '}') depth--;
            }
            if (depth <= 0 && j > i) {
                handlerEnd = j;
                break;
            }
        }
        
        console.log('!reiniciar handler: lines', (i+1), 'to', (handlerEnd+1));
        
        // Now check if next line starts a duplicate
        let dupStart = handlerEnd + 1;
        // Skip empty lines
        while (dupStart < result.length && result[dupStart].trim() === '') dupStart++;
        
        // Check if this is a duplicate (starts with indented code about isOwner)
        if (dupStart < result.length && (result[dupStart].includes('var isOwner') || result[dupStart].includes('Verificar si es Owner') || result[dupStart].includes('Verificar permisos'))) {
            // Find where duplicates end - look for the next top-level if or function or comment block
            let dupEnd = dupStart;
            for (let j = dupStart; j < result.length; j++) {
                const trimmed = result[j].trim();
                // Check if we've reached non-duplicate code
                if (j > dupStart + 5 && (
                    trimmed.startsWith('if (message') ||
                    trimmed.startsWith('if (botState.rifa') ||
                    trimmed.startsWith('// ===') && !trimmed.includes('reiniciar')
                )) {
                    // Go back to find the closing }
                    for (let k = j - 1; k >= dupStart; k--) {
                        if (result[k].trim() === '}') {
                            dupEnd = k;
                            break;
                        }
                    }
                    break;
                }
                dupEnd = j;
            }
            
            skipFrom = dupStart;
            skipTo = dupEnd;
            console.log('Duplicates to skip: lines', (skipFrom+1), 'to', (skipTo+1));
        }
        
        break;
    }
}

for (let i = 0; i < result.length; i++) {
    if (skipFrom >= 0 && i >= skipFrom && i <= skipTo) continue;
    finalLines.push(result[i]);
}

console.log('After Fix 2:', finalLines.length, 'lines (deleted', skipFrom >= 0 ? (skipTo - skipFrom + 1) : 0, ')');

fs.writeFileSync('room-main.txt', finalLines.join('\n'), 'utf8');
console.log('Done!');
