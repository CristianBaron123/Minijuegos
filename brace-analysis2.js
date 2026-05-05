const fs = require('fs');
const lines = fs.readFileSync('room-main.txt', 'utf8').split('\n');

let depth = 0;
let inString = false;
let stringChar = '';
let inLineComment = false;
let inBlockComment = false;

const depthAtLine = [];

for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    inLineComment = false;
    
    for (let j = 0; j < line.length; j++) {
        const ch = line[j];
        const next = line[j + 1];
        
        if (inBlockComment) {
            if (ch === '*' && next === '/') { inBlockComment = false; j++; }
            continue;
        }
        if (inLineComment) continue;
        
        if (inString) {
            if (ch === '\\') { j++; continue; }
            if (ch === stringChar) { inString = false; }
            continue;
        }
        
        if (ch === '/' && next === '/') { inLineComment = true; continue; }
        if (ch === '/' && next === '*') { inBlockComment = true; j++; continue; }
        if (ch === '`') { inString = true; stringChar = '`'; continue; }
        if (ch === '"') { inString = true; stringChar = '"'; continue; }
        if (ch === "'") { inString = true; stringChar = "'"; continue; }
        
        if (ch === '{') depth++;
        if (ch === '}') depth--;
    }
    
    depthAtLine.push(depth);
}

// Find all transitions from >=0 to <0
console.log('=== ALL NEGATIVE DEPTH TRANSITIONS ===');
let prevD = 0;
for (let i = 0; i < depthAtLine.length; i++) {
    if ((depthAtLine[i] < 0 && prevD >= 0) || (depthAtLine[i] >= 0 && prevD < 0)) {
        console.log('\n--- Transition at line ' + (i + 1) + ' (depth ' + prevD + ' -> ' + depthAtLine[i] + ') ---');
        // Show context
        let start = Math.max(0, i - 3);
        let end = Math.min(lines.length - 1, i + 10);
        for (let k = start; k <= end; k++) {
            console.log('  ' + (k + 1) + ' [d=' + depthAtLine[k] + ']: ' + lines[k].substring(0, 100));
        }
    }
    prevD = depthAtLine[i];
}

// Count total negative regions
let negRegions = 0;
let inNeg = false;
let negStart = 0;
console.log('\n=== NEGATIVE DEPTH REGIONS ===');
for (let i = 0; i < depthAtLine.length; i++) {
    if (depthAtLine[i] < 0 && !inNeg) {
        inNeg = true;
        negStart = i + 1;
        negRegions++;
    } else if (depthAtLine[i] >= 0 && inNeg) {
        inNeg = false;
        console.log('Region ' + negRegions + ': lines ' + negStart + ' - ' + i + ' (back to depth=' + depthAtLine[i] + ')');
    }
}
if (inNeg) {
    console.log('Region ' + negRegions + ': lines ' + negStart + ' - ' + lines.length + ' (END OF FILE, final depth=' + depthAtLine[depthAtLine.length - 1] + ')');
}
console.log('Total negative regions:', negRegions);
