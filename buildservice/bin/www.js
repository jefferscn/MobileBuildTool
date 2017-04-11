import mongoose from 'mongoose';
import config from '../config';
import { Project, Task } from '../models';
const { db } = config;
const app = require('../app');
const debug = require('debug')('myapp:server');
const http = require('http');
// Connect database
mongoose.Promise = Promise;
mongoose.connect(db.uri, db.options)
    .then(
        () => {
            console.log('Database connect success.');
        },
        (err) => {
            console.log(err);
        }
    )
    .then(
        () => {
            const data = {
                projectId: '001',
                version: '0.0.1',
                project: {
                    id: '001',
                    name: '大洋小蜜蜂',
                    desc: '{简介}',
                    ios: {
                        svn: {
                            url: 'http://1.1.2.17:8000/svn/yes/yes-mobile-pack/IOS/%E9%A1%B9%E7%9B%AE%E6%89%93%E5%8C%85%E9%9B%86/%E5%A4%A7%E6%B4%8B%E7%94%B5%E6%9C%BA/yesapp/',
                            userName: 'zhozy',
                            password: 'zhouzy',
                        },
                        mobileProvision: '{todo}',
                    },
                },
            }
            const task = new Task(data);
            task.save((err) => {
                if (err) return console.error(err);
                console.log('save task success');
            });
        }
    );
/**
 * Get port from environment and store in Express.
 */
const port = normalizePort(process.env.PORT || '4000');
app.set('port', port);
/**
 * Create HTTP server.
 */
const server = http.createServer(app);
/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}
/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof port === 'string'
        ? `Pipe ${port}`
        : `Port ${port}`;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
}
