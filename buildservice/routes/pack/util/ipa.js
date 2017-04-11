import path from 'path';
const spawn = require('child_process').spawn;
function ipa(exportOption) {
    const exportOptionsPlist = exportOption || path.resolve('../exportOptions.plist');
    return new Promise((resolve, reject) => {
        const ls = spawn('xcodebuild', ['-exportArchive', '-archivePath', './build/yesapp.xcarchive', '-exportOptionsPlist', exportOptionsPlist, '-exportPath', './build']);
        ls.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });
        ls.stderr.on('data', (data) => {
            data = data.toString();
            console.log(data);
        });
        ls.on('close', (code) => {
            resolve(code);
        });
    });
}
export default ipa;
