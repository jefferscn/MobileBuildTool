import upload from './index';
const url  = 'http://1.1.8.34:3001/upload';
let path = 'routes/pack/util/upload/yesapp.ipa';
path = 'routes/pack/util/upload/manifest.plist';
async function test() {
    try {
        var r = await upload(url,path,'text/xml');
        console.log(r);
    } catch (ex){
        console.log(ex);
    }

}
test();