import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import mongoose from 'mongoose';
import morgan from 'morgan';
import restful from 'node-restful';

const app = new express();
export default app;

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());

app.mongoose = mongoose; // used for testing

mongoose.connect("mongodb://localhost/mbt");

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

app.listen(3001);
