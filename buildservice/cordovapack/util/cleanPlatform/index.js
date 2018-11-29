function cleanPlatform(platform){
    return new Promise(function (resolve, reject) {
        cordova.clean(platform,{'verbose': true},function (err, data) {
            if (err) {
                reject(new Error(err))
            }
            resolve(data);
        });
    });
};
export default cleanPlatform;