import fs from 'fs-extra-promise';
import { svn, archive, ipa, imp, changeInfoPlist, upload, generatePlist, Logger, updateProject, fileExist, getPlistValue } from './util/index';
import config from '../config';
const workingDir = 'working';
async function pack(task) {
    const logFile = `log/${task.id}.log`;
    const logger = Logger(logFile);
    try {
        logger.log('verbose', 'Pack begin.');
        const project = task.project.ios;
        const svnUrl = project.svn.url;
        const mobileProvision = project.mobileProvision.url;
        task.status.code = 'processing';
        await task.save();
        logger.log('info', 'Save task status processing success.');
        const impResult = await imp(mobileProvision);
        logger.log('info', impResult);
        logger.log('info', 'Install mobile provision success.');
        await fs.emptyDirAsync('./working');
        logger.log('info', 'Empty working directory success.');
        await svn.get(svnUrl, project.svn.userName, project.svn.password);
        logger.log('info', 'Get svn success');
        process.chdir('./working');
        const checkUpdateURL = `${config.server.checkUpdate}${task.project.id}`;
        const newInfoPlist = {
            CFBundleShortVersionString: task.version,
            UpdateAppURL: checkUpdateURL,
        };
        await changeInfoPlist('yesapp/Info.plist', newInfoPlist);
        logger.log('info', 'Change Info.plist success.');
        await archive(logger);
        await ipa(logger);
        const uploadIpaData = await upload(config.server.upload, 'build/yesapp.ipa', 'application/octet-stream');
        logger.log('info', 'Upload ipa file success');
        const bundleId = await getPlistValue('build/yesapp.xcarchive/Info.plist', 'ApplicationProperties.CFBundleIdentifier');
        const manifestJson = {
            items: [{
                assets: [{
                    kind: 'software-package',
                    url: uploadIpaData.url,
                }],
                metadata: {
                    'bundle-identifier': bundleId,
                    'bundle-version': task.version,
                    kind: 'software',
                    title: task.project.name,
                },
            }],
        };
        await generatePlist(manifestJson);
        logger.log('info', 'Generate manifest.plist success');
        const uploadPlistData = await upload(config.server.upload, 'manifest.plist', 'text/xml');
        logger.log('info', 'Upload manifest.plist success');
        task.targetUrl = uploadPlistData.url;
        await task.save();
        logger.log('info', 'Save manifest.plist to database success');
        process.chdir('..');
        task.status.code = 'success';
        await task.save();
        logger.log('info', 'Save task.status.code = "success" to database success');
        if (task.release) {
            // TODO 此处没有考虑android或者其他更改
            const lastReleaseIos = {
                taskId: task.id,
                version: task.version,
                releaseDate: new Date().toISOString(),
            };
            await updateProject(task.projectId, lastReleaseIos);
            logger.log('info', 'Update lastRelease success.');
        }
        return { success: true };
    } catch (ex) {
        logger.log('error', ex.message);
        task.status.code = 'fail';
        await task.save();
        logger.log('info', 'Save task.status.code = "fail" to database success.');
        const currentDir = process.cwd();
        if (currentDir.match(/([^\/]*)\/*$/)[1] === 'working') {
            process.chdir('..');
        }
        return { success: false, message: ex.message };
    } finally {
        const isExist = await fileExist(logFile);
        if (!isExist) {
            return;
        }
        const uploadLogData = await upload(config.server.upload, logFile);
        task.status.log = uploadLogData.url;
        await task.save();
        fs.remove(logFile);
    }
}
export default pack;
// TODO 函数 cleanPack
