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
import webpackDevConfig from '../webpack.config';

const app = new express();
export default app;
var config = webpackDevConfig(true,'build',3001);
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
fileserver(app,mongoose);
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());


var user = app.user = restful.model('projects', mongoose.Schema({
    name: { type: 'string', required: true },
    desc: { type: 'string' }
}))
    .methods(['get', 'post', 'put', 'delete'])
    .before('get', function (req, res, next) {
        req.body.limit = 1;
        next()
    })
    .includeSchema(false);

user.register(app, '/projects');

app.get('/', function(req, res) {
    res.sendFile('index.html', { root:path.resolve(__dirname )});
});

app.listen(3001);

