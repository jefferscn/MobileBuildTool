import path from 'path';
const baseUrl ='https://dev.bokesoft.com/erpmobile/'; 
export default baseUrl;

export function resolve(p){
    return path.resolve(baseUrl,p);
}