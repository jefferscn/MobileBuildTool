function preparePack(){
    return new Promise(function(resolve,reject){
        var cwd = process.cwd().split('/');
        console.log(cwd);
        var parentDir = cwd[cwd.length - 2].toString();

        if(parentDir == 'working'){
            process.chdir('../..');
            resolve('Change dir to cordova\'s parent dir.');
        }
        resolve('The current dir is right.\nNo need to change.');
    });
}
export default preparePack;
