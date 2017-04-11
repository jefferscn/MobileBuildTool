//generater-html
var fs = require('fs-extra')
var _ = require('underscore');
fs.readFile('index.html', 'utf8', function(err, html){
    function getLocalTime(date){
        var a = new Date(date);
        const year = a.getFullYear();
        const month = a.getMonth() + 1;
        const day = a.getDate();
        return [year,month,day].join('-')
    }
    var compiled = _.template(html);
    if(data.androidUpdateTime){
        const temp = getLocalTime(data.androidUpdateTime);
        data.androidUpdateTime = temp.toString();

    }
    if(data.iosUpdateTime){
        const temp = getLocalTime(data.iosUpdateTime);

        data.iosUpdateTime = temp.toString();
    }
    var QRCode = require('qrcode');
    const pageUrl = `${serverPath}release/${data.appPackageName}/index.html`;
    QRCode.toDataURL(pageUrl,function(err,url){
        if(err){
            console.log(err);
            return err;
        }
        data.url = url;
        const result = compiled(data);
        fs.outputFile(`yigomobile/public/release/${data.appPackageName}/index.html`, result, (err) => {
            if(err) {
                console.log(err);
                return err;
            }
            console.log("The file was saved!");
        });
    });
})
