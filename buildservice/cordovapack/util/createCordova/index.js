import { cordova } from 'cordova-lib';

function createCordova(appName, appNameSpace){
    return new Promise(function (resolve, reject) {
        cordova.create(appName, appNameSpace, appName,  function (err, data) {
            if (err) {
                reject(new Error(err))
            }
            resolve(data);
        });
    });
};
export default createCordova;