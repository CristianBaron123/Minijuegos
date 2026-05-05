var fs = require('fs');
var path = require('path');

var botPath = path.join(__dirname, 'bot.js');
var mapasDir = path.join(__dirname, 'Mapas');
var botCode = fs.readFileSync(botPath, 'utf8');

var actualFiles = fs.readdirSync(mapasDir).filter(function(f) {
    return f.endsWith('.hbs') && !f.endsWith('.bak');
});

var re = /path\.join\(__dirname,\s*'Mapas',\s*'([^']+)'\)/g;
var m;
var replacements = [];

while ((m = re.exec(botCode)) !== null) {
    var origName = m[1];
    var fullPath = path.join(mapasDir, origName);
    
    if (fs.existsSync(fullPath)) continue;

    var decoded = origName
        .replace(/\\u029C/g, '\u029C').replace(/\\u1D00/g, '\u1D00').replace(/\\u1D05/g, '\u1D05')
        .replace(/\\u1D04/g, '\u1D04').replace(/\\u1D0F/g, '\u1D0F').replace(/\\u1D0D/g, '\u1D0D')
        .replace(/\\u1D0C/g, '\u1D0C').replace(/\\u1D07/g, '\u1D07').replace(/\\u1D1B/g, '\u1D1B')
        .replace(/\\u1D0B/g, '\u1D0B').replace(/\\u0299/g, '\u0299').replace(/\\u029F/g, '\u029F')
        .replace(/\\uD83C\\uDFC0/g, '\uD83C\uDFC0');

    var found = null;
    for (var i = 0; i < actualFiles.length; i++) {
        try {
            var a = Buffer.from(actualFiles[i], 'utf8');
            var b = Buffer.from(decoded, 'utf8');
            if (a.equals(b)) { found = actualFiles[i]; break; }
        } catch(e) {}
    }

    if (!found) {
        var hashMatch = decoded.match(/_([0-9a-f]{12})\.hbs$/);
        if (hashMatch) {
            for (var i = 0; i < actualFiles.length; i++) {
                if (actualFiles[i].includes(hashMatch[1])) { found = actualFiles[i]; break; }
            }
        }
    }

    if (!found) {
        var prefix = decoded.replace(/[^\x00-\x7F]/g, '').replace(/\[.*?\]/g, '').replace(/\.hbs$/, '').replace(/[-]+/g, '-').replace(/^[-]|[-]$/g, '').substring(0, 20).trim();
        if (prefix.length > 3) {
            for (var i = 0; i < actualFiles.length; i++) {
                var afNorm = actualFiles[i].replace(/[^\x00-\x7F]/g, '').replace(/\[.*?\]/g, '');
                if (afNorm.toLowerCase().includes(prefix.toLowerCase().substring(0, 10))) { found = actualFiles[i]; break; }
            }
        }
    }

    if (!found) {
        console.log('NOT FOUND: ' + origName);
        continue;
    }

    var simpleName = decoded.replace(/[^\x00-\x7F]/g, '').replace(/[\[\]\(\)]/g, '').replace(/\.hbs$/, '').replace(/[-]+/g, '-').replace(/^[-]|[-]$/g, '').replace(/ /g, '_').substring(0, 50) + '.hbs';
    if (simpleName.startsWith('_')) simpleName = simpleName.substring(1);

    var srcPath = path.join(mapasDir, found);
    var dstPath = path.join(mapasDir, simpleName);

    if (!fs.existsSync(dstPath)) {
        fs.copyFileSync(srcPath, dstPath);
        console.log('Copied: ' + found.substring(0, 40) + '... -> ' + simpleName);
    } else {
        console.log('Exists: ' + simpleName);
    }

    replacements.push({ from: origName, to: simpleName });
}

var newCode = botCode;
replacements.forEach(function(r) {
    newCode = newCode.replace("'Mapas', '" + r.from + "'", "'Mapas', '" + r.to + "'");
});

fs.writeFileSync(botPath, newCode, 'utf8');
console.log('\nbot.js updated with ' + replacements.length + ' replacements');
