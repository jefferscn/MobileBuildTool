import cheerio from 'cheerio';
import fs from 'fs-extra';
import { configparser } from 'cordova-lib';

function processCode(configXML, appVersion, appPackageName, appName, appDescription, appIcon, androidTargetSdkVersion, appPlatform, appBuildType){
    var configPath = configXML;
    return new Promise(function (resolve, reject) {
        var conf = new configparser(configPath);
        if (appVersion) conf.setVersion(appVersion);
        console.log(`packageName = ${appPackageName}`);
        if (appPackageName) conf.setPackageName(appPackageName);
        if (appName) conf.setName(appName);
        if (appDescription) conf.setDescription(appDescription);
        //TODO icon
        var icons = conf.getIcons(appPlatform);
        if(appIcon){
            conf.addElement('icon',{'src':appIcon});
        }
        //TODO access
        conf.addElement('access',{'origin':'cdvfile://*'});
        //TODO preference
        conf.addElement('preference',{'name':'WebViewBounce','value':'false'});
        conf.addElement('preference',{'name':'DisallowOverscroll','value':'true'});
        conf.addElement('preference',{'name':'Orientation','value':'portrait'});
        conf.addElement('allow-navigation',{'href':'*'});
        //防止Android6.0（API 23）权限出现问题,强制API为22
        conf.addElement('preference',{'name':'android-targetSdkVersion','value': androidTargetSdkVersion || '22'});
        //splash image
        conf.write();
        try {
            var $ = cheerio.load(fs.readFileSync(configXML), {
                decodeEntities: false,
                xmlMode: true
            });
            if ($) {
                var splash =
                    '<platform name="ios">'+
                    '<splash src="../../res/ios/Default~iphone.png" width="320" height="480"/>'+
                    '<splash src="../../res/ios/Default@2x~iphone.png" width="640" height="960"/>'+
                    '<splash src="../../res/ios/Default-Portrait~ipad.png" width="768" height="1024"/>'+
                    '<splash src="../../res/ios/Default-Portrait@2x~ipad.png" width="1536" height="2048"/>'+
                    '<splash src="../../res/ios/Default-Landscape~ipad.png" width="1024" height="768"/>'+
                    '<splash src="../../res/ios/Default-Landscape@2x~ipad.png" width="2048" height="1536"/>'+
                    '<splash src="../../res/ios/Default-568h@2x~iphone.png" width="640" height="1136"/>'+
                    '<splash src="../../res/ios/Default-667h.png" width="750" height="1334"/>'+
                    '<splash src="../../res/ios/Default-736h.png" width="1242" height="2208"/>'+
                    '<splash src="../../res/ios/Default-Landscape-736h.png" width="2208" height="1242"/>'+
                    '</platform>';
                $('widget').append(splash);

                //content
                //<content src="index.html"/>
                if(appBuildType === 'debug'){
                    $('content').attr('src','serverpath.html');
                }

                fs.writeFile(configXML,$.xml(),function(err,data){
                    if (err) {
                        reject(new Error(err))
                    }

                    resolve(data);
                });
            }
        }catch(ex){
            reject(ex)
        }
    });
};
export default processCode;