import updateProject from './index';
const id = '58eee99cca2ed775d490f641';
const obj = {
    ipaUrl: 'hehe',
}
updateProject(id, obj)
    .then((d) => {
        console.log(d)
    })
    .catch((e) => {
        console.log(e)
    })
// 此测试需要首先连接数据库
