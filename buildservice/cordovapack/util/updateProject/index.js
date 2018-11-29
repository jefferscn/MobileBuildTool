import { Project } from '../../../models/index';
async function updateProject(id, platform, obj) {
    const project = await Project.findById(id).exec();
    project.lastRelease[platform]= obj;
    await project.save();
}
export default updateProject;
