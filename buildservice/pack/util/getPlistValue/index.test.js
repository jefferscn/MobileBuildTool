import getPlistValue from './index';
getPlistValue('routes/pack/util/getPlistValue/Info.plist', 'ApplicationProperties.CFBundleIdentifier').then((d) => {
    console.log(d);
})
