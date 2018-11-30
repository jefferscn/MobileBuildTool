import 'babel-polyfill';
import fs from 'fs-extra';
import path from 'path';
import url from 'url';
import plistGen from './plistGen';
import unzip from 'unzip';
import download from './util/download';
import fileExist from './util/fileExist';
import updateProject from './util/updateProject';
import config from '../config';
import {
    addPlatform,
    emptyDir,
    buildApp,
    addKey,
    buildExtras,
    addPlugin,
    processCode,
    createCordova,
    changelibConfigJSPath,
    projectDirName,
    getSvn,
    preparePack,
    addBaiduMapScript,
    Logger,
    upload,
} from './util/';

const workingDir = path.resolve(process.cwd(), 'working');
const originDir = path.resolve(process.cwd(), '.');

async function pack(cfg) {
    console.log(cfg);
    const o = new Object();
    o.id = cfg.id;
    // o.baseSvn = cfg.baseSvn;
    // o.projectSvn = cfg.projectSvn;
    o.appName = cfg.project.name;
    // o.appEnglish = cfg.appEnglishName;
    o.appDescription = cfg.project.desc;
    o.appIcon = 'www/app.icon';
    // o.appContent = cfg.appContent;
    // o.appPlugin = cfg.appPlugin || cfg['appPlugin[]'];
    // o.projectSvnUser = cfg.projectSvnUser;
    // o.projectSvnPassword = cfg.projectSvnPassword;
    o.appPlatform = cfg.platform;
    o.appNameSpace = cfg.appId;
    // o.svnDir = `${o.appName}/www`;
    // o.baseSvnUser = 'zhouzy';
    // o.baseSvnPassword = 'zhouzy';
    o.wwwPath = `${o.appName}/www`;
    o.iconPath = `${o.appName}/www/app.icon`;
    o.configXML = `${o.appName}/config.xml`;
    o.htmlPath = `${o.appName}/www/index.html`;
    o.appPlugin = [];
    // o.projectPath = `${o.svnDir}/js/lib/`;
    // o.projectDir = `${o.svnDir}/js/lib/${projectDirName(o.projectSvn)}`;
    // console.log(o.svnDir);
    // o.libConfigJSPath = path.resolve(__dirname, 'working', o.svnDir, 'js/lib/config/config.js');
    // console.log('改变后', o.libConfigJSPath);
    o.package = url.resolve(config.server.baseUrl, cfg.package.url);
    o.icon= url.resolve(config.server.baseUrl, cfg.project.icon.url);
    o.platform = cfg.platform;
    o.appBuildType = cfg.debug ? 'debug' : 'release';
    o.appPackageName = cfg.appId;
    o.appVersion = cfg.version;
    o.appIosMp = cfg.appIosMp;
    // o.yigoVersion = cfg.yigoVersion;

    // o.apkLink = cfg.apkDownloadLink;
    // o.ipaLink = cfg.ipaLink;
    o.androidTargetSdkVersion = cfg.androidTargetSdkVersion;

    const logFile = `log/${cfg.id}.log`;
    const logger = Logger(logFile);

    o.build = async function () {
        logger.info('pack enviroment initializing......');
        // await preparePack();
        await emptyDir(workingDir);
        process.chdir(workingDir);
        logger.info('pack enviroment initialize success');
        logger.info('create cordova begin');
        await createCordova(o.appName, o.appNameSpace);
        logger.info('create cordova success');
        await processCode(o.configXML, o.appVersion, o.appPackageName, o.appName, o.appDescription, o.appIcon, null, o.appPlatform);
        logger.info('process config.xml success')
        await addBaiduMapScript(o.htmlPath, o.appPlugin);
        // 解压缩任务中的压缩包
        const file = "tmp.zip";
        console.log(o.package);
        await download(o.package, file);
        fs.createReadStream(file).pipe(unzip.Extract({ path: o.wwwPath }));
        logger.info('unzip www OK');
        console.log(cfg.project.icon);
        await download(o.icon, o.iconPath);
        logger.info('download icon OK');
        process.chdir(o.appName);
        await addPlatform(o.appPlatform);
        logger.info('cordova add platform OK');
        await addPlugin(o.appPlugin);
        logger.info('cordova add plugins OK');
        if (o.appPlatform === 'android') {
            await buildExtras(); // android
        }
        await addKey(o.appIosMp);
        logger.info('cordova add licence key OK');
        await buildApp(o.platform, o.appBuildType);
        logger.info('cordova build application OK');
        // await releaseFile(o.platform, o.appPlugin, o.appBuildType, o.apkLink, o.ipaLink, o.appName);
        let src = null;
        // process.chdir(originDir);
        if (o.appPlatform === 'ios') {
            let dest = o.ipaLink;
            const reg = new RegExp('^(.+)\/(?:[^/]+)$');
            dest = reg.exec(dest)[1];
            src = ['platforms/ios/build/device/', o.appName, '.ipa'].join('');
            const data = await upload(config.server.upload, src);
            const ipaUrl = data.url;
            // const plistUrl = `${SERVER}yigomobile/public/ios/${o.id}/manifest.plist`;
            // const pageUrl = `${SERVER}yigomobile/public/ios/${o.id}/index.html`;
            const plistUrl = await plistGen(o, ipaUrl);
            // await htmlGen(plistUrl, o.appName, pageUrl);
            // fs.copySync('manifest.plist', `${dest}/manifest.plist`);
            cfg.targetUrl = plistUrl;
            cfg.save();
            // fs.copySync('index.html', `${dest}/index.html`);
        } else {
            var isCrosswalk = /crosswalk/;
            if (isCrosswalk.test(o.appPlugin.toString())) {
                src = ['platforms/android/build/outputs/apk/android-armv7-', o.appBuildType, '.apk'].join('');

            } else {
                src = ['platforms/android/build/outputs/apk/android-', o.appBuildType, '.apk'].join('');
            }
            const data = await upload(config.server.upload, src);
            cfg.targetUrl = data.url;
            cfg.save();
        };
        await updateProject(cfg.projectId, o.appPlatform, {
            taskId: cfg.id,
            version: cfg.appVersion,
            releaseDate: Date.now(),
        })
    };
    try {
        cfg.status.code = 'processing';
        await cfg.save();
        await o.build();
        cfg.status.code = 'done';
        await cfg.save();
    } catch (e) {
        console.log(e);
        logger.error(e.message);
        cfg.status.code = 'error';
        await cfg.save();
    } finally {
        console.log('finally');
        process.chdir(originDir);
        console.log(process.cwd());
        const isExist = await fileExist(logFile);
        if (!isExist) {
            console.log('logfile not exist!');
            return;
        }
        const uploadLogData = await upload(config.server.upload, logFile);
        console.log(uploadLogData);
        cfg.status.log = uploadLogData.url;
        await cfg.save();
        fs.remove(logFile);
    }
}
export default pack;
