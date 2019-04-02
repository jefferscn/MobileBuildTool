module.exports = function(ctx) {
    // make sure android platform is part of build
    if (ctx.opts.platforms.indexOf('android') < 0) {
        return;
    }
    console.log('append max_aspect');
    var fs = ctx.requireCordovaModule('fs'),
        path = ctx.requireCordovaModule('path');
        cheerio = ctx.requireCordovaModule('cheerio');

    var platformRoot = path.join(ctx.opts.projectRoot, 'platforms/android');
    var androidManifestXML = path.join(platformRoot, 'AndroidManifest.xml');

    var $ = cheerio.load(fs.readFileSync(androidManifestXML), {
        decodeEntities: false,
        xmlMode: true
    });
    if ($) {
        var max_aspect = '<meta-data android:name="android.max_aspect" android:value="2.1" />';
        $('application','manifest').append(max_aspect);
        fs.writeFileSync(androidManifestXML, $.xml());
    }
};