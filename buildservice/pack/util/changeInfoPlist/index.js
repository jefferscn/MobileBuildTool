import plist from 'plist';
import fs from 'fs';

async function changeInfoPlist(infoPlist, obj) {
    const xml = await readFileAsync(infoPlist);
    let json = plist.parse(xml.toString());
    Object.assign(json, obj);
    await writeFileAsync(infoPlist, plist.build(json));

}
function readFileAsync(file) {
    return new Promise(function (resolve, reject) {
        fs.readFile(file, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    })
}
function writeFileAsync(file, content) {
    return new Promise(function (resolve, reject) {
        fs.writeFile(file, content, (err) => {
            if (err) reject(err);
            resolve(`Write file ${file} success.`);
        });
    })
}
export default changeInfoPlist;
