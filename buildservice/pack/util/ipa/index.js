import path from 'path';
const spawn = require('child_process').spawn;
function ipa(logger) {
    const exportOptionsPlist = path.resolve('../exportOptions.plist');
    return new Promise((resolve, reject) => {
        const ls = spawn('xcodebuild', ['-exportArchive', '-archivePath', './build/yesapp.xcarchive', '-exportOptionsPlist', exportOptionsPlist, '-exportPath', './build']);
        ls.stdout.on('data', (data) => {
            logger.log('info', `Generate IPA. ${data}`);
        });
        ls.stderr.on('data', (data) => {
            data = data.toString();
            logger.log('error', `Generate IPA. ${data}`);
        });
        ls.on('close', (code) => {
            resolve(code);
        });
    });
}
export default ipa;
