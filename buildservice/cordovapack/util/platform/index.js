import { cordova } from 'cordova-lib';

function addPlatform(platform) {
    return new Promise((resolve, reject) => {
        cordova.platform('add', platform, {'verbose': true}, (err, data) => {
            if (err) {
                console.log(err);
                reject(new Error(err))
            }
            resolve(data);
        });
    });
};
export default addPlatform;
