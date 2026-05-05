var fs = require('fs');
var path = require('path');

var code = fs.readFileSync('bot.js', 'utf8');
var mapasDir = path.join(__dirname, 'Mapas');
var files = fs.readdirSync(mapasDir);

var re = /path\.join\(__dirname,\s*'Mapas',\s*'([^']+)'\)/g;
var m, fixes = 0;

while ((m = re.exec(code)) !== null) {
    var orig = m[1];
    var decoded = orig.replace(/\\u([0-9a-fA-F]{4})/g, function(_, hex) {
        return String.fromCharCode(parseInt(hex, 16));
    });
    var testPath = path.join(mapasDir, decoded);
    if (!fs.existsSync(testPath)) {
        var ascii = decoded.replace(/[^\x00-\x7F]/g, '').replace(/  +/g, ' ').replace(/ +/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '').replace(/[\[\]]/g, '');
        var found = files.find(function(f) {
            var fAscii = f.replace(/[^\x00-\x7F]/g, '').replace(/  +/g, ' ').replace(/ +/g, '_').replace(/_+/g, '_').replace(/^_|_$/g, '').replace(/[\[\]]/g, '');
            return fAscii === ascii || (ascii.length > 5 && fAscii.indexOf(ascii.substring(0, 15)) === 0);
        });
        if (found) {
            code = code.replace("'Mapas', '" + orig + "'", "'Mapas', '" + found + "'");
            fixes++;
            console.log('OK: ' + decoded.substring(0, 40) + ' -> ' + found);
        } else {
            console.log('MISSING: ' + decoded.substring(0, 50));
        }
    }
}

fs.writeFileSync('bot.js', code, 'utf8');
console.log('Total fixes: ' + fixes);
