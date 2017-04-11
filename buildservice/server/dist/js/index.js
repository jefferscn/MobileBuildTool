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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _pack = __webpack_require__(1);

	var _pack2 = _interopRequireDefault(_pack);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var fakeData = {
	    projectId: '001',
	    version: '0.0.1',
	    project: {
	        id: '001',
	        name: '大洋小蜜蜂',
	        desc: '{简介}',
	        ios: {
	            svn: {
	                url: 'http://1.1.2.17:8000/svn/yes/yes-mobile-pack/IOS/%E9%A1%B9%E7%9B%AE%E6%89%93%E5%8C%85%E9%9B%86/%E5%A4%A7%E6%B4%8B%E7%94%B5%E6%9C%BA/yesapp/',
	                userName: 'zhouzy',
	                password: 'zhouzy'
	            },
	            mobileProvision: '{todo}'
	        }
	    }
	};
	(0, _pack2.default)(fakeData);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _fsExtraPromise = __webpack_require__(2);

	var _fsExtraPromise2 = _interopRequireDefault(_fsExtraPromise);

	var _util = __webpack_require__(3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function pack(task) {
	    // 处理数据
	    var project = task.project.ios;
	    var svnUrl = project.svn.url;
	    return new Promise(function (resolve, reject) {
	        // process.chdir('./working');
	        // return ipa();
	        _fsExtraPromise2.default.emptyDirAsync('./working').then(function () {
	            return _util.svn.get(svnUrl, project.svn.userName, project.svn.password);
	        }).then(function () {
	            console.log('[1]更新SVN-成功');
	            process.chdir('./working');
	        }).then(function () {
	            console.log('[2]archive-开始……');
	            return (0, _util.archive)();
	        }).then(function () {
	            console.log('[2]archive成功');
	            console.log('[3]生成ipa-开始……');
	            return (0, _util.ipa)();
	        }).then(function () {
	            console.log('[3]生成ipa-成功……');
	            console.log('[4]上传ipa-开始……');
	            return upload();
	        }).then(function (data) {
	            console.log('[4]上传ipa-成功……');
	            // 保存到数据库
	            task.ipaUrl = data.url;
	            task.save();
	            return data;
	        }).then(function (data) {
	            // 生成plist
	            return generatePlist();
	        }).then(function (data) {
	            // 上传plist
	            return upload();
	        }).then(function (data) {
	            // 保存到数据库
	            task.ipaUrl = data.url;
	            task.save();
	            return data;
	        }).catch(function (e) {
	            console.log('打包失败');
	            console.log(e);
	            reject(e);
	        });
	    });
	}
	exports.default = pack;

	// TODO 三个函数 upload, generatePlist, cleanPack

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("fs-extra-promise");

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.release = exports.ipa = exports.archive = exports.svn = undefined;

	var _archive = __webpack_require__(4);

	var _archive2 = _interopRequireDefault(_archive);

	var _ipa = __webpack_require__(6);

	var _ipa2 = _interopRequireDefault(_ipa);

	var _release = __webpack_require__(8);

	var _release2 = _interopRequireDefault(_release);

	var _svn = __webpack_require__(10);

	var _svn2 = _interopRequireDefault(_svn);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.svn = _svn2.default;
	exports.archive = _archive2.default;
	exports.ipa = _ipa2.default;
	exports.release = _release2.default;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var spawn = __webpack_require__(5).spawn;
	function archive() {
	    return new Promise(function (resolve, reject) {
	        var ls = spawn('xcodebuild', ['-project', 'yesapp.xcodeproj', '-scheme', 'yesapp', '-sdk', 'iphoneos', 'archive', '-archivePath', './build/yesapp.xcarchive']);
	        ls.stdout.on('data', function (data) {
	            console.log('stdout: ' + data);
	        });
	        ls.stderr.on('data', function (data) {
	            console.log(data);
	            reject(data.toString());
	        });
	        ls.on('close', function (code) {
	            resolve(code);
	        });
	    });
	}
	exports.default = archive;

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("child_process");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _path = __webpack_require__(7);

	var _path2 = _interopRequireDefault(_path);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var spawn = __webpack_require__(5).spawn;
	function ipa(exportOption) {
	    var exportOptionsPlist = exportOption || _path2.default.resolve('../exportOptions.plist');
	    return new Promise(function (resolve, reject) {
	        var ls = spawn('xcodebuild', ['-exportArchive', '-archivePath', './build/yesapp.xcarchive', '-exportOptionsPlist', exportOptionsPlist, '-exportPath', './build']);
	        ls.stdout.on('data', function (data) {
	            console.log('stdout: ' + data);
	        });
	        ls.stderr.on('data', function (data) {
	            data = data.toString();
	            console.log(data);
	        });
	        ls.on('close', function (code) {
	            resolve(code);
	        });
	    });
	}
	exports.default = ipa;

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _fsExtra = __webpack_require__(9);

	var _fsExtra2 = _interopRequireDefault(_fsExtra);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function release() {
	    var PWD = workspaceFullPath;
	    return new Promise(function (resolve, reject) {
	        _fsExtra2.default.copy(PWD + '/build/yesapp.ipa', releaseFullPath, function (err) {
	            if (err) {
	                reject(err);
	            }
	            resolve('success!');
	        });
	    });
	}
	exports.default = release;

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("fs-extra");

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _svnSpawn = __webpack_require__(11);

	var _svnSpawn2 = _interopRequireDefault(_svnSpawn);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function get(url, username, password, dir) {
	    var dirPath = dir || './working';
	    return new Promise(function (resolve, reject) {
	        var client = new _svnSpawn2.default({
	            cwd: dirPath,
	            username: username,
	            password: password
	        });
	        client.checkout(url, function (err, data) {
	            if (err) {
	                reject(new Error(err));
	            }
	            resolve(data);
	        });
	    });
	}
	exports.default = {
	    get: get
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = require("svn-spawn");

/***/ }
/******/ ]);