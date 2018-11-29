import download from './index'
// const url = 'http://1.1.8.34:3001/download?id=58ee3b9c18679c2c5dc0f9d6';
// const url = 'https://api.github.com/users/';
const url = 'https://dev.bokesoft.com/yigomobile/public/release/cn.com.del/zjpl.mobileprovision';

download(url, 'temp.mobileprovision').then(() =>{
    console.log('success')
},(err)=> {
    console.log('err',err)
})
