import mongoose from 'mongoose';
const projectSchema = new mongoose.Schema({
    id: String,
    name: String,
    desc: String,
    ios: {
        svn: {
            url: String,
            userName: String,
            password: String,
        },
        mobileProvision: String,
    },
    android: {
        svn: {
            url: String,
            userName: String,
            password: String,
        },
        keyStore: String,
    },
    lastRelease: {
        ios: String,    //taskId
        android: String,
    },
});
const Project = mongoose.model('Project', projectSchema);
export default Project;
export {
    projectSchema,
    Project,
};
