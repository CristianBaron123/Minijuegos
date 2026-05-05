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

console.log('Final depth:', depth);

// Show where depth goes negative
let firstNeg = -1;
for (let i = 0; i < depthAtLine.length; i++) {
    if (depthAtLine[i] < 0) {
        firstNeg = i + 1;
        break;
    }
}
console.log('First negative depth at line:', firstNeg);

// Show depth at every 100 lines
console.log('\nDepth at every 100 lines:');
for (let i = 0; i < depthAtLine.length; i += 100) {
    console.log('  Line ' + (i + 1) + ': depth=' + depthAtLine[i]);
}

// Show transitions around where depth goes negative
if (firstNeg > 0) {
    console.log('\nDepth transitions near first negative (line ' + firstNeg + '):');
    let start = Math.max(0, firstNeg - 200);
    let prevDepth = depthAtLine[start - 1] || 0;
    for (let i = start; i < Math.min(depthAtLine.length, firstNeg + 50); i++) {
        if (depthAtLine[i] !== prevDepth || (i + 1) >= firstNeg - 20) {
            console.log('  Line ' + (i + 1) + ': depth=' + depthAtLine[i] + '  |  ' + lines[i].substring(0, 80));
            prevDepth = depthAtLine[i];
        }
    }
}
