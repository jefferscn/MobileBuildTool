import mongoose from 'mongoose';
const projectSchema = new mongoose.Schema({
    name: String,
    desc: String,
    ios: {
        svn: {
            url: String,
            userName: String,
            password: String,
        },
        mobileProvision: {
            filename: String,
            url:String
        },
    },
    android: {
        svn: {
            url: String,
            userName: String,
            password: String,
        },
        keyStore: {
            file:{
                filename: String,
                url:String
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
