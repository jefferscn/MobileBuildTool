import { cordova } from 'cordova-lib';

function buildApp(platform, appBuildType) {
    var buildType = appBuildType === 'release' ? true : platform == 'ios';
    return new Promise(function (resolve, reject) {
        cordova.build({
            platforms: [platform],
            options: {"release": buildType, "silent": false, "device": true}
        }, function (err, data) {
            if (err) {
                reject(new Error(err))
            }
            resolve(data);
        });
    });
};

export default buildApp;