import mongoose from 'mongoose';
const projectSchema = new mongoose.Schema({
    name: String,
    desc: String,
    appId: String,
    icon:{ 
        filename: String,
        url:String,
        id: String,
    },
    ios: {
        svn: {
            url: String,
            userName: String,
            password: String,
        },
        mobileProvision: {
            filename: String,
            url:String,
            id: String,
        },
        certificate:{
            file:{
                filename: String,
                url: String,
                id: String,
            },
            password: String
        },
        appId: String,
    },
    android: {
        svn: {
            url: String,
            userName: String,
            password: String,
        },
        appId: String,
        keyStore: {
            file:{
                filename: String,
                url:String,
                id:String,
            },
            userName:String,
            password:String
        },
    },
    lastRelease: {
        ios: {
            taskId:String,    //taskId
            version:String,
            releaseDate:Date
        },
        android:  {
            taskId:String,    //taskId
            version:String,
            releaseDate:Date
        },
    },
},{
    toJSON:{
        virtuals:true
    }
});

const Project = mongoose.model('Project', projectSchema);
export default Project;
export {
    projectSchema,
    Project,
};
