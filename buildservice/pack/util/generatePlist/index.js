import fs from 'fs';
import plist from 'plist';
function genratePlist(manifestJson) {
    return new Promise( (resolve, reject) => {
        const data = plist.build(manifestJson);
        const fileName = 'manifest.plist';
        fs.writeFile(fileName, data, (err) => {
            if (err) {
                console.log(err)
                reject(err)
            };
            resolve(`${fileName} was saved!`);
        });

    })
}
export default genratePlist;
