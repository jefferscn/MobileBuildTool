const spawn = require('child_process').spawn;
function archive() {
    return new Promise((resolve, reject) => {
        const ls = spawn('xcodebuild', ['-project', 'yesapp.xcodeproj', '-scheme', 'yesapp', '-sdk', 'iphoneos', 'archive', '-archivePath', './build/yesapp.xcarchive']);
        ls.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });
        ls.stderr.on('data', (data) => {
            console.log(data);
            reject(data.toString());
        });
        ls.on('close', (code) => {
            resolve(code);
        });
    });
}
export default archive;
