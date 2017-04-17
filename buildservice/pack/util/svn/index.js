import Client from 'svn-spawn';

function get(url, username, password) {
    const dirPath = './working';
    return new Promise((resolve, reject) => {
        const client = new Client({
            cwd: dirPath,
            username: username,
            password: password,
        });
        client.cmd(['checkout', url, '.', '--quiet'], (err, data) => {
            if(err){
                reject(new Error(err));
            }
            resolve(data);
        });
    });
}
export default {
    get,
};
