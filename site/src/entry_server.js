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
import { ProjectSchema, TaskSchema , Project } from './ui/model';
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
mongoose.connect("mongodb://localhost/mbt");

app.use(webpackHotMiddleware(compiler));
app.use(morgan('dev'));
fileserver(app, mongoose);
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());


var user = app.user = restful.model('projects', ProjectSchema)
    .methods(['post', 'put', 'delete', {
        method: 'get',
        before: function (req, res, next) {
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
        },
        after: (req, res, next) => {
            delete req.quer.options;    // Remove skip and limit to get total count
            req.quer.count(function (err, totalRecords) { //Apply remaining query
                if (err) {
                    next();
                } else {
                    // console.log(totalRecords);
                    // res.locals.bundle = {
                    //     data: res.locals.bundle,
                    //     total: totalRecords
                    // }
                    res.setHeader('Content-Range', totalRecords + '')
                    next();
                }
            });
        }
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
                next();
            }
        }, 'delete', {
        method: 'get',
        before: function (req, res, next) {
            if (req.query.sort) {
                var sort = JSON.parse(req.query.sort);
                req.query.sort = (sort[1] === "DESC" ? '-' : '') + sort[0];
            }
            if (req.query.range) {
                var range = JSON.parse(req.query.range);
                req.query.skip = range[0];
                req.query.limit = range[1]-range[0] + 1;
            }
            console.log(req.query);
            next()
        },
        after: (req, res, next) => {
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
    }])
    .includeSchema(false);

task.register(app, '/tasks');

app.get('/', function (req, res) {
    res.sendFile('index.html', { root: path.resolve(__dirname) });
});

checkUpdate(app);

app.listen(3001);


