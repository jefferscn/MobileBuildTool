(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("babel-polyfill");

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _express = __webpack_require__(3);

	var _express2 = _interopRequireDefault(_express);

	var _bodyParser = __webpack_require__(4);

	var _bodyParser2 = _interopRequireDefault(_bodyParser);

	var _path = __webpack_require__(5);

	var _path2 = _interopRequireDefault(_path);

	var _methodOverride = __webpack_require__(6);

	var _methodOverride2 = _interopRequireDefault(_methodOverride);

	var _mongoose = __webpack_require__(7);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	var _morgan = __webpack_require__(8);

	var _morgan2 = _interopRequireDefault(_morgan);

	var _nodeRestful = __webpack_require__(9);

	var _nodeRestful2 = _interopRequireDefault(_nodeRestful);

	var _fileserver = __webpack_require__(10);

	var _fileserver2 = _interopRequireDefault(_fileserver);

	var _webpack = __webpack_require__(13);

	var _webpack2 = _interopRequireDefault(_webpack);

	var _webpackDevMiddleware = __webpack_require__(14);

	var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

	var _webpackHotMiddleware = __webpack_require__(15);

	var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

	var _checkupdate = __webpack_require__(16);

	var _checkupdate2 = _interopRequireDefault(_checkupdate);

	var _cors = __webpack_require__(22);

	var _cors2 = _interopRequireDefault(_cors);

	var _webpack3 = __webpack_require__(23);

	var _webpack4 = _interopRequireDefault(_webpack3);

	var _model = __webpack_require__(17);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

	var app = new _express2.default();
	app.use((0, _cors2.default)());
	exports.default = app;

	var config = (0, _webpack4.default)(true, 'build', 3001);
	var compiler = (0, _webpack2.default)(config);

	// attach to the compiler & the server
	app.use((0, _webpackDevMiddleware2.default)(compiler, {

	    // public path should be the same with webpack config
	    publicPath: config.output.publicPath,
	    index: "index.html",
	    noInfo: true,
	    stats: {
	        colors: true
	    }
	}));

	app.mongoose = _mongoose2.default; // used for testing
	_mongoose2.default.connect("mongodb://localhost/cordovapack");

	app.use((0, _webpackHotMiddleware2.default)(compiler));
	app.use((0, _morgan2.default)('dev'));
	(0, _fileserver2.default)(app, _mongoose2.default);
	app.use(_bodyParser2.default.urlencoded({ 'extended': 'true' }));
	app.use(_bodyParser2.default.json());
	app.use(_bodyParser2.default.json({ type: 'application/vnd.api+json' }));
	app.use((0, _methodOverride2.default)());

	var queryTransform = function queryTransform(req, res, next) {
	    if (req.query.sort) {
	        var sort = JSON.parse(req.query.sort);
	        req.query.sort = (sort[1] === "DESC" ? '-' : '') + sort[0];
	    }
	    if (req.query.range) {
	        var range = JSON.parse(req.query.range);
	        req.query.skip = range[0];
	        req.query.limit = range[1] - range[0] + 1;
	    }
	    next();
	};

	var totalRange = function totalRange(req, res, next) {
	    delete req.quer.options; // Remove skip and limit to get total count
	    req.quer.count(function (err, totalRecords) {
	        //Apply remaining query
	        if (err) {
	            next();
	        } else {
	            res.setHeader('Content-Range', totalRecords + '');
	            next();
	        }
	    });
	};

	var user = app.user = _nodeRestful2.default.model('projects', _model.ProjectSchema).methods(['post', 'put', 'delete', {
	    method: 'get',
	    before: queryTransform,
	    after: totalRange
	}]).includeSchema(false);

	user.register(app, '/projects');

	var task = app.task = _nodeRestful2.default.model('tasks', _model.TaskSchema).methods([{
	    method: 'post',
	    before: function () {
	        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res, next) {
	            var pp;
	            return regeneratorRuntime.wrap(function _callee$(_context) {
	                while (1) {
	                    switch (_context.prev = _context.next) {
	                        case 0:
	                            req.body.status = { code: 'waiting' };
	                            _context.next = 3;
	                            return _model.Project.findById(req.body.projectId);

	                        case 3:
	                            pp = _context.sent;

	                            req.body.project = pp;
	                            _context.next = 7;
	                            return _model.Framework.findById(req.body.frameworkId);

	                        case 7:
	                            pp = _context.sent;

	                            req.body.framework = pp;
	                            next();

	                        case 10:
	                        case 'end':
	                            return _context.stop();
	                    }
	                }
	            }, _callee, undefined);
	        }));

	        return function before(_x, _x2, _x3) {
	            return _ref.apply(this, arguments);
	        };
	    }()
	}, 'delete', {
	    method: 'get',
	    before: queryTransform,
	    after: totalRange
	}]).includeSchema(false);

	task.register(app, '/tasks');

	var framework = app.framework = _nodeRestful2.default.model('frameworks', _model.FrameworkSchema).methods(['post', 'put', 'delete', {
	    method: 'get',
	    before: queryTransform,
	    after: totalRange
	}]).includeSchema(false);

	framework.register(app, '/frameworks');

	app.get('/', function (req, res) {
	    res.sendFile('index.html', { root: _path2.default.resolve(__dirname) });
	});

	(0, _checkupdate2.default)(app);

	app.listen(3001);

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("method-override");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("node-restful");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = bind;

	var _multer = __webpack_require__(11);

	var _multer2 = _interopRequireDefault(_multer);

	var _fs = __webpack_require__(12);

	var _fs2 = _interopRequireDefault(_fs);

	var _path = __webpack_require__(5);

	var _path2 = _interopRequireDefault(_path);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

	var upload = (0, _multer2.default)({ dest: 'uploads/' });
	// const baseUrl = "http://1.1.8.34:3001/download?id=";
	var baseUrl = "http://1.1.8.37:3001/download?id=";
	function bind(app, mongoose) {
	    var _this = this;

	    var FileRecordSchema = new mongoose.Schema({
	        filename: String,
	        mimetype: String,
	        path: String
	    });
	    var FileRecord = mongoose.model('FileRecord', FileRecordSchema);

	    app.post('/upload', upload.single('file'), function () {
	        var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
	            var fr, result;
	            return regeneratorRuntime.wrap(function _callee$(_context) {
	                while (1) {
	                    switch (_context.prev = _context.next) {
	                        case 0:
	                            fr = new FileRecord();

	                            fr.filename = req.file.originalname;
	                            fr.mimetype = req.file.mimetype;
	                            fr.path = req.file.path;
	                            _context.prev = 4;
	                            _context.next = 7;
	                            return fr.save();

	                        case 7:
	                            result = {
	                                success: true,
	                                filename: fr.filename,
	                                url: '' + baseUrl + fr.id
	                            };

	                            res.json(result).end();
	                            _context.next = 14;
	                            break;

	                        case 11:
	                            _context.prev = 11;
	                            _context.t0 = _context['catch'](4);

	                            res.json({
	                                success: false,
	                                message: _context.t0.message
	                            });

	                        case 14:
	                        case 'end':
	                            return _context.stop();
	                    }
	                }
	            }, _callee, _this, [[4, 11]]);
	        }));

	        return function (_x, _x2) {
	            return _ref.apply(this, arguments);
	        };
	    }());
	    app.get('/download', function () {
	        var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(req, res) {
	            var fr, file, filename, mimetype, newFileName, filestream;
	            return regeneratorRuntime.wrap(function _callee2$(_context2) {
	                while (1) {
	                    switch (_context2.prev = _context2.next) {
	                        case 0:
	                            _context2.next = 2;
	                            return FileRecord.findById(req.query.id);

	                        case 2:
	                            fr = _context2.sent;

	                            if (!fr) {
	                                _context2.next = 13;
	                                break;
	                            }

	                            file = _path2.default.resolve(__dirname, fr.path);
	                            filename = fr.filename;
	                            mimetype = fr.mimetype;
	                            newFileName = encodeURIComponent(filename);

	                            res.setHeader('Content-Disposition', 'inline;filename*=UTF-8\'\'' + newFileName);
	                            res.setHeader('Content-type', mimetype);
	                            filestream = _fs2.default.createReadStream(file);

	                            filestream.pipe(res);
	                            return _context2.abrupt('return');

	                        case 13:
	                            res.status(404).end();

	                        case 14:
	                        case 'end':
	                            return _context2.stop();
	                    }
	                }
	            }, _callee2, _this);
	        }));

	        return function (_x3, _x4) {
	            return _ref2.apply(this, arguments);
	        };
	    }());
	    app.get('/download/:id', function () {
	        var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(req, res) {
	            var fr, file, filename, mimetype, newFileName, filestream;
	            return regeneratorRuntime.wrap(function _callee3$(_context3) {
	                while (1) {
	                    switch (_context3.prev = _context3.next) {
	                        case 0:
	                            _context3.next = 2;
	                            return FileRecord.findById(req.params.id);

	                        case 2:
	                            fr = _context3.sent;

	                            if (!fr) {
	                                _context3.next = 13;
	                                break;
	                            }

	                            file = _path2.default.resolve(__dirname, fr.path);
	                            filename = fr.filename;
	                            mimetype = fr.mimetype;
	                            newFileName = encodeURIComponent(filename);

	                            res.setHeader('Content-Disposition', 'inline;filename*=UTF-8\'\'' + newFileName);
	                            res.setHeader('Content-type', mimetype);
	                            filestream = _fs2.default.createReadStream(file);

	                            filestream.pipe(res);
	                            return _context3.abrupt('return');

	                        case 13:
	                            res.status(404).end();

	                        case 14:
	                        case 'end':
	                            return _context3.stop();
	                    }
	                }
	            }, _callee3, _this);
	        }));

	        return function (_x5, _x6) {
	            return _ref3.apply(this, arguments);
	        };
	    }());
	}

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("multer");

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = require("webpack");

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("webpack-dev-middleware");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("webpack-hot-middleware");

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var checkUpdate = function () {
	    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req, res) {
	        var projectId, result, project;
	        return regeneratorRuntime.wrap(function _callee$(_context) {
	            while (1) {
	                switch (_context.prev = _context.next) {
	                    case 0:
	                        projectId = req.params.projectId;
	                        result = {};

	                        result.projectId = projectId;
	                        _context.next = 5;
	                        return _model.Project.findById(projectId);

	                    case 5:
	                        project = _context.sent;

	                        if (project) {
	                            _context.next = 9;
	                            break;
	                        }

	                        res.state(404).end();
	                        return _context.abrupt('return');

	                    case 9:
	                        if (project.lastRelease) {
	                            console.log(project.lastRelease);
	                            if (project.lastRelease.android && project.lastRelease.android.version) {
	                                result.androidVersion = project.lastRelease.android.version;
	                                result.androidLink = _baseUrl2.default + '/#/tasks/' + project.lastRelease.android.taskId + '/show';
	                                result.androidUpdateTime = project.lastRelease.android.releaseDate;
	                            }
	                            if (project.lastRelease.ios && project.lastRelease.ios.version) {
	                                result.iosVersion = project.lastRelease.ios.version;
	                                result.iosLink = _baseUrl2.default + '/#/tasks/' + project.lastRelease.ios.taskId + '/show';
	                                result.iosUpdateTime = project.lastRelease.ios.releaseDate;
	                            }
	                        }
	                        res.json({
	                            message: result
	                        }).end();

	                    case 11:
	                    case 'end':
	                        return _context.stop();
	                }
	            }
	        }, _callee, this);
	    }));

	    return function checkUpdate(_x, _x2) {
	        return _ref.apply(this, arguments);
	    };
	}();

	var _model = __webpack_require__(17);

	var _baseUrl = __webpack_require__(21);

	var _baseUrl2 = _interopRequireDefault(_baseUrl);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

	exports.default = function (app) {
	    app.get('/checkupdate/:projectId', checkUpdate);
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Framework = exports.FrameworkSchema = exports.TaskSchema = exports.Task = exports.ProjectSchema = exports.Project = undefined;

	var _project = __webpack_require__(18);

	var _project2 = _interopRequireDefault(_project);

	var _task = __webpack_require__(19);

	var _task2 = _interopRequireDefault(_task);

	var _framework = __webpack_require__(20);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
	    Project: _project2.default,
	    Task: _task2.default
	};
	exports.Project = _project2.default;
	exports.ProjectSchema = _project.projectSchema;
	exports.Task = _task2.default;
	exports.TaskSchema = _task.taskSchema;
	exports.FrameworkSchema = _framework.frameworkSchema;
	exports.Framework = _framework.Framework;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Project = exports.projectSchema = undefined;

	var _mongoose = __webpack_require__(7);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var projectSchema = new _mongoose2.default.Schema({
	    name: String,
	    desc: String,
	    appId: String,
	    icon: {
	        filename: String,
	        url: String
	    },
	    ios: {
	        svn: {
	            url: String,
	            userName: String,
	            password: String
	        },
	        mobileProvision: {
	            filename: String,
	            url: String
	        },
	        certificate: {
	            file: {
	                filename: String,
	                url: String
	            },
	            password: String
	        },
	        appId: String
	    },
	    android: {
	        svn: {
	            url: String,
	            userName: String,
	            password: String
	        },
	        appId: String,
	        keyStore: {
	            file: {
	                filename: String,
	                url: String
	            },
	            userName: String,
	            password: String
	        }
	    },
	    lastRelease: {
	        ios: {
	            taskId: String, //taskId
	            version: String,
	            releaseDate: Date
	        },
	        android: {
	            taskId: String, //taskId
	            version: String,
	            releaseDate: Date
	        }
	    }
	}, {
	    toJSON: {
	        virtuals: true
	    }
	});

	var Project = _mongoose2.default.model('Project', projectSchema);
	exports.default = Project;
	exports.projectSchema = projectSchema;
	exports.Project = Project;

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Task = exports.taskSchema = undefined;

	var _mongoose = __webpack_require__(7);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	var _project = __webpack_require__(18);

	var _framework = __webpack_require__(20);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var taskSchema = new _mongoose2.default.Schema({
	    projectId: String,
	    project: _project.projectSchema,
	    version: String,
	    platform: String,
	    configuration: String,
	    release: Boolean,
	    frameworkId: String,
	    framework: _framework.frameworkSchema,
	    debug: {
	        type: Boolean,
	        default: true
	    },
	    status: {
	        code: String,
	        log: String
	    },
	    targetUrl: String,
	    package: {
	        filename: String,
	        url: String
	    },
	    dateOfCreate: { type: Date, default: Date.now }
	}, {
	    toJSON: {
	        virtuals: true
	    }
	});
	var Task = _mongoose2.default.model('Task', taskSchema);
	exports.default = Task;
	exports.taskSchema = taskSchema;
	exports.Task = Task;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Framework = exports.frameworkSchema = undefined;

	var _mongoose = __webpack_require__(7);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var frameworkSchema = new _mongoose2.default.Schema({
	    name: String,
	    desc: String,
	    url: String
	}, {
	    toJSON: {
	        virtuals: true
	    }
	});

	var Framework = _mongoose2.default.model('Framework', frameworkSchema);
	exports.default = Framework;
	exports.frameworkSchema = frameworkSchema;
	exports.Framework = Framework;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.resolve = resolve;

	var _path = __webpack_require__(5);

	var _path2 = _interopRequireDefault(_path);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var baseUrl = 'https://1.1.8.37:3001';
	exports.default = baseUrl;
	function resolve(p) {
	    return _path2.default.resolve(baseUrl, p);
	}

/***/ },
/* 22 */
/***/ function(module, exports) {

	module.exports = require("cors");

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _path = __webpack_require__(5);

	var _path2 = _interopRequireDefault(_path);

	var _webpack = __webpack_require__(13);

	var _webpack2 = _interopRequireDefault(_webpack);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = function (DEBUG, PATH) {
	    var PORT = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 3000;
	    return {
	        entry: (DEBUG ? ["webpack-hot-middleware/client?reload=true"] : []).concat(['babel-polyfill', './src/entry_ui']),

	        output: {
	            path: '/',
	            filename: "main.js",
	            publicPath: "/"
	        },

	        cache: DEBUG,
	        debug: DEBUG,

	        devtool: DEBUG ? 'source-map' : false,
	        // devtool:'eval-source-map',

	        module: {
	            loaders: [
	            // Load ES6/JSX
	            {
	                test: /\.jsx?$/,
	                include: [_path2.default.resolve("src")],
	                exclude: [],
	                loader: "babel"
	            }]
	        },
	        plugins: DEBUG ? [new _webpack2.default.optimize.OccurenceOrderPlugin(), new _webpack2.default.HotModuleReplacementPlugin(), new _webpack2.default.NoErrorsPlugin()] : [new _webpack2.default.DefinePlugin({ 'process.env.NODE_ENV': '"production"' }), new _webpack2.default.optimize.DedupePlugin(), new _webpack2.default.optimize.UglifyJsPlugin({
	            compressor: { screw_ie8: true, keep_fnames: true, warnings: false },
	            mangle: { screw_ie8: true, keep_fnames: true }
	        }), new _webpack2.default.optimize.OccurenceOrderPlugin(), new _webpack2.default.optimize.AggressiveMergingPlugin()],

	        resolveLoader: {
	            root: _path2.default.join(__dirname, "node_modules")
	        },

	        resolve: {
	            root: _path2.default.join(__dirname, "node_modules"),

	            modulesDirectories: ['node_modules'],

	            // Allow to omit extensions when requiring these files
	            extensions: ["", ".js", ".jsx"]
	        }
	    };
	};

/***/ }
/******/ ])));