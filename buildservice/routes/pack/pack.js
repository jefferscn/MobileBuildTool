import process from 'process';
import fs from 'fs-extra';
import archive from './util/archive';
import ipa from './util/ipa';
import release from './util/release';
import svn from './util/svn';
// 生成ipa的配置文件
const exportOptions = [__dirname, 'exportOptions.plist'].join('/');
console.log(exportOptions);
// 系统home文件夹
const userHome = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
// workspace
const workspacePath = 'project/yes_ios_2_1_0/project/workspace';
const workspaceFullPath = [userHome, workspacePath].join('/');
// svn
const projectPath = 'project/yes_ios_2_1_0';
const projectFullPath = [userHome, projectPath].join('/');
// destination
// TODO fake
// const releasePath = 'project/ios_compile/pack2/yigomobile/public/release/test';
const releasePath = 'project/ios_compile/pack2/yigomobile/public/release/com.bokesoft.yigomobile/ios';
const releaseFullPath = [userHome, releasePath, '/yesapp.ipa'].join('/');
let startTime;
function pack() {
    startTime = Date.now();
    console.log('开始打包');
    console.log('预计用时: 6分钟');
    console.log('开始时间: ', new Date().toLocaleTimeString());
    process.chdir(projectFullPath);
    return new Promise((resolve, reject) => {
        console.log('[1]更新SVN-开始……');
        updateSvn()
            .then(() => {
                console.log('[1]更新SVN-成功');
                process.chdir(workspaceFullPath);
                fs.emptyDirSync('build');
                return;
            })
            .then(() => {
                console.log('[2]archive-开始……');
                return archive();
            })
            .then(() => {
                console.log('[2]archive成功');
                console.log('[3]生成ipa-开始……');
                return ipa();
            })
            .then(() => {
                console.log('[3]生成ipa-成功');
                console.log('[4]复制到发布文件夹-开始……');
                return release();
            })
            .then(() => {
                console.log('[4]复制到发布文件夹-成功');
                console.log('[5]清理build文件夹-开始……');
                fs.emptyDirSync('build');
                process.chdir(__dirname);
                console.log('[5]清理build文件夹-成功');
                console.log(`总用时: ${Math.ceil((Date.now() - startTime) / (1000 * 60))} 分钟`);
                console.log('打包成功');
                resolve();
            })
            .catch((e) => {
                console.log('打包失败');
                console.log(e);
                reject(e);
            });
    });
}
export default pack;
