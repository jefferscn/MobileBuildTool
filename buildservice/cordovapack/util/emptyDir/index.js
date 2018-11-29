import fs from 'fs-extra';
function emptyDir(dir) {
    return new Promise((resolve, reject) => {
        fs.emptydir(dir, function (err, data) {
            if (err) {
                reject(new Error(err))
            }
            resolve(data);
        });
    });
};
export default emptyDir;
