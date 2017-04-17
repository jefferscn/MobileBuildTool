import changeInfoPlist from './index';
const obj = {
    CFBundleShortVersionString: '1.0.7',
    UpdateAppURL:'https://www.bknks.com',
}
changeInfoPlist('routes/pack/util/changeInfoPlist/Info.plist', obj)
    .then((d) => {
        console.log(d);
    })
    .catch((d) => {
        console.log(d);
    });
