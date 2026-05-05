const fs = require('fs');
const lines = fs.readFileSync('room-main.txt', 'utf8').split('\n');

// The correct !reiniciar handler closes at line 4450 (0-indexed 4449) with "    }"
// Lines 4451-4496 are duplicate 1
// Lines 4497-4541+ are duplicate 2
// We need to find where the duplicates end

// Find the end of the second duplicate
let endLine = -1;
for (let i = 4496; i < lines.length; i++) {
    // Look for the next command handler (starts with "    if" or "    // ==")
    if (i > 4496 && (lines[i].match(/^\s+if \(message/) || lines[i].match(/^\s+\/\/ =/))) {
        // Go back to find the closing of the previous block
        for (let j = i - 1; j >= 4496; j--) {
            if (lines[j].trim() === '}') {
                endLine = j;
                break;
            }
        }
        break;
    }
}

console.log('Line 4450 (correct closing):', lines[4449].substring(0, 80));
console.log('Duplicate 1 starts at 4451:', lines[4450].substring(0, 80));
console.log('Duplicate 1 ends at 4496:', lines[4495].substring(0, 80));
console.log('Duplicate 2 starts at 4497:', lines[4496].substring(0, 80));
console.log('Calculated end line (0-indexed):', endLine);
if (endLine >= 0) {
    console.log('End line content:', lines[endLine].substring(0, 80));
    console.log('Next line:', lines[endLine + 1].substring(0, 80));
    console.log('Next+1:', lines[endLine + 2].substring(0, 80));
}

// Delete lines 4450 to endLine (0-indexed)
const before = lines.length;
const newLines = lines.filter((_, i) => i < 4450 || i > endLine);
console.log('Before:', before, 'After:', newLines.length, 'Deleted:', before - newLines.length);

fs.writeFileSync('room-main.txt', newLines.join('\n'), 'utf8');
