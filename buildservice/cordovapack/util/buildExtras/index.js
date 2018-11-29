import fs from 'fs-extra';

function buildExtras(){
    const lintOptions =
        "android {\n" +
        "    lintOptions {\n" +
        "        disable 'MissingTranslation'\n" +
        "        disable 'ExtraTranslation'\n" +
        "    }\n" +
        "}";
    return new Promise(function (resolve, reject) {

        fs.writeFile('platforms/android/build-extras.gradle', lintOptions, function (err, data) {
            if (err) {
                reject(new Error(err))
            }
            resolve(data);
        });
    });

};
export default buildExtras;