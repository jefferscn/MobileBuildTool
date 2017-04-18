const spawn = require('child_process').spawn;
function archive(logger) {
    return new Promise((resolve, reject) => {
        const ls = spawn('xcodebuild', ['-project', 'yesapp.xcodeproj', '-scheme', 'yesapp', '-sdk', 'iphoneos', 'archive', '-archivePath', './build/yesapp.xcarchive']);
        ls.stdout.on('data', (data) => {
            logger.log('info', `Archive. ${data}`);
        });
        ls.stderr.on('data', (data) => {
            logger.log('error', `Archive. ${data}`);
            reject(data.toString());
        });
        ls.on('close', (code) => {
            resolve(code);
        });
    });
}
export default archive;
