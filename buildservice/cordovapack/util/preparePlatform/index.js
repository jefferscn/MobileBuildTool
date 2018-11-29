import { cordova } from 'cordova-lib';

function preparePlatform(platform){
    return new Promise(function (resolve, reject) {
        cordova.prepare({platforms: [platform], options: {} }, function (err, data) {
            if (err) {
                reject(new Error(err))
            }
            resolve(data);
        });
    });
};
export default preparePlatform;