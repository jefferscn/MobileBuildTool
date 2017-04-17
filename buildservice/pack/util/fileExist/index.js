import fs from 'fs';
function fileExist(file) {
    return new Promise((resolve, reject) => {
        fs.open(file, 'r', (err) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    reject(false);
                }
            }
            resolve(true);
        });
    })

}
export default fileExist;
