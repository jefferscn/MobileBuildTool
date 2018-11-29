import fs from 'fs-extra';
import path from 'path';

function releaseFile(platform, appPlugin,appBuildType, apkLink, ipaLink, appName){
    return new Promise(function (resolve, reject) {
        var src;
        var dest;
        switch (platform){
            case 'android':
                var isCrosswalk = /crosswalk/;
                if( isCrosswalk.test(appPlugin.toString()) ){
                    src = ['platforms/android/build/outputs/apk/android-armv7-',appBuildType,'.apk'].join('');

                }else{
                    src = ['platforms/android/build/outputs/apk/android-',appBuildType,'.apk'].join('');
                }
                dest = apkLink;
                break;
            case 'ios':
                src = ['platforms/ios/build/device/',appName,'.ipa'].join('');
                dest = ipaLink;
                break;
            default:
                reject('The platform is not support.') ;
        };
        // console.log('cwd releaseFile');
        // console.log('cwd',process.cwd());
        // console.log('__dirname', __dirname);
        // console.log(src, dest);
        // src = path.resolve(process.cwd(),src);
        // dest = path.resolve(process.cwd(),dest);
        // console.log(src, dest);
        // fs.copy(src, dest,function (err, data) {
        //     if (err) {
        //         console.log(err);
        //         reject(new Error(err));
        //         return;
        //     }
        //     resolve(data);
        // });
    });
};
export default releaseFile;
