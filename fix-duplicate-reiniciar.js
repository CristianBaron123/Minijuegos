const fs = require('fs');
const lines = fs.readFileSync('room-main.txt', 'utf8').split('\n');

// Delete lines 4444-4598 (0-indexed: 4443 to 4597)
// Keep lines 1-4443 and 4599-end
const before = lines.length;
const newLines = lines.filter((_, i) => i < 4443 || i >= 4598);

console.log('Before:', before, 'lines');
console.log('After:', newLines.length, 'lines');
console.log('Deleted:', before - newLines.length, 'lines');

fs.writeFileSync('room-main.txt', newLines.join('\n'), 'utf8');
console.log('Done!');
