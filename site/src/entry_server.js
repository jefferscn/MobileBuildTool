import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import morgan from 'morgan';
import restful from 'node-restful';
import fileserver from './server/fileserver';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import checkUpdate from './server/checkupdate';
import cors from 'cors';
import webpackDevConfig from '../webpack.config';
import { ProjectSchema, TaskSchema, Project, FrameworkSchema, Framework } from './ui/model';
const app = new express();
app.use(cors());
export default app;
var config = webpackDevConfig(true, 'build', 3001);
var compiler = webpack(config);


// attach to the compiler & the server
app.use(webpackDevMiddleware(compiler, {

    // public path should be the same with webpack config
    publicPath: config.output.publicPath,
    index: "index.html",
    noInfo: true,
    stats: {
        colors: true
    }
}));

app.mongoose = mongoose; // used for testing
mongoose.connect("mongodb://localhost/cordovapack");

app.use(webpackHotMiddleware(compiler));
app.use(morgan('dev'));
fileserver(app, mongoose);
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());


const taskQueryTransform = async (req, res, next) => {
    if (req.query.filter) {
        const filter = JSON.parse(req.query.filter);
        if (filter.projectId) {
            req.query.projectId__equals = filter.projectId
        }
        if (filter.platform && 'all' != filter.platform) {
            req.query.platform__equals = filter.platform
        }
        if (filter.version) {
            req.query.version__regex = `/^${filter.version}/i`
        }
        if (filter.is_debug != undefined) {
            req.query.debug__equals = filter.is_debug
        }
        if (filter.status_code && 'all' != filter.status_code) {
            req.query['status.code__equals'] = filter.status_code
        }
    }
    console.log(req.query);
    queryTransform(req, res, next);
}

const queryTransform = (req, res, next) => {
    if (req.query.sort) {
        var sort = JSON.parse(req.query.sort);
        req.query.sort = (sort[1] === "DESC" ? '-' : '') + sort[0];
    }
    if (req.query.range) {
        var range = JSON.parse(req.query.range);
        req.query.skip = range[0];
        req.query.limit = range[1] - range[0] + 1;
    }
    next()
}

const totalRange = (req, res, next) => {
    delete req.quer.options;    // Remove skip and limit to get total count
    req.quer.count(function (err, totalRecords) { //Apply remaining query
        if (err) {
            next();
        } else {
            res.setHeader('Content-Range', totalRecords + '')
            next();
        }
    });
}

var user = app.user = restful.model('projects', ProjectSchema)
    .methods([{
        method: 'post',
        before: async function (req, res, next) {
            if (!req.body.name) {
                return next({ status: 400, err: '请输入项目名称！' });
            }
            if (!req.body.appId) {
                return next({ status: 400, err: '请输入应用ID！' });
            }
            if (!req.body.icon || !req.body.icon.url) {
                return next({ status: 400, err: '请输入上传图标文件！' });
            }
            var pp = await Project.findOne({ 'name': req.body.name });
            if (pp || pp != null) {
                return next({ status: 400, err: `项目名称 ${req.body.name} 已存在！` });
            }
            pp = await Project.findOne({ 'appId': req.body.appId });
            if (pp || pp != null) {
                return next({ status: 400, err: `项目ID ${req.body.appId} 已存在！` });
            }
            next();
        }
    }, 'put', 'delete', {
        method: 'get',
        before: queryTransform,
        after: totalRange
    }])
    .includeSchema(false);

user.register(app, '/projects');

var task = app.task = restful.model('tasks', TaskSchema)
    .methods([{
        method: 'post',
        before: async (req, res, next) => {
            if (!req.body.projectId) {
                return next({ status: 400, err: '请选择项目' });
            }
            if (!req.body.package || !req.body.package.url) {
                return next({ status: 400, err: '请上传发布包' });
            }
            var pp = await Project.findById(req.body.projectId);
            if (!pp || pp == null) {
                return next({ status: 400, err: '' });
            }
            req.body.status = { code: 'waiting' };
            req.body.project = pp;
            pp = await Framework.findById(req.body.frameworkId);
            req.body.framework = pp;
            next();
        }
    }, 'delete', {
        method: 'get',
        before: taskQueryTransform,
        after: totalRange
    }, {
        method: 'put',
        before: async (req, res, next) => {
            if(req.body.repackage){
                req.body.status.code = 'waiting';
            }
            delete req.body.repackage
            next();
        }
    }])
    .includeSchema(false);

task.register(app, '/tasks');

var framework = app.framework = restful.model('frameworks', FrameworkSchema)
    .methods(['post', 'put', 'delete', {
        method: 'get',
        before: queryTransform,
        after: totalRange
    }])
    .includeSchema(false);

framework.register(app, '/frameworks');

app.get('/', function (req, res) {
    res.sendFile('index.html', { root: path.resolve(__dirname) });
});

checkUpdate(app);

app.use(function (error, req, res, next) {
    console.log(error);
    res.status(error.status || 500).send({ message: error.err });
});
app.listen(3001);


