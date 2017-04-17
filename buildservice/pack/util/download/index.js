import request from 'request';
import fs from 'fs';
function download(url, file) {
    return new Promise((resolve, reject) => {
        const stream = request(url).pipe(fs.createWriteStream(file));
        stream.on('error', (err) => {
            reject(err);
        });
        stream.on('finish', () => {
            resolve('Download success');
        });

    })


}
export default download;
