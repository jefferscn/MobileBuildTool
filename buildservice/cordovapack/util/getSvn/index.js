import Client from 'svn-spawn';
function getSvn(url,dir,username,password) {
    return new Promise(function (resolve, reject) {
        var client = new Client({
            cwd: dir,
            username: username,
            password: password
        });
        client.checkout(url,function(err, data) {
            if(err){
                reject(new Error(err));
                return;
            }
            resolve(data);
        });

    });
};
export default getSvn;
