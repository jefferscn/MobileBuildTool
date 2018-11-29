function projectDirName(projectSvn){
    var projectDirName = projectSvn;
    if( projectDirName.split('/').slice(-1).toString().length < 1 ){
        projectDirName = projectDirName.split('/').slice(-2,-1);
    }else{
        projectDirName = projectDirName.split('/').slice(-1);
    }
    projectDirName = projectDirName.toString();
    return projectDirName;
};
export default projectDirName;

