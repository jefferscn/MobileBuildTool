import imp from './index'
// const url = 'http://1.1.8.34:3001/download?id=58ee3b9c18679c2c5dc0f9d6';
const url = 'https://dev.bokesoft.com/yigomobile/public/release/cn.com.del/zjpl.mobileprovision';

imp(url).then((d) => {
    console.log(d);
}).catch((err) => {
    console.log(err);
});
