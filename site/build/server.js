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
/******/ 	__webpack_require__.p = "/build/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _express = __webpack_require__(2);

	var _express2 = _interopRequireDefault(_express);

	var _bodyParser = __webpack_require__(3);

	var _bodyParser2 = _interopRequireDefault(_bodyParser);

	var _methodOverride = __webpack_require__(4);

	var _methodOverride2 = _interopRequireDefault(_methodOverride);

	var _mongoose = __webpack_require__(5);

	var _mongoose2 = _interopRequireDefault(_mongoose);

	var _morgan = __webpack_require__(6);

	var _morgan2 = _interopRequireDefault(_morgan);

	var _nodeRestful = __webpack_require__(7);

	var _nodeRestful2 = _interopRequireDefault(_nodeRestful);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var app = new _express2.default();
	exports.default = app;


	app.use((0, _morgan2.default)('dev'));
	app.use(_bodyParser2.default.urlencoded({ 'extended': 'true' }));
	app.use(_bodyParser2.default.json());
	app.use(_bodyParser2.default.json({ type: 'application/vnd.api+json' }));
	app.use((0, _methodOverride2.default)());

	app.mongoose = _mongoose2.default; // used for testing

	_mongoose2.default.connect("mongodb://localhost/mbt");

	var user = app.user = _nodeRestful2.default.model('projects', _mongoose2.default.Schema({
	    name: { type: 'string', required: true },
	    desc: { type: 'string' }
	})).methods(['get', 'post', 'put', 'delete']).before('get', function (req, res, next) {
	    req.body.limit = 1;
	    next();
	}).includeSchema(false);

	user.register(app, '/projects');

	app.listen(3001);

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("method-override");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("node-restful");

/***/ }
/******/ ])));