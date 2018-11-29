/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(2);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = require("babel-polyfill");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _config = __webpack_require__(3);

	var _config2 = _interopRequireDefault(_config);

	var _connect = __webpack_require__(4);

	var _connect2 = _interopRequireDefault(_connect);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}

	var db = _config2.default.db;

	var app = __webpack_require__(6);
	var debug = __webpack_require__(48)('myapp:server');
	var http = __webpack_require__(49);
	// Connect database
	(0, _connect2.default)(db.uri, db.options);
	/**
	 * Get port from environment and store in Express.
	 */
	var port = normalizePort(process.env.PORT || '4000');
	app.set('port', port);
	/**
	 * Create HTTP server.
	 */
	var server = http.createServer(app);
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
	    var port = parseInt(val, 10);
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
	    var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;
	    // handle specific listen errors with friendly messages
	    switch (error.code) {
	        case 'EACCES':
	            console.error(bind + ' requires elevated privileges');
	            process.exit(1);
	            break;
	        case 'EADDRINUSE':
	            console.error(bind + ' is already in use');
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
	    var addr = server.address();
	    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
	    debug('Listening on ' + bind);
	}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    db: {
	        uri: 'mongodb://localhost/cordovapack',
	        options: {
	            // user: 'admin',
	            // pass: 'admin',
	        }
	    },
	    server: {
	        upload: 'http://1.1.8.37:3001/upload',
	        download: 'http://1.1.8.37:3001/download',
	        checkUpdate: 'https://dev.bokesoft.com/yigomobile2/checkupdate/'
	    }
	};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _templateObject = _taggedTemplateLiteral(['Mongoose connections error: ', ''], ['Mongoose connections error: ', '']);

	var _mongoose = __webpack_require__(5);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}

	function _taggedTemplateLiteral(strings, raw) {
	    return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } }));
	}

	_mongoose2.default.Promise = Promise;
	function connect(url, opt) {
	    _mongoose2.default.connect(url, opt).then(function () {
	        console.log('Database connect success.');
	    }, function (err) {
	        console.error()(_templateObject, err);
	        process.exit(1);
	    });
	}
	exports.default = connect;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = require("mongoose");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _express = __webpack_require__(7);

	var _express2 = _interopRequireDefault(_express);

	var _bodyParser = __webpack_require__(8);

	var _bodyParser2 = _interopRequireDefault(_bodyParser);

	var _poll = __webpack_require__(9);

	var _poll2 = _interopRequireDefault(_poll);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}

	var app = (0, _express2.default)();

	app.use(_bodyParser2.default.json());
	app.use(_bodyParser2.default.urlencoded({ extended: false }));

	var poll = new _poll2.default();
	poll.start();
	// catch 404 and forward to error handler
	app.use(function (req, res, next) {
	    var err = new Error('Not Found');
	    err.status = 404;
	    next(err);
	});
	// error handlers
	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development') {
	    app.use(function (err, req, res, next) {
	        res.status(err.status || 500);
	        res.render('error', {
	            message: err.message,
	            error: err
	        });
	    });
	}
	// production error handler
	// no stacktraces leaked to user
	app.use(function (err, req, res, next) {
	    res.status(err.status || 500);
	    res.render('error', {
	        message: err.message,
	        error: {}
	    });
	});
	module.exports = app;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	module.exports = require("express");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	module.exports = require("body-parser");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _pack = __webpack_require__(10);

	var _pack2 = _interopRequireDefault(_pack);

	var _index = __webpack_require__(22);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}

	function findTask() {
	    return new Promise(function (resolve, reject) {
	        _index.Task.findOne({ 'status.code': 'waiting' }, null, { sort: { 'dateOfCreate': 1 } }, function (err, task) {
	            if (err) {
	                reject(err);
	            }
	            if (!task) {
	                reject('No waiting task.');
	            }
	            resolve(task);
	        });
	    });
	}
	function Poll() {
	    this.interval = null;
	    this.busy = false;
	}
	Poll.prototype = {
	    start: function start() {
	        var _this = this;

	        this.interval = setInterval(function () {
	            _this.monitor();
	        }, 5 * 1000);
	    },
	    stop: function stop() {
	        clearInterval(this.interval);
	    },
	    monitor: function monitor() {
	        var _this2 = this;

	        if (this.busy) {
	            return;
	        }
	        this.busy = true;
	        findTask().then(function (task) {
	            return (0, _pack2.default)(task);
	        }).then(function () {
	            _this2.busy = false;
	        }).catch(function (err) {
	            console.log(err);
	            _this2.busy = false;
	        });
	    }
	};
	Poll.prototype.constructor = Poll;
	exports.default = Poll;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var pack = function () {
	    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(cfg) {
	        var o, logFile, logger, isExist, uploadLogData;
	        return regeneratorRuntime.wrap(function _callee2$(_context2) {
	            while (1) {
	                switch (_context2.prev = _context2.next) {
	                    case 0:
	                        console.log(cfg);
	                        o = new Object();

	                        o.id = cfg.id;
	                        // o.baseSvn = cfg.baseSvn;
	                        // o.projectSvn = cfg.projectSvn;
	                        o.appName = cfg.project.name;
	                        // o.appEnglish = cfg.appEnglishName;
	                        o.appDescription = cfg.project.desc;
	                        o.appIcon = 'www/app.icon';
	                        // o.appContent = cfg.appContent;
	                        // o.appPlugin = cfg.appPlugin || cfg['appPlugin[]'];
	                        // o.projectSvnUser = cfg.projectSvnUser;
	                        // o.projectSvnPassword = cfg.projectSvnPassword;
	                        o.appPlatform = cfg.platform;
	                        o.appNameSpace = cfg.appId;
	                        // o.svnDir = `${o.appName}/www`;
	                        // o.baseSvnUser = 'zhouzy';
	                        // o.baseSvnPassword = 'zhouzy';
	                        o.wwwPath = o.appName + '/www';
	                        o.iconPath = o.appName + '/www/app.icon';
	                        o.configXML = o.appName + '/config.xml';
	                        o.htmlPath = o.appName + '/www/index.html';
	                        o.appPlugin = [];
	                        // o.projectPath = `${o.svnDir}/js/lib/`;
	                        // o.projectDir = `${o.svnDir}/js/lib/${projectDirName(o.projectSvn)}`;
	                        // console.log(o.svnDir);
	                        // o.libConfigJSPath = path.resolve(__dirname, 'working', o.svnDir, 'js/lib/config/config.js');
	                        // console.log('改变后', o.libConfigJSPath);
	                        o.package = cfg.package.url;
	                        o.platform = cfg.platform;
	                        o.appBuildType = cfg.debug ? 'debug' : 'release';
	                        o.appPackageName = cfg.appId;
	                        o.appVersion = cfg.version;
	                        o.appIosMp = cfg.appIosMp;
	                        // o.yigoVersion = cfg.yigoVersion;

	                        // o.apkLink = cfg.apkDownloadLink;
	                        // o.ipaLink = cfg.ipaLink;
	                        o.androidTargetSdkVersion = cfg.androidTargetSdkVersion;

	                        logFile = 'log/' + cfg.id + '.log';
	                        logger = (0, _util.Logger)(logFile);

	                        o.build = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
	                            var file, src, dest, reg, data, ipaUrl, plistUrl, isCrosswalk, _data;

	                            return regeneratorRuntime.wrap(function _callee$(_context) {
	                                while (1) {
	                                    switch (_context.prev = _context.next) {
	                                        case 0:
	                                            logger.info('pack enviroment initializing......');
	                                            // await preparePack();
	                                            _context.next = 3;
	                                            return (0, _util.emptyDir)(workingDir);

	                                        case 3:
	                                            process.chdir(workingDir);
	                                            logger.info('pack enviroment initialize success');
	                                            logger.info('create cordova begin');
	                                            _context.next = 8;
	                                            return (0, _util.createCordova)(o.appName, o.appNameSpace);

	                                        case 8:
	                                            logger.info('create cordova success');
	                                            _context.next = 11;
	                                            return (0, _util.processCode)(o.configXML, o.appVersion, o.appPackageName, o.appName, o.appDescription, o.appIcon, null, o.appPlatform);

	                                        case 11:
	                                            logger.info('process config.xml success');
	                                            _context.next = 14;
	                                            return (0, _util.addBaiduMapScript)(o.htmlPath, o.appPlugin);

	                                        case 14:
	                                            // 解压缩任务中的压缩包
	                                            file = "tmp.zip";
	                                            _context.next = 17;
	                                            return (0, _download2.default)(o.package, file);

	                                        case 17:
	                                            _fsExtra2.default.createReadStream(file).pipe(_unzip2.default.Extract({ path: o.wwwPath }));
	                                            logger.info('unzip www OK');
	                                            console.log(cfg.project.icon);
	                                            _context.next = 22;
	                                            return (0, _download2.default)(cfg.project.icon.url, o.iconPath);

	                                        case 22:
	                                            logger.info('download icon OK');
	                                            process.chdir(o.appName);
	                                            _context.next = 26;
	                                            return (0, _util.addPlatform)(o.appPlatform);

	                                        case 26:
	                                            logger.info('cordova add platform OK');
	                                            _context.next = 29;
	                                            return (0, _util.addPlugin)(o.appPlugin);

	                                        case 29:
	                                            logger.info('cordova add plugins OK');

	                                            if (!(o.appPlatform === 'android')) {
	                                                _context.next = 33;
	                                                break;
	                                            }

	                                            _context.next = 33;
	                                            return (0, _util.buildExtras)();

	                                        case 33:
	                                            _context.next = 35;
	                                            return (0, _util.addKey)(o.appIosMp);

	                                        case 35:
	                                            logger.info('cordova add licence key OK');
	                                            _context.next = 38;
	                                            return (0, _util.buildApp)(o.platform, o.appBuildType);

	                                        case 38:
	                                            logger.info('cordova build application OK');
	                                            // await releaseFile(o.platform, o.appPlugin, o.appBuildType, o.apkLink, o.ipaLink, o.appName);
	                                            src = null;
	                                            // process.chdir(originDir);

	                                            if (!(o.appPlatform === 'ios')) {
	                                                _context.next = 56;
	                                                break;
	                                            }

	                                            dest = o.ipaLink;
	                                            reg = new RegExp('^(.+)\/(?:[^/]+)$');

	                                            dest = reg.exec(dest)[1];
	                                            src = ['platforms/ios/build/device/', o.appName, '.ipa'].join('');
	                                            _context.next = 47;
	                                            return (0, _util.upload)(_config2.default.server.upload, src);

	                                        case 47:
	                                            data = _context.sent;
	                                            ipaUrl = data.url;
	                                            // const plistUrl = `${SERVER}yigomobile/public/ios/${o.id}/manifest.plist`;
	                                            // const pageUrl = `${SERVER}yigomobile/public/ios/${o.id}/index.html`;

	                                            _context.next = 51;
	                                            return (0, _plistGen2.default)(o, ipaUrl);

	                                        case 51:
	                                            plistUrl = _context.sent;

	                                            // await htmlGen(plistUrl, o.appName, pageUrl);
	                                            // fs.copySync('manifest.plist', `${dest}/manifest.plist`);
	                                            cfg.targetUrl = plistUrl;
	                                            cfg.save();
	                                            // fs.copySync('index.html', `${dest}/index.html`);
	                                            _context.next = 63;
	                                            break;

	                                        case 56:
	                                            isCrosswalk = /crosswalk/;

	                                            if (isCrosswalk.test(o.appPlugin.toString())) {
	                                                src = ['platforms/android/build/outputs/apk/android-armv7-', o.appBuildType, '.apk'].join('');
	                                            } else {
	                                                src = ['platforms/android/build/outputs/apk/android-', o.appBuildType, '.apk'].join('');
	                                            }
	                                            _context.next = 60;
	                                            return (0, _util.upload)(_config2.default.server.upload, src);

	                                        case 60:
	                                            _data = _context.sent;

	                                            cfg.targetUrl = _data.url;
	                                            cfg.save();

	                                        case 63:
	                                            ;
	                                            _context.next = 66;
	                                            return (0, _updateProject2.default)(cfg.projectId, o.appPlatform, {
	                                                taskId: cfg.id,
	                                                version: cfg.appVersion,
	                                                releaseDate: Date.now()
	                                            });

	                                        case 66:
	                                        case 'end':
	                                            return _context.stop();
	                                    }
	                                }
	                            }, _callee, this);
	                        }));
	                        _context2.prev = 23;

	                        cfg.status.code = 'processing';
	                        _context2.next = 27;
	                        return cfg.save();

	                    case 27:
	                        _context2.next = 29;
	                        return o.build();

	                    case 29:
	                        cfg.status.code = 'done';
	                        _context2.next = 32;
	                        return cfg.save();

	                    case 32:
	                        _context2.next = 41;
	                        break;

	                    case 34:
	                        _context2.prev = 34;
	                        _context2.t0 = _context2['catch'](23);

	                        console.log(_context2.t0);
	                        logger.error(_context2.t0.message);
	                        cfg.status.code = 'error';
	                        _context2.next = 41;
	                        return cfg.save();

	                    case 41:
	                        _context2.prev = 41;

	                        console.log('finally');
	                        process.chdir(originDir);
	                        console.log(process.cwd());
	                        _context2.next = 47;
	                        return (0, _fileExist2.default)(logFile);

	                    case 47:
	                        isExist = _context2.sent;

	                        if (isExist) {
	                            _context2.next = 51;
	                            break;
	                        }

	                        console.log('logfile not exist!');
	                        return _context2.abrupt('return');

	                    case 51:
	                        _context2.next = 53;
	                        return (0, _util.upload)(_config2.default.server.upload, logFile);

	                    case 53:
	                        uploadLogData = _context2.sent;

	                        console.log(uploadLogData);
	                        cfg.status.log = uploadLogData.url;
	                        _context2.next = 58;
	                        return cfg.save();

	                    case 58:
	                        _fsExtra2.default.remove(logFile);
	                        return _context2.finish(41);

	                    case 60:
	                    case 'end':
	                        return _context2.stop();
	                }
	            }
	        }, _callee2, this, [[23, 34, 41, 60]]);
	    }));

	    return function pack(_x) {
	        return _ref.apply(this, arguments);
	    };
	}();

	__webpack_require__(1);

	var _fsExtra = __webpack_require__(11);

	var _fsExtra2 = _interopRequireDefault(_fsExtra);

	var _path = __webpack_require__(12);

	var _path2 = _interopRequireDefault(_path);

	var _plistGen = __webpack_require__(13);

	var _plistGen2 = _interopRequireDefault(_plistGen);

	var _unzip = __webpack_require__(18);

	var _unzip2 = _interopRequireDefault(_unzip);

	var _download = __webpack_require__(19);

	var _download2 = _interopRequireDefault(_download);

	var _fileExist = __webpack_require__(20);

	var _fileExist2 = _interopRequireDefault(_fileExist);

	var _updateProject = __webpack_require__(21);

	var _updateProject2 = _interopRequireDefault(_updateProject);

	var _config = __webpack_require__(3);

	var _config2 = _interopRequireDefault(_config);

	var _util = __webpack_require__(25);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}

	function _asyncToGenerator(fn) {
	    return function () {
	        var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {
	            function step(key, arg) {
	                try {
	                    var info = gen[key](arg);var value = info.value;
	                } catch (error) {
	                    reject(error);return;
	                }if (info.done) {
	                    resolve(value);
	                } else {
	                    return Promise.resolve(value).then(function (value) {
	                        step("next", value);
	                    }, function (err) {
	                        step("throw", err);
	                    });
	                }
	            }return step("next");
	        });
	    };
	}

	var workingDir = _path2.default.resolve(process.cwd(), 'working');
	var originDir = _path2.default.resolve(process.cwd(), '.');

	exports.default = pack;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	module.exports = require("fs-extra");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	module.exports = require("path");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var plistGen = function () {
	    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(o, ipaUrl) {
	        var url, data, fileName, resp;
	        return regeneratorRuntime.wrap(function _callee$(_context) {
	            while (1) {
	                switch (_context.prev = _context.next) {
	                    case 0:
	                        // return new Promise(function (resolve, reject) {
	                        console.log(ipaUrl);
	                        url = encodeURI(ipaUrl);

	                        console.log(url);
	                        assets[0].url = url;
	                        metadate['bundle-identifier'] = o.appPackageName;
	                        metadate['bundle-version'] = o.appVersion;
	                        metadate['title'] = o.appName;
	                        console.log(manifestJson);
	                        data = plist.build(manifestJson);
	                        fileName = 'manifest.plist';
	                        _context.next = 12;
	                        return fs.writeFile(fileName, data);

	                    case 12:
	                        _context.next = 14;
	                        return (0, _upload2.default)(_config2.default.server.upload, fileName);

	                    case 14:
	                        resp = _context.sent;
	                        return _context.abrupt('return', resp.url);

	                    case 16:
	                    case 'end':
	                        return _context.stop();
	                }
	            }
	        }, _callee, this);
	    }));

	    return function plistGen(_x, _x2) {
	        return _ref.apply(this, arguments);
	    };
	}();

	var _upload = __webpack_require__(14);

	var _upload2 = _interopRequireDefault(_upload);

	var _config = __webpack_require__(3);

	var _config2 = _interopRequireDefault(_config);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}

	function _asyncToGenerator(fn) {
	    return function () {
	        var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {
	            function step(key, arg) {
	                try {
	                    var info = gen[key](arg);var value = info.value;
	                } catch (error) {
	                    reject(error);return;
	                }if (info.done) {
	                    resolve(value);
	                } else {
	                    return Promise.resolve(value).then(function (value) {
	                        step("next", value);
	                    }, function (err) {
	                        step("throw", err);
	                    });
	                }
	            }return step("next");
	        });
	    };
	}

	var fs = __webpack_require__(11);
	var plist = __webpack_require__(17);
	var manifestJson = {
	    "items": [{
	        "assets": [{
	            "kind": "software-package",
	            "url": "https://www.zhouzhongyuan.com/yigomobile/public/ios/1463708886000/Yigo520-debug.ipa"
	        }],
	        "metadata": {
	            "bundle-identifier": "com.bokesoft.ceo",
	            "bundle-version": "1.2.7",
	            "kind": "software",
	            "title": "车掌柜"
	        }
	    }]
	};
	var assets = manifestJson.items[0].assets;
	var metadate = manifestJson.items[0].metadata;
	;
	module.exports = plistGen;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _request = __webpack_require__(15);

	var _request2 = _interopRequireDefault(_request);

	var _fs = __webpack_require__(16);

	var _fs2 = _interopRequireDefault(_fs);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}

	function upload(url, filePath, contentType) {
	    return new Promise(function (resolve, reject) {
	        var formData = {
	            file: {
	                value: _fs2.default.createReadStream(filePath),
	                options: {}
	            }
	        };
	        if (contentType) {
	            formData.file.options.contentType = contentType;
	        }
	        _request2.default.post({ url: url, formData: formData }, function (err, httpResponse, body) {
	            if (err) {
	                reject(err);
	            }
	            var data = body;
	            if (typeof body === 'string') {
	                data = JSON.parse(body);
	            }
	            resolve(data);
	        });
	    });
	}
	exports.default = upload;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	module.exports = require("request");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	module.exports = require("fs");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	module.exports = require("plist");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	module.exports = require("unzip");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _request = __webpack_require__(15);

	var _request2 = _interopRequireDefault(_request);

	var _fs = __webpack_require__(16);

	var _fs2 = _interopRequireDefault(_fs);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}

	function download(url, file) {
	    return new Promise(function (resolve, reject) {
	        var stream = (0, _request2.default)(url).pipe(_fs2.default.createWriteStream(file));
	        stream.on('error', function (err) {
	            reject(err);
	        });
	        stream.on('finish', function () {
	            resolve('Download success');
	        });
	    });
	}
	exports.default = download;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _fs = __webpack_require__(16);

	var _fs2 = _interopRequireDefault(_fs);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}

	function fileExist(file) {
	    return new Promise(function (resolve, reject) {
	        _fs2.default.open(file, 'r', function (err) {
	            if (err) {
	                if (err.code === 'ENOENT') {
	                    reject(false);
	                }
	            }
	            resolve(true);
	        });
	    });
	}
	exports.default = fileExist;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var updateProject = function () {
	    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(id, platform, obj) {
	        var project;
	        return regeneratorRuntime.wrap(function _callee$(_context) {
	            while (1) {
	                switch (_context.prev = _context.next) {
	                    case 0:
	                        _context.next = 2;
	                        return _index.Project.findById(id).exec();

	                    case 2:
	                        project = _context.sent;

	                        project.lastRelease[platform] = obj;
	                        _context.next = 6;
	                        return project.save();

	                    case 6:
	                    case 'end':
	                        return _context.stop();
	                }
	            }
	        }, _callee, this);
	    }));

	    return function updateProject(_x, _x2, _x3) {
	        return _ref.apply(this, arguments);
	    };
	}();

	var _index = __webpack_require__(22);

	function _asyncToGenerator(fn) {
	    return function () {
	        var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {
	            function step(key, arg) {
	                try {
	                    var info = gen[key](arg);var value = info.value;
	                } catch (error) {
	                    reject(error);return;
	                }if (info.done) {
	                    resolve(value);
	                } else {
	                    return Promise.resolve(value).then(function (value) {
	                        step("next", value);
	                    }, function (err) {
	                        step("throw", err);
	                    });
	                }
	            }return step("next");
	        });
	    };
	}

	exports.default = updateProject;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Task = exports.Project = undefined;

	var _project = __webpack_require__(23);

	var _project2 = _interopRequireDefault(_project);

	var _task = __webpack_require__(24);

	var _task2 = _interopRequireDefault(_task);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Project = _project2.default;
	exports.Task = _task2.default;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Project = exports.projectSchema = undefined;

	var _mongoose = __webpack_require__(5);

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
	            taskId: String,
	            version: String,
	            releaseDate: Date
	        },
	        android: {
	            taskId: String,
	            version: String,
	            releaseDate: Date
	        }
	    }
	}, {
	    toJSON: {
	        virtuals: true
	    }
	});

	projectSchema.pre();

	var Project = _mongoose2.default.model('Project', projectSchema);
	exports.default = Project;
	exports.projectSchema = projectSchema;
	exports.Project = Project;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.Task = exports.taskSchema = undefined;

	var _mongoose = __webpack_require__(5);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	var _project = __webpack_require__(23);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var taskSchema = new _mongoose2.default.Schema({
	    projectId: String,
	    project: _project.projectSchema,
	    version: String,
	    platform: String,
	    configuration: String,
	    release: Boolean,
	    debug: Boolean,
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

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.upload = exports.Logger = exports.addBaiduMapScript = exports.preparePack = exports.getSvn = exports.projectDirName = exports.changelibConfigJSPath = exports.createCordova = exports.processCode = exports.preparePlatform = exports.addPlugin = exports.buildExtras = exports.addKey = exports.releaseFile = exports.buildApp = exports.emptyDir = exports.addPlatform = undefined;

	var _platform = __webpack_require__(26);

	var _platform2 = _interopRequireDefault(_platform);

	var _emptyDir = __webpack_require__(28);

	var _emptyDir2 = _interopRequireDefault(_emptyDir);

	var _buildApp = __webpack_require__(29);

	var _buildApp2 = _interopRequireDefault(_buildApp);

	var _releaseFile = __webpack_require__(30);

	var _releaseFile2 = _interopRequireDefault(_releaseFile);

	var _addKey = __webpack_require__(31);

	var _addKey2 = _interopRequireDefault(_addKey);

	var _buildExtras = __webpack_require__(32);

	var _buildExtras2 = _interopRequireDefault(_buildExtras);

	var _addPlugin = __webpack_require__(33);

	var _addPlugin2 = _interopRequireDefault(_addPlugin);

	var _preparePlatform = __webpack_require__(35);

	var _preparePlatform2 = _interopRequireDefault(_preparePlatform);

	var _processCode = __webpack_require__(36);

	var _processCode2 = _interopRequireDefault(_processCode);

	var _createCordova = __webpack_require__(38);

	var _createCordova2 = _interopRequireDefault(_createCordova);

	var _changelibConfigJSPath = __webpack_require__(39);

	var _changelibConfigJSPath2 = _interopRequireDefault(_changelibConfigJSPath);

	var _projectDirName = __webpack_require__(40);

	var _projectDirName2 = _interopRequireDefault(_projectDirName);

	var _getSvn = __webpack_require__(41);

	var _getSvn2 = _interopRequireDefault(_getSvn);

	var _preparePack = __webpack_require__(43);

	var _preparePack2 = _interopRequireDefault(_preparePack);

	var _addBaiduMapScript = __webpack_require__(44);

	var _addBaiduMapScript2 = _interopRequireDefault(_addBaiduMapScript);

	var _logger = __webpack_require__(45);

	var _logger2 = _interopRequireDefault(_logger);

	var _upload = __webpack_require__(14);

	var _upload2 = _interopRequireDefault(_upload);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}

	exports.addPlatform = _platform2.default;
	exports.emptyDir = _emptyDir2.default;
	exports.buildApp = _buildApp2.default;
	exports.releaseFile = _releaseFile2.default;
	exports.addKey = _addKey2.default;
	exports.buildExtras = _buildExtras2.default;
	exports.addPlugin = _addPlugin2.default;
	exports.preparePlatform = _preparePlatform2.default;
	exports.processCode = _processCode2.default;
	exports.createCordova = _createCordova2.default;
	exports.changelibConfigJSPath = _changelibConfigJSPath2.default;
	exports.projectDirName = _projectDirName2.default;
	exports.getSvn = _getSvn2.default;
	exports.preparePack = _preparePack2.default;
	exports.addBaiduMapScript = _addBaiduMapScript2.default;
	exports.Logger = _logger2.default;
	exports.upload = _upload2.default;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _cordovaLib = __webpack_require__(27);

	function addPlatform(platform) {
	    return new Promise(function (resolve, reject) {
	        _cordovaLib.cordova.platform('add', platform, { 'verbose': true }, function (err, data) {
	            if (err) {
	                console.log(err);
	                reject(new Error(err));
	            }
	            resolve(data);
	        });
	    });
	};
	exports.default = addPlatform;

/***/ }),
/* 27 */
/***/ (function(module, exports) {

	module.exports = require("cordova-lib");

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _fsExtra = __webpack_require__(11);

	var _fsExtra2 = _interopRequireDefault(_fsExtra);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}

	function emptyDir(dir) {
	    return new Promise(function (resolve, reject) {
	        _fsExtra2.default.emptydir(dir, function (err, data) {
	            if (err) {
	                reject(new Error(err));
	            }
	            resolve(data);
	        });
	    });
	};
	exports.default = emptyDir;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _cordovaLib = __webpack_require__(27);

	function buildApp(platform, appBuildType) {
	    var buildType = appBuildType === 'release' ? true : false;
	    return new Promise(function (resolve, reject) {
	        _cordovaLib.cordova.build({
	            platforms: [platform],
	            options: { "release": buildType, "silent": false, "device": true }
	        }, function (err, data) {
	            if (err) {
	                reject(new Error(err));
	            }
	            resolve(data);
	        });
	    });
	};

	exports.default = buildApp;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _fsExtra = __webpack_require__(11);

	var _fsExtra2 = _interopRequireDefault(_fsExtra);

	var _path = __webpack_require__(12);

	var _path2 = _interopRequireDefault(_path);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}

	function releaseFile(platform, appPlugin, appBuildType, apkLink, ipaLink, appName) {
	    return new Promise(function (resolve, reject) {
	        var src;
	        var dest;
	        switch (platform) {
	            case 'android':
	                var isCrosswalk = /crosswalk/;
	                if (isCrosswalk.test(appPlugin.toString())) {
	                    src = ['platforms/android/build/outputs/apk/android-armv7-', appBuildType, '.apk'].join('');
	                } else {
	                    src = ['platforms/android/build/outputs/apk/android-', appBuildType, '.apk'].join('');
	                }
	                dest = apkLink;
	                break;
	            case 'ios':
	                src = ['platforms/ios/build/device/', appName, '.ipa'].join('');
	                dest = ipaLink;
	                break;
	            default:
	                reject('The platform is not support.');
	        };
	        // console.log('cwd releaseFile');
	        // console.log('cwd',process.cwd());
	        // console.log('__dirname', __dirname);
	        // console.log(src, dest);
	        // src = path.resolve(process.cwd(),src);
	        // dest = path.resolve(process.cwd(),dest);
	        // console.log(src, dest);
	        // fs.copy(src, dest,function (err, data) {
	        //     if (err) {
	        //         console.log(err);
	        //         reject(new Error(err));
	        //         return;
	        //     }
	        //     resolve(data);
	        // });
	    });
	};
	exports.default = releaseFile;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _fsExtra = __webpack_require__(11);

	var _fsExtra2 = _interopRequireDefault(_fsExtra);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}

	function addKey(appIosMp) {
	    return new Promise(function (resolve, reject) {
	        var json = {
	            "android": {
	                "release": {
	                    "keystore": "../../key/android.keystore",
	                    "storePassword": "bokesoft",
	                    "alias": "android",
	                    "password": "bokesoft",
	                    "keystoreType": ""
	                },
	                "debug": {
	                    "keystore": "../../key/android.keystore",
	                    "storePassword": "bokesoft",
	                    "alias": "android",
	                    "password": "bokesoft",
	                    "keystoreType": ""
	                }
	            },
	            "ios": {
	                "debug": {
	                    "codeSignIdentitiy": "iPhone Development",
	                    "provisioningProfile": "2538e3a2-e134-4968-9d67-6f3220027cc4"

	                },
	                "release": {
	                    "codeSignIdentitiy": "iPhone Distribution",
	                    "provisioningProfile": "2538e3a2-e134-4968-9d67-6f3220027cc4"

	                }
	            }
	        };
	        //修改mp
	        json.ios.debug.provisioningProfile = appIosMp;
	        json.ios.release.provisioningProfile = appIosMp;
	        var json = JSON.stringify(json);
	        _fsExtra2.default.writeFile('build.json', json, function (err, data) {
	            if (err) {
	                reject(new Error(err));
	            }
	            resolve(data);
	        });
	    });
	}
	exports.default = addKey;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _fsExtra = __webpack_require__(11);

	var _fsExtra2 = _interopRequireDefault(_fsExtra);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}

	function buildExtras() {
	    var lintOptions = "android {\n" + "    lintOptions {\n" + "        disable 'MissingTranslation'\n" + "        disable 'ExtraTranslation'\n" + "    }\n" + "}";
	    return new Promise(function (resolve, reject) {

	        _fsExtra2.default.writeFile('platforms/android/build-extras.gradle', lintOptions, function (err, data) {
	            if (err) {
	                reject(new Error(err));
	            }
	            resolve(data);
	        });
	    });
	};
	exports.default = buildExtras;

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var addPlugin = function () {
	    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(appPlugin) {
	        var pluginPre, plugin, pluginWithVariable, pluginWithoutVariable, customPluginReg, i, pluginName, pluginVariable, variable;
	        return regeneratorRuntime.wrap(function _callee$(_context) {
	            while (1) {
	                switch (_context.prev = _context.next) {
	                    case 0:
	                        console.log('addPlugin');
	                        console.log('cwd', process.cwd());
	                        console.log('__dirname', __dirname);
	                        pluginPre = _path2.default.resolve(process.cwd(), '../../../local_plugin/');
	                        // return co(function *() {

	                        plugin = appPlugin;

	                        if (!(typeof plugin != 'undefined' && plugin.length != 0)) {
	                            _context.next = 28;
	                            break;
	                        }

	                        //为了兼容以前的"cordova-plugin-app-version,cordova-plugin-camera,cordova-plugin-device"类型
	                        try {
	                            plugin = JSON.parse(plugin);
	                        } catch (e) {
	                            plugin = plugin.split(',');
	                        }
	                        //分类
	                        pluginWithVariable = [];
	                        pluginWithoutVariable = [];
	                        customPluginReg = /^https?:\/\/(www\.)?/i;

	                        for (i = 0; i < plugin.length; i++) {
	                            if (plugin[i].indexOf('?') === -1) {
	                                if (customPluginReg.test(plugin[i].toString())) {
	                                    pluginWithoutVariable.push(plugin[i].toString());
	                                } else {
	                                    pluginWithoutVariable.push(pluginPre + '/' + plugin[i].toString());
	                                }
	                            } else {
	                                if (customPluginReg.test(plugin[i].toString())) {
	                                    pluginWithVariable.push(plugin[i].toString());
	                                } else {
	                                    pluginWithVariable.push(pluginPre + '/' + plugin[i].toString());
	                                }
	                            }
	                        }

	                        if (!(pluginWithVariable.length !== 0)) {
	                            _context.next = 25;
	                            break;
	                        }

	                        i = 0;

	                    case 13:
	                        if (!(i < pluginWithVariable.length)) {
	                            _context.next = 25;
	                            break;
	                        }

	                        //拆分plugin 和 variable
	                        plugin = pluginWithVariable[i].toString();
	                        pluginName = plugin.split('?')[0].toString();
	                        pluginVariable = plugin.split('?')[1];
	                        //toJson

	                        variable = {};

	                        variable.cli_variables = {};
	                        pluginVariable.split('&').forEach(function (v) {
	                            variable.cli_variables[v.split('=')[0]] = v.split('=')[1];
	                        });
	                        _context.next = 22;
	                        return (0, _addPluginReal2.default)(pluginName, variable);

	                    case 22:
	                        i++;
	                        _context.next = 13;
	                        break;

	                    case 25:
	                        if (!(pluginWithoutVariable.length !== 0)) {
	                            _context.next = 28;
	                            break;
	                        }

	                        _context.next = 28;
	                        return (0, _addPluginReal2.default)(pluginWithoutVariable);

	                    case 28:
	                    case 'end':
	                        return _context.stop();
	                }
	            }
	        }, _callee, this);
	    }));

	    return function addPlugin(_x) {
	        return _ref.apply(this, arguments);
	    };
	}();

	var _path = __webpack_require__(12);

	var _path2 = _interopRequireDefault(_path);

	var _addPluginReal = __webpack_require__(34);

	var _addPluginReal2 = _interopRequireDefault(_addPluginReal);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}

	function _asyncToGenerator(fn) {
	    return function () {
	        var gen = fn.apply(this, arguments);return new Promise(function (resolve, reject) {
	            function step(key, arg) {
	                try {
	                    var info = gen[key](arg);var value = info.value;
	                } catch (error) {
	                    reject(error);return;
	                }if (info.done) {
	                    resolve(value);
	                } else {
	                    return Promise.resolve(value).then(function (value) {
	                        step("next", value);
	                    }, function (err) {
	                        step("throw", err);
	                    });
	                }
	            }return step("next");
	        });
	    };
	}

	;
	exports.default = addPlugin;
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _cordovaLib = __webpack_require__(27);

	function addPluginReal(plugin, variable) {
	    return new Promise(function (resolve, reject) {
	        _cordovaLib.cordova.plugin('add', plugin, variable, { 'verbose': true }, function (err, data) {
	            if (err) {
	                console.error(err.stack);
	                reject(new Error(err));
	            }
	            resolve(data);
	        });
	    });
	};

	exports.default = addPluginReal;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _cordovaLib = __webpack_require__(27);

	function preparePlatform(platform) {
	    return new Promise(function (resolve, reject) {
	        _cordovaLib.cordova.prepare({ platforms: [platform], options: {} }, function (err, data) {
	            if (err) {
	                reject(new Error(err));
	            }
	            resolve(data);
	        });
	    });
	};
	exports.default = preparePlatform;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _cheerio = __webpack_require__(37);

	var _cheerio2 = _interopRequireDefault(_cheerio);

	var _fsExtra = __webpack_require__(11);

	var _fsExtra2 = _interopRequireDefault(_fsExtra);

	var _cordovaLib = __webpack_require__(27);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}

	function processCode(configXML, appVersion, appPackageName, appName, appDescription, appIcon, androidTargetSdkVersion, appPlatform) {
	    var configPath = configXML;
	    return new Promise(function (resolve, reject) {
	        var conf = new _cordovaLib.configparser(configPath);
	        if (appVersion) conf.setVersion(appVersion);
	        if (appPackageName) conf.setPackageName(appPackageName);
	        if (appName) conf.setName(appName);
	        if (appDescription) conf.setDescription(appDescription);
	        //TODO icon
	        var icons = conf.getIcons(appPlatform);
	        if (appIcon) {
	            conf.addElement('icon', { 'src': appIcon });
	        }
	        //TODO access
	        conf.addElement('access', { 'origin': 'cdvfile://*' });
	        //TODO preference
	        conf.addElement('preference', { 'name': 'WebViewBounce', 'value': 'false' });
	        conf.addElement('preference', { 'name': 'DisallowOverscroll', 'value': 'true' });
	        conf.addElement('preference', { 'name': 'Orientation', 'value': 'portrait' });
	        conf.addElement('allow-navigation', { 'href': '*' });
	        //防止Android6.0（API 23）权限出现问题,强制API为22
	        conf.addElement('preference', { 'name': 'android-targetSdkVersion', 'value': androidTargetSdkVersion || '22' });
	        //splash image
	        conf.write();
	        try {
	            var $ = _cheerio2.default.load(_fsExtra2.default.readFileSync(configXML), {
	                decodeEntities: false,
	                xmlMode: true
	            });
	            if ($) {
	                var splash = '<platform name="ios">' + '<splash src="../../res/ios/Default~iphone.png" width="320" height="480"/>' + '<splash src="../../res/ios/Default@2x~iphone.png" width="640" height="960"/>' + '<splash src="../../res/ios/Default-Portrait~ipad.png" width="768" height="1024"/>' + '<splash src="../../res/ios/Default-Portrait@2x~ipad.png" width="1536" height="2048"/>' + '<splash src="../../res/ios/Default-Landscape~ipad.png" width="1024" height="768"/>' + '<splash src="../../res/ios/Default-Landscape@2x~ipad.png" width="2048" height="1536"/>' + '<splash src="../../res/ios/Default-568h@2x~iphone.png" width="640" height="1136"/>' + '<splash src="../../res/ios/Default-667h.png" width="750" height="1334"/>' + '<splash src="../../res/ios/Default-736h.png" width="1242" height="2208"/>' + '<splash src="../../res/ios/Default-Landscape-736h.png" width="2208" height="1242"/>' + '</platform>';
	                $('widget').append(splash);

	                //content
	                //<content src="index.html"/>
	                // if(appBuildType === 'debug'){
	                //     $('content').attr('src','servicepath.html');
	                // }

	                _fsExtra2.default.writeFile(configXML, $.xml(), function (err, data) {
	                    if (err) {
	                        reject(new Error(err));
	                    }

	                    resolve(data);
	                });
	            }
	        } catch (ex) {
	            reject(ex);
	        }
	    });
	};
	exports.default = processCode;

/***/ }),
/* 37 */
/***/ (function(module, exports) {

	module.exports = require("cheerio");

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _cordovaLib = __webpack_require__(27);

	function createCordova(appName, appNameSpace) {
	    return new Promise(function (resolve, reject) {
	        _cordovaLib.cordova.create(appName, appNameSpace, appName, function (err, data) {
	            if (err) {
	                reject(new Error(err));
	            }
	            resolve(data);
	        });
	    });
	};
	exports.default = createCordova;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _fsExtra = __webpack_require__(11);

	var _fsExtra2 = _interopRequireDefault(_fsExtra);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}

	function changelibConfigJSPath(libConfigJSPath, projectDirName) {
	    console.log(process.cwd());
	    console.log(libConfigJSPath);
	    return new Promise(function (resolve, reject) {
	        var configJs = 'define(["lib/' + projectDirName + '/config"],function(config) {\n' + '    return config;\n' + '});';
	        _fsExtra2.default.writeFile(libConfigJSPath, configJs, function (err, data) {
	            if (err) {
	                reject(new Error(err));
	            }
	            resolve(data);
	        });
	    });
	} //Change cordova/www/js/lib/config/config.js
	;
	exports.default = changelibConfigJSPath;

/***/ }),
/* 40 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function projectDirName(projectSvn) {
	    var projectDirName = projectSvn;
	    if (projectDirName.split('/').slice(-1).toString().length < 1) {
	        projectDirName = projectDirName.split('/').slice(-2, -1);
	    } else {
	        projectDirName = projectDirName.split('/').slice(-1);
	    }
	    projectDirName = projectDirName.toString();
	    return projectDirName;
	};
	exports.default = projectDirName;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _svnSpawn = __webpack_require__(42);

	var _svnSpawn2 = _interopRequireDefault(_svnSpawn);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}

	function getSvn(url, dir, username, password) {
	    return new Promise(function (resolve, reject) {
	        var client = new _svnSpawn2.default({
	            cwd: dir,
	            username: username,
	            password: password
	        });
	        client.checkout(url, function (err, data) {
	            if (err) {
	                reject(new Error(err));
	                return;
	            }
	            resolve(data);
	        });
	    });
	};
	exports.default = getSvn;

/***/ }),
/* 42 */
/***/ (function(module, exports) {

	module.exports = require("svn-spawn");

/***/ }),
/* 43 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function preparePack() {
	    return new Promise(function (resolve, reject) {
	        var cwd = process.cwd().split('/');
	        console.log(cwd);
	        var parentDir = cwd[cwd.length - 2].toString();

	        if (parentDir == 'working') {
	            process.chdir('../..');
	            resolve('Change dir to cordova\'s parent dir.');
	        }
	        resolve('The current dir is right.\nNo need to change.');
	    });
	}
	exports.default = preparePack;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _fsExtra = __webpack_require__(11);

	var _fsExtra2 = _interopRequireDefault(_fsExtra);

	var _cheerio = __webpack_require__(37);

	var _cheerio2 = _interopRequireDefault(_cheerio);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}

	var normalPlugin = 'cordova-plugin-geolocation';
	var androidPlugin = 'cordova-plugin-geoloaction-baidu-android';
	var iosPlugin = 'cordova-plugin-geolocation-baidu';

	var needScript = function needScript(pluginList) {
	    console.log(pluginList);
	    var pluginListStr = pluginList.toString();

	    if (pluginListStr.indexOf(normalPlugin) !== -1 || pluginListStr.indexOf(androidPlugin) !== -1 || pluginListStr.indexOf(iosPlugin) !== -1) {
	        return true;
	    }
	    return false;
	};

	var script = '\n    <script type="text/javascript" src="http://api.map.baidu.com/api?v=2.0&ak=fSDn0wEEkKVVunWlh1GqyMoU"></script>';
	var addBaiduMapScript = function addBaiduMapScript(htmlPath, pluginList) {
	    return new Promise(function (resolve, reject) {
	        // determine if need to add baidu map script
	        var isNeedScript = needScript(pluginList);
	        if (!isNeedScript) {
	            resolve();
	        }
	        // find location
	        try {
	            var $ = _cheerio2.default.load(_fsExtra2.default.readFileSync(htmlPath), {});
	            // insert script in head first
	            if ($) {
	                $('head').prepend(script);
	            }
	            var newHtml = $.html();
	            _fsExtra2.default.writeFile(htmlPath, newHtml, function (err, data) {
	                if (err) {
	                    reject(new Error(err));
	                }
	                resolve(data);
	            });
	        } catch (e) {
	            reject(e);
	        }
	    });
	};

	exports.default = addBaiduMapScript;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _winston = __webpack_require__(46);

	var _winston2 = _interopRequireDefault(_winston);

	var _moment = __webpack_require__(47);

	var _moment2 = _interopRequireDefault(_moment);

	function _interopRequireDefault(obj) {
	    return obj && obj.__esModule ? obj : { default: obj };
	}

	function Logger(fileName) {
	    return new _winston2.default.Logger({
	        transports: [new _winston2.default.transports.File({
	            filename: fileName,
	            timestamp: function timestamp() {
	                return (0, _moment2.default)().format('YYYY-MM-DD HH:mm:ss:SSS');
	            },
	            formatter: function formatter(options) {
	                return options.timestamp() + ' ' + options.level.toUpperCase() + ' ' + (options.message ? options.message : '') + (options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : '');
	            }
	        })]
	    });
	}
	exports.default = Logger;

/***/ }),
/* 46 */
/***/ (function(module, exports) {

	module.exports = require("winston");

/***/ }),
/* 47 */
/***/ (function(module, exports) {

	module.exports = require("moment");

/***/ }),
/* 48 */
/***/ (function(module, exports) {

	module.exports = require("debug");

/***/ }),
/* 49 */
/***/ (function(module, exports) {

	module.exports = require("http");

/***/ })
/******/ ]);