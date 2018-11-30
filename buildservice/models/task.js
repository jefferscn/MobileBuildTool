import mongoose from 'mongoose';
import {projectSchema} from './project';
const taskSchema = new mongoose.Schema({
    projectId: String,
    project: projectSchema,
    version: String,
    platform: String,
    configuration: String,
    release: Boolean,
    debug: Boolean,
    status: {
        code: String,
        log: String,
    },
    targetUrl: String,
    package : {
        filename: String,
        url:String,
        id: String,
    },
    dateOfCreate: {type: Date, default: Date.now},
    },
    {
        toJSON: {
            virtuals: true
        }
    });
const Task = mongoose.model('Task', taskSchema);
export default Task;
export {
    taskSchema,
    Task,
};
