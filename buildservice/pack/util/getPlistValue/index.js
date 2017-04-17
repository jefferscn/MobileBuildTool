import plist from 'plist';
import fs from 'fs';
async function getPlistValue(infoPlist, propKey) {
    const xml = await readFileAsync(infoPlist);
    const xmlStr = xml.toString();
    const json = plist.parse(xmlStr);
    const propKeyArr = propKey.trim().split('.');
    let value = json;
    propKeyArr.forEach((v) => {
        value = value[v];
    });
    return value;
}
function readFileAsync(file) {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) reject(err);
            resolve(data);
        });
    });
}
export default getPlistValue;
