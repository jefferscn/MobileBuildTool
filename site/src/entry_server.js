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
import { ProjectSchema, TaskSchema , Project , FrameworkSchema , Framework } from './ui/model';
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
mongoose.connect("mongodb://1.1.8.34/mbt");

app.use(webpackHotMiddleware(compiler));
app.use(morgan('dev'));
fileserver(app, mongoose);
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

const queryTransform = (req,res,next)=> {
    if (req.query.sort) {
        var sort = JSON.parse(req.query.sort);
        req.query.sort = (sort[1] === "DESC" ? '-' : '') + sort[0];
    }
    if (req.query.range) {
        var range = JSON.parse(req.query.range);
        req.query.skip = range[0];
        req.query.limit = range[1]-range[0] + 1;
    }
    next()
}

const totalRange = (req,res,next)=>{
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

const queryRepeat = async (req, res, next) => {
    // console.log(req.body.name);
    if(req.body.name == "" || req.body.name == undefined){
        res.status(400).json({message: 'Name cannot be empty！'});
        res.end();
    }else{ 
        var repeat = await Project.find({name: req.body.name});

        if(repeat.length != 0){
            res.status(400).json({message: 'Name cannot repeated！'});
            res.end();
        }else{
            next();     
        }
    }
}

const del = async (req, res, next) => {
    // console.log(req);
    // console.log(req.originalUrl);
    const id = req.originalUrl.replace(/\/projects\//, '');
    // console.log(id);
    var project = await Project.findById(id);
    // console.log(project);
    var iosVersion = project.lastRelease.ios.version;
    var androidVersion = project.lastRelease.android.version;
    // console.log(iosVersion);
    if(iosVersion || androidVersion){
        res.status(400).json({message: 'This project cannot be deleted!'});
        // res.send(400, 'This project cannot be deleted!');
        res.end();
    }else{
        next();
    }
}

var user = app.user = restful.model('projects', ProjectSchema)
    .methods([{
        method:'post',
        before: queryRepeat
    }, 'put', {
        method: 'delete',
        before: del
        }, {
        method: 'get',
        before: queryTransform, 
        after: totalRange
    }])
    .includeSchema(false);

user.register(app, '/projects');

var task= app.task= restful.model('tasks', TaskSchema)
    .methods([ {
        method:'post',
        before : async (req,res,next)=>{
                req.body.status={code:'waiting'};
                var pp = await Project.findById(req.body.projectId);
                req.body.project = pp;
                pp = await Framework.findById(req.body.frameworkId);
                req.body.framework = pp;
                next();
            }
        }, 'delete', {
        method: 'get',
        before: queryTransform, 
        after: totalRange
    }])
    .includeSchema(false);

task.register(app, '/tasks');

var framework  = app.framework = restful.model('frameworks',FrameworkSchema)
    .methods([
        {
            method: 'post',
            before: queryRepeat
        },'put', 'delete', {
        method: 'get',
        before: queryTransform, 
        after: totalRange
    }])
    .includeSchema(false);

framework.register(app,'/frameworks');

app.get('/', function (req, res) {
    res.sendFile('index.html', { root: path.resolve(__dirname) });
});

checkUpdate(app);

app.listen(3001);


