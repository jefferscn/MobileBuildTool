import fs from 'fs-extra';
import cheerio from 'cheerio';

const normalPlugin = 'cordova-plugin-geolocation';
const androidPlugin = 'cordova-plugin-geoloaction-baidu-android';
const iosPlugin = 'cordova-plugin-geolocation-baidu';

const needScript = (pluginList) => {
    console.log(pluginList);
    const pluginListStr = pluginList.toString();

    if (pluginListStr.indexOf(normalPlugin) !== -1 ||
        pluginListStr.indexOf(androidPlugin) !== -1 ||
        pluginListStr.indexOf(iosPlugin) !== -1
    ) {
        return true;
    }
    return false;
};

const script = '\n    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=fSDn0wEEkKVVunWlh1GqyMoU"></script>';
const addBaiduMapScript = (htmlPath, pluginList) => new Promise((resolve, reject) => {
    // determine if need to add baidu map script
    const isNeedScript = needScript(pluginList);
    if (!isNeedScript) {
        resolve();
    }
    // find location
    try {
        const $ = cheerio.load(fs.readFileSync(htmlPath), {});
        // insert script in head first
        if ($) {
            $('head').prepend(script);
        }
        const newHtml = $.html();
        fs.writeFile(htmlPath, newHtml, (err, data) => {
            if (err) {
                reject(new Error(err));
            }
            resolve(data);
        });
    } catch (e) {
        reject(e);
    }
});

export default addBaiduMapScript;
