var saveData = new Promise(function(resolve,reject){
    releaseModel.find({appPackageName:appPackageName},function(err,data){
        if(err){
            reject(err);
        }
        if(data.length){
            //updage
            releaseModel.findOneAndUpdate({"appPackageName":appPackageName},query,{new: true},function(err,data){
                if(err){
                    reject(err);
                }
                resolve(data);

            });
        }else{
            //create
            var newQuery = new releaseModel(query);
            newQuery.save(function (err, data) {
                if (err) {
                    reject(err);
                }
                resolve(data);
            });
        }
    });
});
