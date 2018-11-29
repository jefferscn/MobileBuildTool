function removePlatform(platform){
    return new Promise(function (resolve, reject) {
        cordova.platform('remove', platform,function (err, data) {
            if (err) {
                reject(new Error(err))
            }
            resolve(data);
        });
    });
};

export default removePlatform;