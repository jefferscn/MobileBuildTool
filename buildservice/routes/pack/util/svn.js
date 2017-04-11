import Client from 'svn-spawn';

function get(url, username, password, dir) {
    const dirPath = dir || './working';
    return new Promise((resolve, reject) => {
        const client = new Client({
            cwd: dirPath,
            username: username,
            password: password,
        });
        client.checkout(url, (err, data) => {
            if (err) {
                reject(new Error(err));
            }
            resolve(data);
        });
    });
}
export default {
    get,
};
