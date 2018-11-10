/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./app/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./app/js/general/layout.js":
/*!**********************************!*\
  !*** ./app/js/general/layout.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Layout {\r\n\r\n    constructor (...pages) {\r\n        // Layout takes multiple pages and calls their load method.\r\n        this.pages = pages;\r\n    }\r\n\r\n    load () {\r\n        // Call each page load method and return when all are resolved.\r\n        return Promise.all(this.pages.map(page => page.load()));\r\n    }\r\n\r\n    render (element) {\r\n        for (let page of this.pages) {\r\n            const div = document.createElement('div');\r\n            page.render(div);\r\n            element.appendChild(div);\r\n        }\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Layout);\n\n//# sourceURL=webpack:///./app/js/general/layout.js?");

/***/ }),

/***/ "./app/js/general/page.js":
/*!********************************!*\
  !*** ./app/js/general/page.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Page {\r\n\r\n    constructor (url) {\r\n        this.url = `app/views/${url}`;\r\n    }\r\n\r\n    load () {\r\n        return fetch(this.url)\r\n            .then(response => response.text())\r\n            .then(data => this.html = data)\r\n            .catch(err => this.html = 'Something went wrong!');\r\n    }\r\n\r\n    render (element) {\r\n        element.innerHTML = this.html;\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Page);\n\n//# sourceURL=webpack:///./app/js/general/page.js?");

/***/ }),

/***/ "./app/js/general/router.js":
/*!**********************************!*\
  !*** ./app/js/general/router.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Router {\r\n\r\n    constructor(routes, element) {\r\n        this.routes = routes;\r\n        this.element = element;\r\n\r\n        window.onhashchange = this.hashChanged.bind(this);\r\n        this.hashChanged();\r\n    }\r\n\r\n    async hashChanged (event) {\r\n        if (window.location.hash.length) {\r\n            // Get the new page and render it.\r\n            const pageName = window.location.hash.substr(1);\r\n            this.render(pageName);\r\n        } else {\r\n            // If no path - render default\r\n            this.render('#default');\r\n        }\r\n    }\r\n\r\n    async render (pageName) {\r\n        let page = this.routes[pageName];\r\n        \r\n        if(!page)\r\n            page = this.routes['notFound'];\r\n\r\n        await page.load();\r\n        this.element.innerHTML = '';\r\n        page.render(this.element);\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Router);\n\n//# sourceURL=webpack:///./app/js/general/router.js?");

/***/ }),

/***/ "./app/js/main.js":
/*!************************!*\
  !*** ./app/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _general_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./general/router */ \"./app/js/general/router.js\");\n/* harmony import */ var _general_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./general/layout */ \"./app/js/general/layout.js\");\n/* harmony import */ var _general_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./general/page */ \"./app/js/general/page.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nconst router = new _general_router__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\r\n        login: new _general_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('login.html'),\r\n        home: new _general_layout__WEBPACK_IMPORTED_MODULE_1__[\"default\"](new _general_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('menu.html'), new _general_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('home.html')),\r\n        notFound: new _general_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('404.html'),\r\n        '#default': new _general_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('login.html'),\r\n    },\r\n    document.querySelector('main')\r\n);\n\n//# sourceURL=webpack:///./app/js/main.js?");

/***/ })

/******/ });