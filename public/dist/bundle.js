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

/***/ "./app/js/components/activity.js":
/*!***************************************!*\
  !*** ./app/js/components/activity.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _controllers_activity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/activity */ \"./app/js/controllers/activity.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ \"./app/js/utils.js\");\n\r\n\r\n\r\nclass Activity {\r\n\r\n    constructor () {\r\n\r\n        this.DOMElement = document.querySelector('section#activity');\r\n        // TODO: This needs to be cached. We have already fetched this data once.\r\n        this.activity = {};\r\n\r\n        this.init();\r\n    }\r\n\r\n    async init () {\r\n        let id = window.location.hash.substr(1);\r\n            id = id.split('/')[1];\r\n\r\n        this.activity = await _controllers_activity__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getActivity(id);\r\n        this.DOMElement.innerHTML = _utils__WEBPACK_IMPORTED_MODULE_1__[\"default\"].domWithData(this.DOMElement, this.activity);\r\n        _utils__WEBPACK_IMPORTED_MODULE_1__[\"default\"].animateIn(this.DOMElement.querySelectorAll('.out'));\r\n\r\n        return true;\r\n    }\r\n\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Activity);\n\n//# sourceURL=webpack:///./app/js/components/activity.js?");

/***/ }),

/***/ "./app/js/components/edit.js":
/*!***********************************!*\
  !*** ./app/js/components/edit.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _controllers_activity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/activity */ \"./app/js/controllers/activity.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ \"./app/js/utils.js\");\n// This class will both be used to add new and edit existing event.\r\n\r\n\r\n\r\nclass Edit {\r\n\r\n    constructor() {\r\n        this.DOMElement = document.querySelector('section#edit');\r\n\r\n        this.attendees = [];\r\n        // Used to give an id to the attendee elements\r\n        this.attendeeId = 1;\r\n\r\n        this.init();\r\n    }\r\n\r\n    init () {\r\n\r\n        this.addAttendee();\r\n\r\n        this.DOMElement.querySelector('button[type=\"submit\"]').addEventListener('click', event => {\r\n            event.preventDefault();\r\n            this.createEvent();\r\n        });\r\n\r\n        if (!this.attendees.length) {\r\n            this.DOMElement.querySelector('.attendees').innerHTML += 'No attendees added.';\r\n        }\r\n        \r\n        return true;\r\n    }\r\n\r\n    createEvent ()  {\r\n\r\n        let activityData = {\r\n            title: _utils__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getInputValue(this.DOMElement, 'title'),\r\n            information: _utils__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getInputValue(this.DOMElement, 'information'),\r\n            time: _utils__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getInputValue(this.DOMElement, 'time'),\r\n            attendees: this.attendees.map(attendee => attendee.name),\r\n        };\r\n\r\n        _controllers_activity__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createActivity(activityData);\r\n\r\n        return true;\r\n    }\r\n    \r\n\r\n    addAttendee () {\r\n\r\n        let buttonEl = this.DOMElement.querySelector('form button');\r\n        let newAttendeeEl = this.DOMElement.querySelector('input[name=\"attendee\"]');\r\n        let attendeesEl = this.DOMElement.querySelector('.attendees');\r\n\r\n        buttonEl.addEventListener('click', event => {\r\n\r\n            event.preventDefault();\r\n\r\n            if (!this.attendees.length) {\r\n                // Remove pre-default text.\r\n                this.DOMElement.querySelector('.attendees').innerHTML = '<h1>Attendees</h1>';\r\n            }\r\n\r\n            this.attendees.push({id: this.attendeeId, name: newAttendeeEl.value});\r\n            attendeesEl.appendChild(this.createAttendeeEl(this.attendeeId, newAttendeeEl.value));\r\n            this.attendeeId++;\r\n            \r\n            newAttendeeEl.value = '';\r\n        });\r\n\r\n\r\n        return true;\r\n    }\r\n\r\n    createAttendeeEl (id, attendee) {\r\n\r\n        let spanEl = document.createElement('span');\r\n            spanEl.innerHTML = attendee;\r\n\r\n        spanEl.addEventListener('click', () => {\r\n\r\n            // Remove from dom\r\n            this.DOMElement.querySelector('.attendees').removeChild(spanEl);\r\n            // Get the elements index in the attendee list\r\n            let targetIndex = \r\n                this.attendees.indexOf(this.attendees.find(attendee => attendee.id === id));\r\n            // Remove from list\r\n            this.attendees.splice(targetIndex, 1);\r\n\r\n            if (!this.attendees.length) {\r\n                this.DOMElement.querySelector('.attendees').innerHTML += 'No attendees added.';\r\n            }\r\n\r\n            return true;\r\n        });\r\n\r\n        return spanEl;\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Edit);\n\n//# sourceURL=webpack:///./app/js/components/edit.js?");

/***/ }),

/***/ "./app/js/components/home.js":
/*!***********************************!*\
  !*** ./app/js/components/home.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _controllers_activity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/activity */ \"./app/js/controllers/activity.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ \"./app/js/utils.js\");\n\r\n\r\n\r\nclass Home {\r\n\r\n    constructor() {\r\n\r\n        this.DOMElement = document.querySelector('section#home');\r\n        this.activities = [];\r\n\r\n        this.init();\r\n    }\r\n\r\n    async init () {\r\n\r\n        this.activities = await _controllers_activity__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getActivities();\r\n\r\n        // Get the activites from the server and put them on the dom.\r\n        for (let activity of this.activities) {\r\n            this.createActivityEl(activity);\r\n        }\r\n\r\n        // Animate in.\r\n        _utils__WEBPACK_IMPORTED_MODULE_1__[\"default\"].animateIn(this.DOMElement.querySelectorAll('.out'));\r\n    }\r\n\r\n    createActivityEl (data) {\r\n\r\n        // The dom tree for the activity element.\r\n        let htmlString = `\r\n            <div class=\"top\">\r\n                <h2>${data.title}</h2>\r\n                <span>${data.time}</span>\r\n            </div>\r\n            <div class=\"container\">\r\n                <div>\r\n                    ${data.attendees.length ? \r\n                        data.attendees.map(attendee => `<span>${attendee.name}</span>`) : \r\n                        'No attendees at the moment.'\r\n                    }\r\n                </div>\r\n                <button class=\"button success\">Attend</button>\r\n                <button class=\"button danger\">Delete</button>\r\n                <div><a href=\"#activity/${data._id}\">Info</div>\r\n            </div>\r\n        `;\r\n\r\n        // Row element (most parent of the activity element).\r\n        let rowEl = document.createElement('div');\r\n            rowEl.className = 'row out';\r\n            rowEl.innerHTML = htmlString;\r\n\r\n        rowEl.querySelector('.top')\r\n             .addEventListener('click', () => rowEl.classList.toggle('active'));\r\n        rowEl.querySelector('button.success')\r\n             .addEventListener('click', () => this.onAttend(data._id, rowEl));\r\n        rowEl.querySelector('button.danger')\r\n             .addEventListener('click', () => this.onDelete(data._id, rowEl));\r\n\r\n        this.DOMElement.querySelector('.wrapper').appendChild(rowEl);\r\n        \r\n        return true;\r\n    }\r\n\r\n    async onAttend (id, rowEl) {\r\n\r\n        // Dummy obj.\r\n        const user = {id: 999, name: 'Dummyname'};\r\n        let attendeesEl = this.DOMElement.querySelector('.container div')\r\n\r\n        try {\r\n\r\n            if(!rowEl.classList.contains('attending')) {\r\n                await _controllers_activity__WEBPACK_IMPORTED_MODULE_0__[\"default\"].attendActivity(user, id);\r\n                // TODO: It's the user that should be added to the attendee list.\r\n                attendeesEl.innerHTML += `, ${user.name}`\r\n            } else {\r\n                await _controllers_activity__WEBPACK_IMPORTED_MODULE_0__[\"default\"].declineActivity(user, id);\r\n                // TODO: Remove the attendee from the DOM.\r\n            }\r\n\r\n        } catch (err) {\r\n            console.log(err);\r\n        }\r\n\r\n        rowEl.classList.toggle('attending');\r\n\r\n        return true;\r\n    }\r\n\r\n    onDelete (id, rowEl) {\r\n\r\n        try {\r\n            _controllers_activity__WEBPACK_IMPORTED_MODULE_0__[\"default\"].deleteActivity(id);\r\n            // Remove from the dom. No need to await server when in try/catch.\r\n            this.DOMElement.querySelector('.wrapper').removeChild(rowEl);\r\n        } catch (err) {\r\n            console.log(err);\r\n        }\r\n\r\n        return true;\r\n    }\r\n\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Home);\n\n//# sourceURL=webpack:///./app/js/components/home.js?");

/***/ }),

/***/ "./app/js/components/login.js":
/*!************************************!*\
  !*** ./app/js/components/login.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _controllers_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/auth */ \"./app/js/controllers/auth.js\");\n\r\n\r\nclass Login {\r\n\r\n    constructor() {\r\n\r\n        this.DOMElement = document.querySelector('section#login');\r\n\r\n        this.loginElements = this.DOMElement.querySelectorAll('[data-type=\"login\"]');\r\n        this.registerElements = this.DOMElement.querySelectorAll('[data-type=\"register\"]');\r\n\r\n        this.init();\r\n\r\n    }\r\n\r\n    init() {\r\n\r\n        let changeAuthTypeEl = this.DOMElement.querySelectorAll('a[data-type]');\r\n\r\n        this.DOMElement.querySelector('button[data-type=\"login\"]').addEventListener('click', () => {\r\n            this.onLogin();\r\n        });\r\n\r\n        this.DOMElement.querySelector('button[data-type=\"register\"]').addEventListener('click', () => {\r\n            this.onRegister();\r\n        });\r\n\r\n        // Change to Register inputs\r\n        changeAuthTypeEl[0].addEventListener('click', () => { \r\n            this.changeAuthType(this.registerElements, this.loginElements);\r\n        });\r\n\r\n        // CHange to Login inputs\r\n        changeAuthTypeEl[1].addEventListener('click', () => { \r\n            this.changeAuthType(this.loginElements, this.registerElements);\r\n        });\r\n\r\n        return true;\r\n    }\r\n\r\n    onLogin () {\r\n        let userData = {\r\n            email: this.DOMElement.querySelector('input[name=\"email\"]').value,\r\n            password: this.DOMElement.querySelector('input[name=\"password\"]').value,\r\n        }\r\n\r\n        _controllers_auth__WEBPACK_IMPORTED_MODULE_0__[\"default\"].login(userData);\r\n\r\n        return true;\r\n    }\r\n\r\n    onRegister () {\r\n        let userData = {\r\n            email: this.DOMElement.querySelector('input[name=\"email\"]').value,\r\n            password: this.DOMElement.querySelector('input[name=\"password\"]').value,\r\n            retype_password: this.DOMElement.querySelector('input[name=\"retype_password\"]').value,\r\n        }\r\n\r\n        _controllers_auth__WEBPACK_IMPORTED_MODULE_0__[\"default\"].register(userData);\r\n\r\n        return true;\r\n    }\r\n\r\n    changeAuthType (activeAlements, inactiveElements) {\r\n        for(let element of activeAlements) {\r\n            element.classList.remove('inactive');\r\n        }\r\n\r\n        for(let element of inactiveElements) {\r\n            element.classList.add('inactive');\r\n        }\r\n\r\n        return true;\r\n    }\r\n\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Login);\n\n//# sourceURL=webpack:///./app/js/components/login.js?");

/***/ }),

/***/ "./app/js/components/profile.js":
/*!**************************************!*\
  !*** ./app/js/components/profile.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Profile {\r\n\r\n    constructor () {\r\n\r\n        this.DOMElement = document.querySelector('section#profile');\r\n\r\n    }\r\n\r\n    init () {\r\n\r\n    }\r\n\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Profile);\n\n//# sourceURL=webpack:///./app/js/components/profile.js?");

/***/ }),

/***/ "./app/js/controllers/activity.js":
/*!****************************************!*\
  !*** ./app/js/controllers/activity.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass ActivityCtrl {\r\n\r\n    static async getActivity (id) {\r\n\r\n        try {\r\n\r\n            let response = await fetch(`/api/activity/${id}`);\r\n            let json = await response.json();\r\n\r\n            return json;\r\n\r\n        } catch (err) {\r\n\r\n            console.log(err);\r\n\r\n        }\r\n\r\n    }\r\n\r\n    static async getActivities () {\r\n\r\n        try {\r\n\r\n            let response = await fetch('/api/activites');\r\n            let json = await response.json();\r\n\r\n            return json;\r\n\r\n        } catch (err) {\r\n\r\n            console.log(err);\r\n\r\n        }\r\n\r\n    }\r\n\r\n    static async createActivity (activity) {\r\n\r\n        try {\r\n\r\n            let response = await fetch('/api/activity', { \r\n                method: 'POST', \r\n                body: JSON.stringify(activity),\r\n                headers: { 'Content-Type': 'application/json' }\r\n            });\r\n\r\n        } catch(err) {\r\n\r\n            console.log(err);\r\n\r\n        }\r\n        \r\n    }\r\n\r\n    static async deleteActivity (id) {\r\n\r\n        try {\r\n\r\n            let response = fetch('/api/activity', { \r\n                method: 'DELETE',\r\n                body: JSON.stringify({ id }),\r\n                headers: { 'Content-Type': 'application/json' }\r\n            });\r\n\r\n        } catch(err) {\r\n\r\n            console.log(err);\r\n\r\n        }\r\n    }\r\n\r\n    static async attendActivity (attendee, activityId) {\r\n\r\n        try {\r\n\r\n            let response = await fetch(`/api/activity/attend/${activityId}`, { \r\n                method: 'POST', \r\n                body: JSON.stringify(attendee),\r\n                headers: { 'Content-Type': 'application/json' }\r\n            });\r\n\r\n        } catch (err) {\r\n\r\n            console.log(err);\r\n\r\n        }\r\n\r\n    }\r\n\r\n    static async declineActivity (attendee, activityId) {\r\n\r\n        try {\r\n\r\n            let response = await fetch(`/api/activity/decline/${activityId}`, { \r\n                method: 'POST', \r\n                body: JSON.stringify(attendee),\r\n                headers: { 'Content-Type': 'application/json' }\r\n            });\r\n\r\n        } catch (err) {\r\n\r\n            console.log(err);\r\n\r\n        }\r\n\r\n    }\r\n\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (ActivityCtrl);\n\n//# sourceURL=webpack:///./app/js/controllers/activity.js?");

/***/ }),

/***/ "./app/js/controllers/auth.js":
/*!************************************!*\
  !*** ./app/js/controllers/auth.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass AuthCtrl {\r\n\r\n    static async getUser () {\r\n\r\n        try {\r\n\r\n            let response = await fetch('/auth/user');\r\n            let json = await response.json();\r\n\r\n            return json;\r\n\r\n        } catch (err) {\r\n\r\n            console.log(err);\r\n\r\n        }\r\n\r\n    }\r\n\r\n    static async login (user) {\r\n\r\n        try {\r\n\r\n            let response = await fetch('/auth/login', { \r\n                method: 'POST', \r\n                body: JSON.stringify(user),\r\n                headers: { 'Content-Type': 'application/json' }\r\n            });\r\n\r\n            if(response.status === 200) {\r\n                window.location.href = 'http://localhost:3000/#home';\r\n            }\r\n\r\n        } catch(err) {\r\n\r\n            console.log(err);\r\n\r\n        }\r\n        \r\n    }\r\n\r\n    static async register (user) {\r\n\r\n        try {\r\n\r\n            let response = fetch('/auth/register', { \r\n                method: 'POST',\r\n                body: JSON.stringify(user),\r\n                headers: { 'Content-Type': 'application/json' }\r\n            });\r\n\r\n            if(response.status === 200) {\r\n                window.location.href = 'http://localhost:3000/#home';\r\n            }\r\n\r\n        } catch(err) {\r\n\r\n            console.log(err);\r\n\r\n        }\r\n    }\r\n\r\n    static async delete (id) {\r\n\r\n        try {\r\n\r\n            let response = fetch('/auth/user', { \r\n                method: 'DELETE',\r\n                body: JSON.stringify({ id }),\r\n                headers: { 'Content-Type': 'application/json' }\r\n            });\r\n\r\n        } catch(err) {\r\n\r\n            console.log(err);\r\n\r\n        }\r\n    }\r\n\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (AuthCtrl);\n\n//# sourceURL=webpack:///./app/js/controllers/auth.js?");

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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_login__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/login */ \"./app/js/components/login.js\");\n/* harmony import */ var _components_home__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/home */ \"./app/js/components/home.js\");\n/* harmony import */ var _components_edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/edit */ \"./app/js/components/edit.js\");\n/* harmony import */ var _components_profile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/profile */ \"./app/js/components/profile.js\");\n/* harmony import */ var _components_activity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/activity */ \"./app/js/components/activity.js\");\n\r\n\r\n\r\n\r\n\r\n\r\nclass Page {\r\n\r\n    constructor (url, script = null) {\r\n        this.url = `app/views/${url}`;\r\n        this.script = script;\r\n    }\r\n\r\n    load () {\r\n        return fetch(this.url)\r\n            .then(response => response.text())\r\n            .then(data => this.html = data)\r\n            .catch(err => this.html = 'Something went wrong!');\r\n    }\r\n\r\n    loadScript (script) {\r\n        switch(script) {\r\n            case 'login':\r\n                new _components_login__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n                break;\r\n            case 'home':\r\n                new _components_home__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n                break;\r\n            case 'edit':\r\n                new _components_edit__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\r\n                break;\r\n            case 'profile':\r\n                new _components_profile__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\r\n                break;\r\n            case 'activity':\r\n                new _components_activity__WEBPACK_IMPORTED_MODULE_4__[\"default\"]();\r\n                break;\r\n            default:\r\n                return false;\r\n        }\r\n    }\r\n\r\n    render (element) {\r\n        element.innerHTML = this.html;\r\n        // Be sure that we render the html before the script\r\n        setTimeout(() => this.loadScript(this.script), 0);\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Page);\n\n//# sourceURL=webpack:///./app/js/general/page.js?");

/***/ }),

/***/ "./app/js/general/router.js":
/*!**********************************!*\
  !*** ./app/js/general/router.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Router {\r\n\r\n    constructor(routes, element) {\r\n        this.routes = routes;\r\n        this.element = element;\r\n\r\n        window.onhashchange = this.hashChanged.bind(this);\r\n        this.hashChanged();\r\n    }\r\n\r\n    async hashChanged (event) {\r\n        if (window.location.hash.length) {\r\n\r\n            // Get the new page and render it.\r\n            let pageName = window.location.hash.substr(1);\r\n\r\n            // If the url contains a parameter, remove it from pageName.\r\n            if(pageName.indexOf('/') !== -1) {\r\n                pageName = pageName.split('/')[0];\r\n            }\r\n\r\n            this.render(pageName);\r\n        } else {\r\n            // If no path - render default\r\n            this.render('#default');\r\n        }\r\n    }\r\n\r\n    async render (pageName) {\r\n        let page = this.routes[pageName];\r\n        \r\n        if(!page)\r\n            page = this.routes['notFound'];\r\n\r\n        await page.load();\r\n        this.element.innerHTML = '';\r\n        page.render(this.element);\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Router);\n\n//# sourceURL=webpack:///./app/js/general/router.js?");

/***/ }),

/***/ "./app/js/main.js":
/*!************************!*\
  !*** ./app/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _general_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./general/router */ \"./app/js/general/router.js\");\n/* harmony import */ var _general_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./general/layout */ \"./app/js/general/layout.js\");\n/* harmony import */ var _general_page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./general/page */ \"./app/js/general/page.js\");\n\r\n\r\n\r\n\r\nnew _general_router__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({\r\n        login: new _general_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('login.html', 'login'),\r\n        home: new _general_layout__WEBPACK_IMPORTED_MODULE_1__[\"default\"](new _general_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('menu.html'), new _general_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('home.html', 'home')),\r\n        edit: new _general_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('edit.html', 'edit'),\r\n        profile: new _general_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('profile.html', 'profile'),\r\n        activity: new _general_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('activity.html', 'activity'),\r\n        notFound: new _general_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('404.html'),\r\n        '#default': new _general_page__WEBPACK_IMPORTED_MODULE_2__[\"default\"]('login.html', 'login'),\r\n    },\r\n    document.querySelector('main')\r\n);\n\n//# sourceURL=webpack:///./app/js/main.js?");

/***/ }),

/***/ "./app/js/utils.js":
/*!*************************!*\
  !*** ./app/js/utils.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Utils {\r\n\r\n    static domWithData (DOMElement, data) {\r\n\r\n        // Get the DOM as a tring.\r\n        let html = DOMElement.innerHTML;\r\n        // Regex rule.\r\n        let regExp = /\\{{([^}}]+)/g;\r\n        // Get all values surrounded by {{ }}.\r\n        let matches = html.match(regExp);\r\n\r\n        for(let match of matches) {\r\n            // Get the property. {{ data.test }} -> test\r\n            let prop = match.split('.')[1].trim();\r\n            if (data[prop]) {\r\n                // Add back the }} to be able to match in the html.\r\n                match = match + '}}';\r\n                // Replace the match with the correct propert from data.\r\n                html = html.replace(match, data[prop]);\r\n            } else {\r\n                html = html.replace(match, '');\r\n            }\r\n        }\r\n\r\n        return html;\r\n    }\r\n\r\n    static animateIn (elements) {\r\n        let delay = 75;\r\n\r\n        for (let element of elements) {\r\n            setTimeout(() => element.classList.remove('out'), delay);\r\n            delay += 75;\r\n        }\r\n\r\n        return true;\r\n    }\r\n\r\n    static getInputValue (DOMElement, name) {\r\n        return DOMElement.querySelector(`input[name=\"${name}\"]`).value;\r\n    }\r\n\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Utils);\n\n//# sourceURL=webpack:///./app/js/utils.js?");

/***/ })

/******/ });