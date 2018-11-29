//Change cordova/www/js/lib/config/config.js
import fs from 'fs-extra';

function changelibConfigJSPath(libConfigJSPath, projectDirName){
    console.log(process.cwd());
    console.log(libConfigJSPath);
    return new Promise(function (resolve, reject) {
        var configJs = 'define(["lib/' + projectDirName + '/config"],function(config) {\n' +
            '    return config;\n' +
            '});';
        fs.writeFile(libConfigJSPath, configJs,function(err, data) {
            if(err){
                reject(new Error(err))
            }
            resolve(data);
        });
    });
};
export default changelibConfigJSPath;
