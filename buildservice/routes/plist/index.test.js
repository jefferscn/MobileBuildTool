var plist = require('./index');

var manifestJson = {
    "items": [{
        "assets": [{
            "kind": "software-package",
            "url": "https://dev.bokesoft.com/yigomobile/public/release/com.bokesoft.mobile/ios/yesapp.ipa"
        }],
        "metadata": {
            "bundle-identifier": "com.bokesoft.mobile",
            "bundle-version": "1.0.1",
            "kind": "software",
            "title": "YigoMobile"
        }
    }]
};

plist(manifestJson)
