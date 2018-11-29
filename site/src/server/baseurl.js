import path from 'path';
const baseUrl ='https://1.1.8.37:3001'; 
export default baseUrl;

export function resolve(p){
    return path.resolve(baseUrl,p);
}