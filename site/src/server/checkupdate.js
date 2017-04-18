import { ProjectSchema, TaskSchema, Project } from '../ui/model';
import baseUrl from './baseUrl';
async function checkUpdate(req, res) {
    const projectId = req.params.projectId;
    const result = {};
    result.projectId = projectId;
    const project = await Project.findById(projectId);
    if (!project) {
        res.state(404).end();
        return;
    }
    if (project.lastRelease) {
        console.log(project.lastRelease);
        if (project.lastRelease.android && project.lastRelease.android.version) {
            result.androidVersion = project.lastRelease.android.version;
            result.androidLink = `${baseUrl}/#/tasks/${project.lastRelease.android.taskId}/show`;
            result.androidUpdateTime = project.lastRelease.android.releaseDate;
        }
        if (project.lastRelease.ios && project.lastRelease.ios.version) {
            result.iosVersion = project.lastRelease.ios.version;
            result.iosLink = `${baseUrl}/#/tasks/${project.lastRelease.ios.taskId}/show`;
            result.iosUpdateTime = project.lastRelease.ios.releaseDate;
        }
    }
    res.json({
        message:result
    }).end();
}
export default (app) => {
    app.get('/checkupdate/:projectId', checkUpdate);
}