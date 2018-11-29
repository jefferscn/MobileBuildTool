import { cordova } from 'cordova-lib';

function addPluginReal(plugin,variable){
    return new Promise(function (resolve, reject) {
        cordova.plugin('add', plugin, variable,{'verbose': true},function (err, data) {
            if (err) {
                console.error(err.stack)
                reject(new Error(err))
            }
            resolve(data);
        });
    });
};

export default addPluginReal;