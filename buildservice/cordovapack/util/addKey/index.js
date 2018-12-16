import fs from 'fs-extra';

function addKey(appIosMp) {
    console.log(' 签名信息：' + JSON.stringify(appIosMp));
    return new Promise(function (resolve, reject) {
        var json = {
            "android": {
                "release": {
                    "keystore": "../../key/android.keystore",
                    "storePassword": "bokesoft",
                    "alias": "android",
                    "password": "bokesoft",
                    "keystoreType": ""
                },
                "debug": {
                    "keystore": "../../key/android.keystore",
                    "storePassword": "bokesoft",
                    "alias": "android",
                    "password": "bokesoft",
                    "keystoreType": ""
                }
            },
            "ios": {
                "debug": {
                    "codeSignIdentitiy": "iPhone Development",
                    "packageType": "enterprise",
                    "developmentTeam": "5C83KHGVSN",
                    "provisioningProfile": "2538e3a2-e134-4968-9d67-6f3220027cc4"
                },
                "release": {
                    "codeSignIdentitiy": "iPhone Distribution",
                    "packageType": "enterprise",
                    "developmentTeam": "5C83KHGVSN",
                    "provisioningProfile": "2538e3a2-e134-4968-9d67-6f3220027cc4"

                }
            }
        };
        //修改mp
        json.ios.debug.developmentTeam = appIosMp.TeamIdentifier;
        json.ios.debug.provisioningProfile = appIosMp.UUID;
        json.ios.release.developmentTeam = appIosMp.TeamIdentifier;
        json.ios.release.provisioningProfile = appIosMp.UUID;
        var json = JSON.stringify(json);
        fs.writeFile('build.json', json, function (err, data) {
            if (err) {
                reject(new Error(err))
            }
            resolve(data);
        });
    });
}
export default addKey;
