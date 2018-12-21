import upload from './util/upload';
import config from '../config';
var fs = require('fs-extra');
var plist = require('plist');
var url = require('url');
var manifestJson = {
    "items": [{
        "assets": [{
            "kind": "software-package",
            "url": "https://www.zhouzhongyuan.com/yigomobile/public/ios/1463708886000/Yigo520-debug.ipa"
        }],
        "metadata": {
            "bundle-identifier": "com.bokesoft.ceo",
            "bundle-version": "1.2.7",
            "kind": "software",
            "title": "车掌柜"
        }
    }]
};
var assets = manifestJson.items[0].assets;
var metadate = manifestJson.items[0].metadata;
async function plistGen(o, ipaUrl) {
    // return new Promise(function (resolve, reject) {
    console.log('IPA URL:' + ipaUrl)
    var manifestUrl = encodeURI(ipaUrl);
    console.log('manifestUrl:' + manifestUrl);
    assets[0].url = url.resolve(config.server.downloadIpaBase, manifestUrl);
    metadate['bundle-identifier'] = o.appPackageName;
    metadate['bundle-version'] = o.appVersion;
    metadate['title'] = o.appName;
    console.log(manifestJson);
    var data = plist.build(manifestJson);
    var fileName = 'manifest.plist';
    fs.writeFileSync(fileName, data);
    const resp = await upload(config.server.upload, fileName);
    return resp.url;
};
module.exports = plistGen;