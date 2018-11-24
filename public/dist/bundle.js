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

/***/ "./app/js/components/edit.js":
/*!***********************************!*\
  !*** ./app/js/components/edit.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _controllers_activity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/activity */ \"./app/js/controllers/activity.js\");\n// This class will both be used to add new and edit existing event.\r\n\r\n\r\nclass Edit {\r\n\r\n    constructor() {\r\n        this.DOMElement = document.querySelector('section#edit');\r\n\r\n        this.attendees = [];\r\n        // Used to give an id to the attendee elements\r\n        this.attendeeId = 1;\r\n\r\n        this.init();\r\n\r\n    }\r\n\r\n    init () {\r\n\r\n        this.addAttendee();\r\n\r\n        this.DOMElement.querySelector('button[type=\"submit\"]').addEventListener('click', event => {\r\n\r\n            event.preventDefault();\r\n\r\n            let activityData = {\r\n                title: this.DOMElement.querySelector('input[name=\"title\"]').value,\r\n                information: this.DOMElement.querySelector('input[name=\"information\"]').value,\r\n                time: this.DOMElement.querySelector('input[name=\"time\"]').value,\r\n                attendees: this.attendees.map(attendee => attendee.name),\r\n            };\r\n\r\n            _controllers_activity__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createActivity(activityData);\r\n\r\n        })\r\n\r\n        // if (!this.attendees.length) {\r\n\r\n        //     this.DOMElement.querySelector('.attendees').innerHTML += 'No attendees added.';\r\n\r\n        // }\r\n        \r\n    }\r\n\r\n    addAttendee () {\r\n\r\n        let buttonEl = this.DOMElement.querySelector('form button');\r\n        let newAttendeeEl = this.DOMElement.querySelector('input[name=\"attendee\"]');\r\n        let attendeesEl = this.DOMElement.querySelector('.attendees');\r\n\r\n        buttonEl.addEventListener('click', event => {\r\n\r\n            event.preventDefault();\r\n\r\n            this.attendees.push({id: this.attendeeId, name: newAttendeeEl.value});\r\n            attendeesEl.appendChild(this.createAttendeeEl(this.attendeeId, newAttendeeEl.value));\r\n            this.attendeeId++;\r\n            \r\n            newAttendeeEl.value = '';\r\n\r\n        });\r\n\r\n\r\n        return true;\r\n    }\r\n\r\n    createAttendeeEl (id, attendee) {\r\n\r\n        let spanEl = document.createElement('span');\r\n\r\n        spanEl.innerHTML = attendee;\r\n        spanEl.addEventListener('click', () => {\r\n\r\n            // Remove from dom\r\n            this.DOMElement.querySelector('.attendees').removeChild(spanEl);\r\n\r\n            // Get the elements index in the attendee list\r\n            let targetIndex = \r\n                this.attendees.indexOf(this.attendees.find(attendee => attendee.id === id));\r\n\r\n            // Remove from list\r\n            this.attendees.splice(targetIndex, 1);\r\n\r\n            if (!this.attendees.length) {\r\n\r\n                this.DOMElement.querySelector('.attendees').innerHTML += 'No attendees added.';\r\n    \r\n            }\r\n\r\n            return true;\r\n\r\n        });\r\n\r\n        return spanEl;\r\n\r\n    }\r\n\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Edit);\n\n//# sourceURL=webpack:///./app/js/components/edit.js?");

/***/ }),

/***/ "./app/js/components/home.js":
/*!***********************************!*\
  !*** ./app/js/components/home.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _controllers_activity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/activity */ \"./app/js/controllers/activity.js\");\n\r\n\r\nclass Home {\r\n\r\n    constructor() {\r\n\r\n        this.DOMElement = document.querySelector('section#home');\r\n        this.activities = [];\r\n\r\n        this.init();\r\n\r\n    }\r\n\r\n    async init () {\r\n\r\n        this.activities = await _controllers_activity__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getActivities();\r\n\r\n        for (let activity of this.activities) {\r\n\r\n            this.createActivityEl(activity);\r\n\r\n        }\r\n\r\n        let delay = 75;\r\n\r\n        for (let row of this.DOMElement.querySelectorAll('.row')) {\r\n            \r\n            setTimeout(() => row.classList.remove('out'), delay);\r\n            delay += 75;\r\n\r\n        }\r\n        \r\n    }\r\n\r\n    createActivityEl (data) {\r\n\r\n        let rowEl = document.createElement('div');\r\n        let attendeesEl = document.createElement('div');\r\n        let headerEl = document.createElement('div');\r\n        let containerEl = document.createElement('div');\r\n        let titleEl = document.createElement('h2');\r\n        let timeEl = document.createElement('span');\r\n        let attendEl = this.createAttendButton(rowEl);\r\n        let deleteEl = this.createDeleteButton(data._id, rowEl);\r\n\r\n        rowEl.className = 'row out';\r\n        containerEl.className = 'container';\r\n\r\n        titleEl.innerHTML = data.title;\r\n        timeEl.innerHTML = data.time;\r\n\r\n        headerEl.appendChild(titleEl);\r\n        headerEl.appendChild(timeEl);\r\n\r\n        // Wrap each attendee in a span and append to div\r\n        for (let attendee of data.attendees) {\r\n\r\n            let span = document.createElement('span');\r\n            span.innerHTML = attendee;\r\n            attendeesEl.appendChild(span);\r\n            \r\n        }\r\n\r\n        containerEl.appendChild(attendeesEl);\r\n        containerEl.appendChild(attendEl);\r\n        containerEl.appendChild(deleteEl);\r\n        rowEl.appendChild(headerEl);\r\n        rowEl.appendChild(containerEl);\r\n\r\n        rowEl.addEventListener('click', () => rowEl.classList.toggle('active'));\r\n\r\n        this.DOMElement.querySelector('.wrapper').appendChild(rowEl);\r\n        \r\n        return true;\r\n    }\r\n\r\n    createAttendButton (rowEl) {\r\n        let element = document.createElement('button');\r\n\r\n        element.className = 'button neutral';\r\n        element.innerHTML = 'Attend';\r\n\r\n        element.addEventListener('click', () => {\r\n\r\n            rowEl.classList.toggle('attending');\r\n\r\n            if(!rowEl.classList.contains('attending')) {\r\n                element.innerHTML = 'Attend';\r\n            } else {\r\n                element.innerHTML = 'Do Not Attend';\r\n            }\r\n\r\n        });\r\n\r\n        return element;\r\n    }\r\n\r\n    createDeleteButton (id, rowEl) {\r\n        let element = document.createElement('button');\r\n\r\n        element.className = 'button danger';\r\n        element.innerHTML = 'Delete';\r\n\r\n        element.addEventListener('click', () => {\r\n\r\n            this.DOMElement.querySelector('.wrapper').removeChild(rowEl);\r\n            _controllers_activity__WEBPACK_IMPORTED_MODULE_0__[\"default\"].deleteActivity(id);\r\n\r\n        });\r\n\r\n        return element;\r\n    }\r\n\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Home);\n\n//# sourceURL=webpack:///./app/js/components/home.js?");

/***/ }),

/***/ "./app/js/components/login.js":
/*!************************************!*\
  !*** ./app/js/components/login.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n//# sourceURL=webpack:///./app/js/components/login.js?");

/***/ }),

/***/ "./app/js/controllers/activity.js":
/*!****************************************!*\
  !*** ./app/js/controllers/activity.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass ActivityCtrl {\r\n\r\n    static async getActivities () {\r\n\r\n        try {\r\n\r\n            let response = await fetch('/api/activity');\r\n            let json = await response.json();\r\n\r\n            return json;\r\n\r\n        } catch (err) {\r\n\r\n            console.log(err);\r\n\r\n        }\r\n\r\n    }\r\n\r\n    static async createActivity (activity) {\r\n\r\n        try {\r\n\r\n            let response = await fetch('/api/activity', { \r\n                method: 'POST', \r\n                body: JSON.stringify(activity),\r\n                headers: { 'Content-Type': 'application/json' }\r\n            });\r\n\r\n        } catch(err) {\r\n\r\n            console.log(err);\r\n\r\n        }\r\n        \r\n    }\r\n\r\n    static async deleteActivity (id) {\r\n\r\n        try {\r\n\r\n            let response = fetch('/api/activity', { \r\n                method: 'DELETE',\r\n                body: JSON.stringify({ id }),\r\n                headers: { 'Content-Type': 'application/json' }\r\n            });\r\n\r\n        } catch(err) {\r\n\r\n            console.log(err);\r\n\r\n        }\r\n    }\r\n\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (ActivityCtrl);\n\n//# sourceURL=webpack:///./app/js/controllers/activity.js?");

/***/ }),

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_login__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/login */ \"./app/js/components/login.js\");\n/* harmony import */ var _components_login__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_login__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_home__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/home */ \"./app/js/components/home.js\");\n/* harmony import */ var _components_edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/edit */ \"./app/js/components/edit.js\");\n\r\n\r\n\r\n\r\nclass Page {\r\n\r\n    constructor (url, script = null) {\r\n        this.url = `app/views/${url}`;\r\n        this.script = script;\r\n    }\r\n\r\n    load () {\r\n        return fetch(this.url)\r\n            .then(response => response.text())\r\n            .then(data => this.html = data)\r\n            .catch(err => this.html = 'Something went wrong!');\r\n    }\r\n\r\n    loadScript (script) {\r\n        switch(script) {\r\n            case 'login':\r\n                new _components_login__WEBPACK_IMPORTED_MODULE_0___default.a();\r\n                break;\r\n            case 'home':\r\n                new _components_home__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n                break;\r\n            case 'edit':\r\n                new _components_edit__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\r\n                break;\r\n            default:\r\n                return false;\r\n        }\r\n    }\r\n\r\n    render (element) {\r\n        element.innerHTML = this.html;\r\n        // Be sure that we render the html before the script\r\n        setTimeout(() => this.loadScript(this.script), 0);\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Page);\n\n//# sourceURL=webpack:///./app/js/general/page.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _general_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./general/router */ \"./app/js/general/router.js\");\n/* harmony import */ var _general_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./general/layout */ \"./app/js/general/layout.js\");\n/* harmony import */ var _general_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./general/page */ \"./app/js/general/page.js\");\n\r\n\r\n\r\n\r\nnew _general_router__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\r\n        login: new _general_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('login.html'),\r\n        home: new _general_layout__WEBPACK_IMPORTED_MODULE_1__[\"default\"](new _general_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('menu.html'), new _general_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('home.html', 'home')),\r\n        edit: new _general_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('edit.html', 'edit'),\r\n        notFound: new _general_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('404.html'),\r\n        '#default': new _general_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('login.html'),\r\n    },\r\n    document.querySelector('main')\r\n);\n\n//# sourceURL=webpack:///./app/js/main.js?");

/***/ })

/******/ });