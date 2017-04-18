import path from 'path';
const baseUrl ='https://dev.bokesoft.com/yigomobile2'; 
export default baseUrl;

export function resolve(p){
    return path.resolve(baseUrl,p);
}