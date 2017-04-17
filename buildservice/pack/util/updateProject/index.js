import { Project } from '../../../models/index';
async function updateProject(id, obj) {
    const project = await Project.findById(id).exec();
    project.lastRelease.ios = obj;
    await project.save();
}
export default updateProject;
