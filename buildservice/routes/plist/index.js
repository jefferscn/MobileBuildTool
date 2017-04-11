var fs = require('fs');
var plist = require('plist');
function plistGen(manifestJson) {
    return new Promise( (resolve, reject) => {
        var data = plist.build(manifestJson);
        var fileName = 'manifest.plist';
        fs.writeFile(fileName, data, (err) => {
            if (err) {
                reject(err)
            };
            resolve(`${fileName} was saved!`);
        });

    })
};
module.exports = plistGen;
