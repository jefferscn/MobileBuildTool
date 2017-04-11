import fs from 'fs-extra';
function release() {
    const PWD = workspaceFullPath;
    return new Promise((resolve, reject) => {
        fs.copy(`${PWD}/build/yesapp.ipa`, releaseFullPath, (err) => {
            if (err) {
                reject(err);
            }
            resolve('success!');
        });
    });
}
export default release;
