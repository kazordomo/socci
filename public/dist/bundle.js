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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _controllers_activity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/activity */ \"./app/js/controllers/activity.js\");\n/* harmony import */ var _controllers_social__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/social */ \"./app/js/controllers/social.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ \"./app/js/utils.js\");\n/* harmony import */ var _renderData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../renderData */ \"./app/js/renderData.js\");\n\r\n\r\n\r\n\r\n\r\nclass Activity {\r\n\r\n    constructor () {\r\n        this.DOMElement = document.querySelector('section#activity');\r\n        // TODO: This needs to be cached. We have already fetched this data once.\r\n        this.activity = {};\r\n        this.user = _utils__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getLocal();\r\n        this.declineButton = null;\r\n        this.commentButton = null;\r\n        this.init();\r\n    }\r\n\r\n    async init () {\r\n        const user = _utils__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getLocal();\r\n        const id = _utils__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getIdFromUrl();\r\n\r\n        this.activity = await _controllers_activity__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getActivity(id);\r\n        new _renderData__WEBPACK_IMPORTED_MODULE_3__[\"default\"](this.DOMElement, this.activity);\r\n        // Because the dom is rerendered, putting this in the constructor would get lost.\r\n        this.declineButton = this.DOMElement.querySelector('.button.danger');\r\n        this.commentButton = this.DOMElement.querySelector('.button.success');\r\n\r\n        let isUserAttending = !!this.activity.attendees\r\n                .find(attendee => attendee._id === user._id);\r\n\r\n        if (isUserAttending) {\r\n            this.declineButton.addEventListener('click', this.declineActivity.bind(this));\r\n        } else {\r\n            this.declineButton.style.display = 'none';\r\n        }\r\n\r\n        this.commentButton.addEventListener('click', this.postComment.bind(this, id));\r\n        this.DOMElement.addEventListener('keyup', event => {\r\n            if (event.keyCode === 13) {\r\n                this.commentButton.click();\r\n            }\r\n        });\r\n\r\n        this.attendeesOnClick();\r\n    }\r\n\r\n    attendeesOnClick () {\r\n        for(let attendee of this.DOMElement.querySelectorAll('.attendee')) {\r\n            let icon = attendee.querySelector('i');\r\n            let friendId = attendee.getAttribute('data-id');\r\n            let isAlreadyFriends = this.user.friends.find(id => id === friendId);\r\n\r\n            if (friendId === this.user._id || isAlreadyFriends) {\r\n                icon.remove();\r\n            } else {\r\n                icon.addEventListener('click', () => {\r\n                    this.addFriend(friendId, icon);\r\n                });\r\n            }\r\n        }\r\n    }\r\n    \r\n    async addFriend (id, icon) {\r\n        let result = await _controllers_social__WEBPACK_IMPORTED_MODULE_1__[\"default\"].add(id);\r\n        // TODO: result.succes: false or true\r\n        if (result.id) {\r\n            this.user.friends.push(result.id);\r\n            _utils__WEBPACK_IMPORTED_MODULE_2__[\"default\"].storeLocal(this.user);\r\n            icon.remove();\r\n        } else {\r\n            console.log(result.message);\r\n        }\r\n    }\r\n\r\n    async postComment (activityId) {\r\n        let comment = await _controllers_activity__WEBPACK_IMPORTED_MODULE_0__[\"default\"].postComment(_utils__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getInputValue(this.DOMElement, 'comment'), activityId);        \r\n        if (comment) {\r\n            this.DOMElement.querySelector('.comments').innerHTML += `${comment.comment} - ${comment.user}`;\r\n        }\r\n        this.DOMElement.querySelector('input[name=\"comment\"').value = '';\r\n    }\r\n\r\n    async deleteComment (commentId, activityId) {\r\n        let response = await _controllers_activity__WEBPACK_IMPORTED_MODULE_0__[\"default\"].deleteComment(commentId, activityId);\r\n        // TODO: remove from dom\r\n        console.log(response);\r\n    }\r\n\r\n    async declineActivity () {\r\n        let response = await _controllers_activity__WEBPACK_IMPORTED_MODULE_0__[\"default\"].declineActivity(this.activity._id);\r\n        if (response.status !== 200) {\r\n            return console.log('error');\r\n        }\r\n        this.declineButton.style.display = 'none';\r\n    }\r\n\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Activity);\n\n//# sourceURL=webpack:///./app/js/components/activity.js?");

/***/ }),

/***/ "./app/js/components/edit.js":
/*!***********************************!*\
  !*** ./app/js/components/edit.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _controllers_activity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/activity */ \"./app/js/controllers/activity.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ \"./app/js/utils.js\");\n// This class will both be used to add new and edit existing event.\r\n\r\n\r\n\r\nclass Edit {\r\n\r\n    constructor() {\r\n        this.DOMElement = document.querySelector('section#edit');\r\n        this.attendees = [];\r\n        this.attendeeId = 1;\r\n        this.init();\r\n    }\r\n\r\n    init () {\r\n        // this.addAttendee();\r\n        this.DOMElement.querySelector('form button').addEventListener('click', event => {\r\n            event.preventDefault();\r\n            this.addAttendee();\r\n\r\n        });\r\n        this.DOMElement.querySelector('button[type=\"submit\"]').addEventListener('click', event => {\r\n            event.preventDefault();\r\n            this.createEvent();\r\n        });\r\n\r\n        if (!this.attendees.length) {\r\n            this.DOMElement.querySelector('.attendees').innerHTML += 'No attendees added.';\r\n        }\r\n    }\r\n\r\n    async createEvent ()  {\r\n        let activityData = {\r\n            title: _utils__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getInputValue(this.DOMElement, 'title'),\r\n            information: _utils__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getInputValue(this.DOMElement, 'information'),\r\n            time: _utils__WEBPACK_IMPORTED_MODULE_1__[\"default\"].getInputValue(this.DOMElement, 'time'),\r\n            attendees: this.attendees.map(attendee => attendee.name),\r\n        };\r\n        await _controllers_activity__WEBPACK_IMPORTED_MODULE_0__[\"default\"].createActivity(activityData);\r\n        window.location.href = '#home';\r\n    }\r\n    \r\n\r\n    addAttendee () {\r\n        let newAttendeeEl = this.DOMElement.querySelector('input[name=\"attendee\"]');\r\n        let attendeesEl = this.DOMElement.querySelector('.attendees');\r\n\r\n        if (!newAttendeeEl.value) return;\r\n        if (!this.attendees.length) {\r\n            // Remove pre-default text.\r\n            this.DOMElement.querySelector('.attendees').innerHTML = '<h2>Attendees</h2>';\r\n        }\r\n\r\n        this.attendees.push({id: this.attendeeId, name: newAttendeeEl.value});\r\n        attendeesEl.appendChild(this.createAttendeeEl(this.attendeeId, newAttendeeEl.value));\r\n        this.attendeeId++;\r\n        newAttendeeEl.value = '';\r\n    }\r\n\r\n    removeAttende (id, element) {\r\n        // Remove from dom\r\n        this.DOMElement.querySelector('.attendees').removeChild(element);\r\n        // Get the elements index in the attendee list\r\n        let targetIndex = \r\n            this.attendees.indexOf(this.attendees.find(attendee => attendee.id === id));\r\n        // Remove from list\r\n        this.attendees.splice(targetIndex, 1);\r\n        if (!this.attendees.length) {\r\n            this.DOMElement.querySelector('.attendees').innerHTML += 'No attendees added.';\r\n        }\r\n    }\r\n\r\n    createAttendeeEl (id, attendee) {\r\n        let spanEl = document.createElement('span');\r\n            spanEl.innerHTML = attendee;\r\n            spanEl.addEventListener('click', () => this.removeAttende(id, spanEl));\r\n        return spanEl;\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Edit);\n\n//# sourceURL=webpack:///./app/js/components/edit.js?");

/***/ }),

/***/ "./app/js/components/home.js":
/*!***********************************!*\
  !*** ./app/js/components/home.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _controllers_activity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/activity */ \"./app/js/controllers/activity.js\");\n/* harmony import */ var _general_slider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../general/slider */ \"./app/js/general/slider.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ \"./app/js/utils.js\");\n/* harmony import */ var _renderData__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../renderData */ \"./app/js/renderData.js\");\n\r\n\r\n\r\n\r\n\r\nclass Home {\r\n\r\n    constructor() {\r\n        this.DOMElement = document.querySelector('section#home');\r\n        this.activities = [];\r\n        this.NO_ATTENDEES_ELEMENT = '<span class=\"no-attendees\">No attendees yet.</span>';\r\n        this.user = _utils__WEBPACK_IMPORTED_MODULE_2__[\"default\"].getLocal();\r\n        this.init();\r\n    }\r\n\r\n    async init () {\r\n        this.activities = await _controllers_activity__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getActivities();\r\n        new _renderData__WEBPACK_IMPORTED_MODULE_3__[\"default\"](this.DOMElement, this.activities);\r\n        new _general_slider__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.activities, this.DOMElement);\r\n\r\n        if (!this.activities.length) {\r\n            this.DOMElement.querySelector('.wrapper').innerHTML = 'No activites at the moment!';\r\n        }\r\n\r\n        // When the dom is render we can connect the buttons with functions.\r\n        this.eventListenerInit();\r\n\r\n        _utils__WEBPACK_IMPORTED_MODULE_2__[\"default\"].animateIn(this.DOMElement.querySelectorAll('.out'));\r\n\r\n    }\r\n\r\n    eventListenerInit () {\r\n        for (let sliderItem of this.DOMElement.querySelectorAll('.item_outer')) {\r\n            const dataId = sliderItem.getAttribute('data-id');\r\n\r\n            let isUserAttending = !!this.activities\r\n                .find(activity => activity._id === dataId).attendees\r\n                .find(attendee => attendee._id === this.user._id);\r\n\r\n                sliderItem\r\n                .querySelector('button.neutral')\r\n                .addEventListener('click', () => window.location.href = `#activity/${dataId}`);\r\n\r\n            this.updateAttendeeButton(isUserAttending, sliderItem);\r\n        }\r\n    }\r\n\r\n    async onAttend (id, sliderItem) {\r\n        const { user } = await _controllers_activity__WEBPACK_IMPORTED_MODULE_0__[\"default\"].attendActivity(id);\r\n        const isFirstAttendee = sliderItem.querySelector('.no-attendees');\r\n\r\n        // TODO: proper error handling...\r\n        if (user.message) {\r\n            return console.log(\"Already attending.\");\r\n        }\r\n        // Remove the text about \"no attendees\".\r\n        if (isFirstAttendee) {\r\n            sliderItem.querySelector('.no-attendees').remove();\r\n        }\r\n        // Add a comma and a space if not the first attendee\r\n        sliderItem.querySelector('.attendees').innerHTML += `${isFirstAttendee ? '' :', '}${user}`\r\n        this.updateAttendeeButton(true);\r\n\r\n        sliderItem.classList.toggle('attending');\r\n        return true;\r\n    }\r\n\r\n    onDelete (id, sliderItem) {\r\n        try {\r\n            _controllers_activity__WEBPACK_IMPORTED_MODULE_0__[\"default\"].deleteActivity(id);\r\n            // Remove from the dom. No need to await server when in try/catch.\r\n            this.DOMElement.querySelector('.wrapper').removeChild(sliderItem);\r\n        } catch (err) {\r\n            console.log(err);\r\n        }\r\n\r\n        return true;\r\n    }\r\n\r\n    updateAttendeeButton (isAttending, sliderItem) {\r\n        let button = sliderItem.querySelector('button.success');\r\n        \r\n        if (isAttending) {\r\n            button.classList.remove('active');\r\n            button.innerHTML = '<i class=\"fas fa-check\"></i>';\r\n        } else {\r\n            button.classList.add('active');\r\n            button.innerHTML = '<i class=\"fas fa-plus-circle\"></i>';\r\n            button.addEventListener('click', () => this.onAttend(dataId, sliderItem));\r\n        }\r\n    }\r\n\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Home);\n\n//# sourceURL=webpack:///./app/js/components/home.js?");

/***/ }),

/***/ "./app/js/components/login.js":
/*!************************************!*\
  !*** ./app/js/components/login.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _controllers_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/auth */ \"./app/js/controllers/auth.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ \"./app/js/utils.js\");\n\r\n\r\n\r\nclass Login {\r\n\r\n    constructor() {\r\n        this.DOMElement = document.querySelector('section#login');\r\n        this.loginElements = this.DOMElement.querySelectorAll('[data-type=\"login\"]');\r\n        this.registerElements = this.DOMElement.querySelectorAll('[data-type=\"register\"]');\r\n        \r\n        this.init();\r\n    }\r\n\r\n    init() {\r\n\r\n        let changeAuthTypeEl = this.DOMElement.querySelectorAll('a[data-type]');\r\n\r\n        this.DOMElement.querySelector('button[data-type=\"login\"]').addEventListener('click', () => {\r\n            this.onLogin();\r\n        });\r\n        this.DOMElement.querySelector('button[data-type=\"register\"]').addEventListener('click', () => {\r\n            this.onRegister();\r\n        });\r\n        this.DOMElement.addEventListener('keyup', event => {\r\n            event.preventDefault();\r\n            if (event.keyCode === 13) {\r\n                this.DOMElement.querySelector('button:not(.inactive)').click();\r\n            }\r\n        })\r\n\r\n        // Change to Register inputs\r\n        changeAuthTypeEl[0].addEventListener('click', () => { \r\n            this.changeAuthType(this.registerElements, this.loginElements);\r\n        });\r\n        // CHange to Login inputs\r\n        changeAuthTypeEl[1].addEventListener('click', () => { \r\n            this.changeAuthType(this.loginElements, this.registerElements);\r\n        });\r\n        _utils__WEBPACK_IMPORTED_MODULE_1__[\"default\"].animateIn(this.DOMElement.querySelectorAll('.out'));\r\n\r\n        return true;\r\n    }\r\n\r\n    successAnimation (cb) {\r\n        let elements = [\r\n            this.DOMElement.querySelector('.col_b .corner'),\r\n            ...this.DOMElement.querySelectorAll('input'),\r\n            ...this.DOMElement.querySelectorAll('button'),\r\n            ...this.DOMElement.querySelectorAll('a')\r\n        ];\r\n\r\n        this.DOMElement.querySelector('.col_b').style.marginLeft = '-50%';\r\n\r\n        setTimeout(() => {\r\n             _utils__WEBPACK_IMPORTED_MODULE_1__[\"default\"].animateOut(elements);\r\n             setTimeout(() => cb(), elements.length * 75);\r\n        }, 300)\r\n        \r\n\r\n    }\r\n\r\n    onLogin () {\r\n        // TODO: proper error handling\r\n        let email = this.DOMElement.querySelector('input[name=\"email\"]').value;;\r\n        let password = this.DOMElement.querySelector('input[name=\"password\"]').value;\r\n\r\n        if(!email || !password) {\r\n            return;\r\n        }\r\n\r\n        let userData = {\r\n            email: this.DOMElement.querySelector('input[name=\"email\"]').value,\r\n            password: this.DOMElement.querySelector('input[name=\"password\"]').value,\r\n        }\r\n\r\n        this.successAnimation(() => _controllers_auth__WEBPACK_IMPORTED_MODULE_0__[\"default\"].login(userData));\r\n    }\r\n\r\n    onRegister () {\r\n        let nickname = this.DOMElement.querySelector('input[name=\"nickname\"').value;\r\n        let email = this.DOMElement.querySelector('input[name=\"email\"]').value;;\r\n        let password = this.DOMElement.querySelector('input[name=\"password\"]').value;\r\n        let retypePassword = this.DOMElement.querySelector('input[name=\"retype_password\"]').value;\r\n\r\n        if (!email || !password || !retypePassword) {\r\n            return;\r\n        }\r\n\r\n        let userData = {\r\n            nickname,\r\n            email,\r\n            password,\r\n            retypePassword\r\n        }\r\n\r\n        this.successAnimation(() => _controllers_auth__WEBPACK_IMPORTED_MODULE_0__[\"default\"].register(userData));\r\n        return true;\r\n    }\r\n\r\n    changeAuthType (activeAlements, inactiveElements) {\r\n        for(let element of activeAlements) {\r\n            element.classList.remove('inactive');\r\n        }\r\n        for(let element of inactiveElements) {\r\n            element.classList.add('inactive');\r\n        }\r\n        return true;\r\n    }\r\n\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Login);\n\n//# sourceURL=webpack:///./app/js/components/login.js?");

/***/ }),

/***/ "./app/js/components/profile.js":
/*!**************************************!*\
  !*** ./app/js/components/profile.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _controllers_social__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../controllers/social */ \"./app/js/controllers/social.js\");\n/* harmony import */ var _controllers_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../controllers/auth */ \"./app/js/controllers/auth.js\");\n/* harmony import */ var _renderData__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../renderData */ \"./app/js/renderData.js\");\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils */ \"./app/js/utils.js\");\n\r\n\r\n\r\n\r\n\r\nclass Profile {\r\n\r\n    constructor () {\r\n        this.DOMElement = document.querySelector('section#profile');\r\n        this.friends = [];\r\n        this.user = _utils__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getLocal();\r\n        this.init();\r\n    }\r\n\r\n    async init () {\r\n        this.friends = await _controllers_social__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getFriends();\r\n        this.DOMElement.querySelector('input[name=\"nickname\"]').defaultValue = this.user.nickname;\r\n        new _renderData__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.DOMElement, this.friends);\r\n        \r\n        let addButton = this.DOMElement.querySelector('.button.success');\r\n        let changeNameButton = this.DOMElement.querySelector('.button.neutral');\r\n        let logoutButton = this.DOMElement.querySelector('.button.yellow');\r\n        let deleteAccButton = this.DOMElement.querySelector('.button.danger');\r\n        let deleteFriendEls = this.DOMElement.querySelectorAll('.friends div');\r\n        addButton.addEventListener('click', this.onAddFriend.bind(this));\r\n        changeNameButton.addEventListener('click', this.onChangeNickname.bind(this));\r\n        logoutButton.addEventListener('click', _controllers_auth__WEBPACK_IMPORTED_MODULE_1__[\"default\"].logout.bind(this));\r\n        deleteAccButton.addEventListener('click', _controllers_auth__WEBPACK_IMPORTED_MODULE_1__[\"default\"].delete.bind(this));\r\n\r\n        for (let element of Array.from(deleteFriendEls)) {\r\n            let id = element.getAttribute('data-id');\r\n            let deleteIcon = element.querySelector('i');\r\n            deleteIcon.addEventListener('click', () => this.deleteFriend(id, element));\r\n        }\r\n    }\r\n\r\n    async onAddFriend () {\r\n        let friendsContainer = this.DOMElement.querySelector('.friends');\r\n        let addUserInput = this.DOMElement.querySelector('input[name=\"user\"]');\r\n        let addUser = await _controllers_social__WEBPACK_IMPORTED_MODULE_0__[\"default\"].add(addUserInput.value);\r\n\r\n        if (!addUser.email) {\r\n            friendsContainer.innerHTML += addUser.message;\r\n            return;\r\n        }\r\n        \r\n        friendsContainer.innerHTML += `<div>${addUser.email}</div>`;\r\n    }\r\n\r\n    onChangeNickname (event) {\r\n        event.preventDefault();\r\n        let newName = _utils__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getInputValue(this.DOMElement, 'nickname');\r\n        _controllers_social__WEBPACK_IMPORTED_MODULE_0__[\"default\"].nickname(newName);\r\n    }\r\n\r\n    async deleteFriend (id, element) {\r\n        await _controllers_social__WEBPACK_IMPORTED_MODULE_0__[\"default\"].deleteFriend(id);\r\n        this.user.friends.splice(this.user.friends.indexOf(id), 1);\r\n        _utils__WEBPACK_IMPORTED_MODULE_3__[\"default\"].storeLocal(this.user);\r\n        element.remove();\r\n    }\r\n\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Profile);\n\n//# sourceURL=webpack:///./app/js/components/profile.js?");

/***/ }),

/***/ "./app/js/controllers/activity.js":
/*!****************************************!*\
  !*** ./app/js/controllers/activity.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./app/js/utils.js\");\n\r\n\r\nclass ActivityCtrl {\r\n\r\n    static async getActivity (id) {\r\n        try {\r\n            let response = await fetch(`/api/activity/${id}`);\r\n            let json = await response.json();\r\n\r\n            return json;\r\n\r\n        } catch (err) {\r\n            console.log(err);\r\n        }\r\n    }\r\n\r\n    static async getActivities () {\r\n        try {\r\n            let response = await fetch('/api/activites');\r\n            let json = await response.json();\r\n\r\n            return json;\r\n        } catch (err) {\r\n            console.log(err);\r\n        }\r\n    }\r\n\r\n    static async createActivity (activity) {\r\n        try {\r\n            let response = await fetch('/api/activity', { \r\n                method: 'POST', \r\n                body: JSON.stringify(activity),\r\n                headers: { 'Content-Type': 'application/json' }\r\n            });\r\n        } catch(err) {\r\n            console.log(err);\r\n        }\r\n    }\r\n\r\n    static async deleteActivity (id) {\r\n        try {\r\n            let response = fetch('/api/activity', { \r\n                method: 'DELETE',\r\n                body: JSON.stringify({ id }),\r\n                headers: { 'Content-Type': 'application/json' }\r\n            });\r\n        } catch(err) {\r\n            console.log(err);\r\n        }\r\n    }\r\n\r\n    static async attendActivity (activityId) {\r\n        try {\r\n            let response = await fetch(`/api/activity/attend/${activityId}`, { \r\n                method: 'POST',\r\n                headers: { 'Content-Type': 'application/json' }\r\n            });\r\n            let json = await response.json();\r\n\r\n            return json;\r\n        } catch (err) {\r\n            console.log(err);\r\n        }\r\n    }\r\n\r\n    static async declineActivity (activityId) {\r\n        const user = _utils__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getLocal();\r\n        try {\r\n            let response = await fetch(`/api/activity/decline/${activityId}`, { \r\n                method: 'POST', \r\n                body: JSON.stringify({ userId: user._id }),\r\n                headers: { 'Content-Type': 'application/json' }\r\n            });\r\n            \r\n            return response;\r\n        } catch (err) {\r\n            console.log(err);\r\n        }\r\n    }\r\n\r\n    static async postComment (comment, activityId) {\r\n        try {\r\n            let response = await fetch(`/api/activity/comment/${activityId}`, { \r\n                method: 'POST', \r\n                body: JSON.stringify({id: activityId, comment}),\r\n                headers: { 'Content-Type': 'application/json' }\r\n            });\r\n            let json = await response.json();\r\n\r\n            return json;\r\n        } catch (err) {\r\n            console.log(err);\r\n        }\r\n    }\r\n\r\n    static async deleteComment (commentId, activityId) {\r\n        try {\r\n            let response = await fetch(`/api/activity/comment/${activityId}/${commentId}`, { \r\n                method: 'DELETE', \r\n                headers: { 'Content-Type': 'application/json' }\r\n            });\r\n            let json = await response.json();\r\n\r\n            return json;\r\n        } catch (err) {\r\n            console.log(err);\r\n        }\r\n    }\r\n\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (ActivityCtrl);\n\n//# sourceURL=webpack:///./app/js/controllers/activity.js?");

/***/ }),

/***/ "./app/js/controllers/auth.js":
/*!************************************!*\
  !*** ./app/js/controllers/auth.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ \"./app/js/utils.js\");\n\r\n\r\nclass AuthCtrl {\r\n\r\n    static async getUser () {\r\n        try {\r\n            let response = await fetch('/auth/user');\r\n            let json = await response.json();\r\n            return json;\r\n        } catch (err) {\r\n            console.log(err);\r\n        }\r\n    }\r\n\r\n    static async login (user) {\r\n        try {\r\n            let response = await fetch('/auth/login', { \r\n                method: 'POST', \r\n                body: JSON.stringify(user),\r\n                headers: { 'Content-Type': 'application/json' }\r\n            });\r\n            let json = await response.json();\r\n            if(response.status === 200) {\r\n                _utils__WEBPACK_IMPORTED_MODULE_0__[\"default\"].storeLocal(json);\r\n                window.location.href = 'http://localhost:3000/#home';\r\n            }\r\n        } catch(err) {\r\n            console.log(err);\r\n        }\r\n        \r\n    }\r\n\r\n    static async register (user) {\r\n        try {\r\n            let response = await fetch('/auth/register', { \r\n                method: 'POST',\r\n                body: JSON.stringify(user),\r\n                headers: { 'Content-Type': 'application/json' }\r\n            });\r\n            let json = await response.json();\r\n            if(response.status === 200) {\r\n                _utils__WEBPACK_IMPORTED_MODULE_0__[\"default\"].storeLocal(json);\r\n                window.location.href = 'http://localhost:3000/#home';\r\n            }\r\n\r\n        } catch(err) {\r\n            console.log(err);\r\n        }\r\n    }\r\n\r\n    static logout () {\r\n        try {\r\n            fetch('/auth/logout');\r\n            window.location.href = 'http://localhost:3000/';\r\n        } catch(err) {\r\n            console.log(err);\r\n        }\r\n    }\r\n\r\n    static async delete () {\r\n        try {\r\n            fetch('/auth/user', { \r\n                method: 'DELETE',\r\n                headers: { 'Content-Type': 'application/json' }\r\n            });\r\n        } catch(err) {\r\n            console.log(err);\r\n        }\r\n    }\r\n\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (AuthCtrl);\n\n//# sourceURL=webpack:///./app/js/controllers/auth.js?");

/***/ }),

/***/ "./app/js/controllers/social.js":
/*!**************************************!*\
  !*** ./app/js/controllers/social.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass SocialCtrl {\r\n\r\n    static async getFriends () {\r\n        let response = await fetch(`/api/social/friends`);\r\n        let json = await response.json();\r\n        return json;\r\n    }\r\n\r\n    static async deleteFriend (id) {\r\n        try {\r\n            let response = fetch('/api/social/delete', { \r\n                method: 'DELETE',\r\n                body: JSON.stringify({ id }),\r\n                headers: { 'Content-Type': 'application/json' }\r\n            });\r\n        } catch(err) {\r\n            console.log(err);\r\n        }\r\n    }\r\n\r\n    static async add (parameter) {\r\n        try {\r\n            let response = await fetch(`/api/social/add/${parameter}`);\r\n            let json = await response.json();\r\n            return json;\r\n        } catch (err) {\r\n            console.log(err);\r\n        }\r\n\r\n    }\r\n\r\n    static async nickname (newName) {\r\n        let response = await fetch('/api/social/nickname', { \r\n            method: 'POST', \r\n            body: JSON.stringify({ nickname: newName }),\r\n            headers: { 'Content-Type': 'application/json' }\r\n        });\r\n        let json = await response.json();\r\n    }\r\n\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (SocialCtrl);\n\n//# sourceURL=webpack:///./app/js/controllers/social.js?");

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

/***/ "./app/js/general/loader.js":
/*!**********************************!*\
  !*** ./app/js/general/loader.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// TODO: the loader should be baked in to the router and called BEFORE the initial html is rendered out.\r\n\r\nclass Loader {\r\n\r\n    static in () {\r\n        document.querySelector('loader').classList.add('active');\r\n    }\r\n\r\n    static out () {\r\n        document.querySelector('loader').classList.remove('active');\r\n    }\r\n\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Loader);\n\n//# sourceURL=webpack:///./app/js/general/loader.js?");

/***/ }),

/***/ "./app/js/general/page.js":
/*!********************************!*\
  !*** ./app/js/general/page.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_login__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/login */ \"./app/js/components/login.js\");\n/* harmony import */ var _components_home__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/home */ \"./app/js/components/home.js\");\n/* harmony import */ var _components_edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/edit */ \"./app/js/components/edit.js\");\n/* harmony import */ var _components_profile__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/profile */ \"./app/js/components/profile.js\");\n/* harmony import */ var _components_activity__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/activity */ \"./app/js/components/activity.js\");\n/* harmony import */ var _loader__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./loader */ \"./app/js/general/loader.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nclass Page {\r\n\r\n    constructor (url, script = null) {\r\n        this.url = `app/views/${url}`;\r\n        this.script = script;\r\n        this.interval = null;\r\n    }\r\n\r\n    load () {\r\n        return fetch(this.url)\r\n            .then(response => response.text())\r\n            .then(data => this.html = data)\r\n            .catch(err => this.html = 'Something went wrong!');\r\n    }\r\n\r\n    loadScript (script) {\r\n        switch(script) {\r\n            case 'login':\r\n                new _components_login__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\r\n                break;\r\n            case 'home':\r\n                new _components_home__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\r\n                break;\r\n            case 'edit':\r\n                new _components_edit__WEBPACK_IMPORTED_MODULE_2__[\"default\"]();\r\n                break;\r\n            case 'profile':\r\n                new _components_profile__WEBPACK_IMPORTED_MODULE_3__[\"default\"]();\r\n                break;\r\n            case 'activity':\r\n                new _components_activity__WEBPACK_IMPORTED_MODULE_4__[\"default\"]();\r\n                break;\r\n            default:\r\n                return false;\r\n        }\r\n    }\r\n\r\n    render (element) {\r\n        // If async element is present, we will start the loader. When the data is rdy, remove loader.\r\n        if (this.html.includes('<async></async>')) {\r\n            element.innerHTML = this.html;\r\n            _loader__WEBPACK_IMPORTED_MODULE_5__[\"default\"].in();\r\n            \r\n            this.interval = setInterval(() => {\r\n                if (element.querySelector('async')) return;\r\n                _loader__WEBPACK_IMPORTED_MODULE_5__[\"default\"].out();\r\n                // Reset interval when finished.\r\n                clearInterval(this.interval);\r\n                this.interval = null;\r\n            }, 100);\r\n        } else {\r\n            element.innerHTML = this.html;\r\n        }\r\n        \r\n        // Be sure that we render the html before the script\r\n        setTimeout(() => this.loadScript(this.script), 0);\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Page);\n\n//# sourceURL=webpack:///./app/js/general/page.js?");

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

/***/ "./app/js/general/slider.js":
/*!**********************************!*\
  !*** ./app/js/general/slider.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Slider {\r\n    constructor(data, DOMParent) {\r\n        this.DOMElement = document.querySelector('.slider');\r\n        this.DOMParent = DOMParent;\r\n        this.navigators = document.querySelector('.navigators');\r\n        this.itemsOuter = this.DOMElement.querySelectorAll('.item_outer');\r\n        this.data = data;\r\n        this.width = 0;\r\n        this.itemWidth = this.itemsOuter[0].offsetWidth;\r\n        this.position = 0;\r\n        this.activeItemIndex = 0;\r\n\r\n        this.init();\r\n    }\r\n\r\n    init () {\r\n        this.calcSliderWidth();\r\n        this.positionItems();\r\n        this.initNavigators();\r\n        this.initPreviewActivites();\r\n        this.hideOrShowNav();\r\n    }\r\n\r\n    // TODO: This needs to be run on window.resize\r\n    calcSliderWidth () {\r\n        for (let element of Array.from(this.itemsOuter)) {\r\n            this.width += element.offsetWidth;\r\n        }\r\n\r\n        this.DOMElement.style.width = `${this.width}px`;\r\n    }\r\n\r\n    moveSlider () {\r\n        this.DOMElement.setAttribute('style', \r\n            `width: ${this.width}px; \r\n            left: ${this.position}px;`\r\n        );\r\n\r\n        this.hideOrShowNav();\r\n    }\r\n\r\n    positionItems () {\r\n        for (let [i, element] of this.itemsOuter.entries()) {\r\n            element.setAttribute('style', `left: ${i * element.offsetWidth}px`);\r\n        }\r\n    }\r\n\r\n    initNavigators () {\r\n        let navNext = this.navigators.querySelector('.next');\r\n        let navPrev = this.navigators.querySelector('.prev');\r\n\r\n        navNext\r\n            .addEventListener('click', () => {\r\n                this.activeItemIndex++;\r\n                this.navigatorOnClick(true);\r\n            });\r\n\r\n        navPrev\r\n            .addEventListener('click', () => {\r\n                this.activeItemIndex--;\r\n                this.navigatorOnClick(false);\r\n            });\r\n    }\r\n\r\n    hideOrShowNav () {\r\n        let navNext = this.navigators.querySelector('.next');\r\n        let navPrev = this.navigators.querySelector('.prev');\r\n\r\n        if(this.navigators.querySelector('.inactive')) {\r\n            this.navigators.querySelector('.inactive').classList.remove('inactive');\r\n        }\r\n\r\n        if (this.activeItemIndex === 0) {\r\n            navPrev.classList.add('inactive');\r\n        } else if(this.activeItemIndex === this.itemsOuter.length - 1) {\r\n            navNext.classList.add('inactive');\r\n        }\r\n    }\r\n\r\n    navigatorOnClick (isNext) {\r\n        this.position += isNext ? -this.itemWidth : this.itemWidth;\r\n        this.moveSlider();\r\n        this.updateActivePreview();\r\n    }\r\n\r\n    getActiveItemId () {\r\n        return this.itemsOuter[this.activeItemIndex].getAttribute('data-id');\r\n    }\r\n\r\n    // TODO: Should not be here.\r\n    updateActivePreview () {\r\n        let activitiesEl = this.DOMParent.querySelector('.activities');\r\n        let currentActive = activitiesEl.querySelector('.activity.active');\r\n        let nextActive = Array.from(activitiesEl.querySelectorAll('.activity')).find(activity => {\r\n            return activity.getAttribute('data-id') == this.getActiveItemId();\r\n        });\r\n        currentActive.classList.remove('active');\r\n        nextActive.classList.add('active');\r\n    }\r\n\r\n    initPreviewActivites () {\r\n        for (let data of this.data) {\r\n            let element = this.createPreviewActivity(data);\r\n            this.DOMParent.querySelector('.activities').appendChild(element);\r\n        }\r\n\r\n        this.DOMParent.querySelector('.activities .activity').classList.add('active');\r\n    }\r\n\r\n    createPreviewActivity (data) {\r\n        let newDiv = document.createElement('div');\r\n        let newH4 = document.createElement('h4');\r\n        newH4.innerHTML = data.title;\r\n        newDiv.setAttribute('data-id', data._id);\r\n        newDiv.appendChild(newH4);\r\n        newDiv.className = 'activity out';\r\n        newDiv.addEventListener('click', this.previewActivityOnClick.bind(this));\r\n        return newDiv;\r\n    }\r\n\r\n    previewActivityOnClick ({ srcElement }) {\r\n        let clickedItem = Array.from(this.itemsOuter).find(item => {\r\n            return item.getAttribute('data-id') === srcElement.getAttribute('data-id');\r\n        });\r\n        this.position = parseInt(`-${clickedItem.style.left}`, 10);\r\n        this.activeItemIndex = Array.from(this.itemsOuter).indexOf(clickedItem);\r\n        this.moveSlider();\r\n        this.updateActivePreview();\r\n    }\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Slider);\n\n//# sourceURL=webpack:///./app/js/general/slider.js?");

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

/***/ "./app/js/renderData.js":
/*!******************************!*\
  !*** ./app/js/renderData.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass RenderData {\r\n\r\n    constructor (DOMElement, data) {\r\n        this.html = DOMElement.innerHTML;\r\n        this.data = data;\r\n        this.loopStartStr = '@for';\r\n        this.loopEndStr = '@endfor';\r\n        this.regExp = /\\{{([^}}]+)/g;\r\n        this.regExpArrProp = /\\=!([^!=]+)/g;\r\n        this.run(DOMElement, this.data);\r\n    }\r\n\r\n    run (DOMElement) {\r\n        if (!this.getMatches(this.html, this.regExp)) {\r\n            return document.querySelector('async').remove();\r\n        }\r\n\r\n        if (Array.isArray(this.data)) {\r\n            let loopTemplate = this.getTemplate(this.loopStartStr, this.loopEndStr);\r\n            this.html = this.html.replace(loopTemplate, this.handleLoop(loopTemplate));\r\n            this.html = this.html.replace(this.loopStartStr, '');\r\n            this.html = this.html.replace(this.loopEndStr, '');\r\n        } else {\r\n            this.html = this.replaceAllMatchesWithData(this.html, this.data);\r\n        }\r\n\r\n        // Tell the loader we're done fetching the data.\r\n        document.querySelector('async').remove();\r\n        DOMElement.innerHTML = this.html;\r\n    }\r\n\r\n    handleLoop (template) {\r\n        let templateeWithData = '';\r\n\r\n        for (let data of this.data) {\r\n            templateeWithData += this.replaceAllMatchesWithData(template, data);\r\n        }\r\n\r\n        return templateeWithData;\r\n    }\r\n\r\n    replaceAllMatchesWithData (template, data) {\r\n        for(let match of this.getMatches(template, this.regExp)) {\r\n            let prop = this.getProp(match);\r\n\r\n            if (Array.isArray(data[prop])) {\r\n                template = template.replace(match + '}}', this.replaceLoopMatches(data, match, prop));\r\n            } else {\r\n                let matchData = this.getDataFromMatch(data, prop);\r\n                template = template.replace(match + '}}', matchData);\r\n            }\r\n        }\r\n\r\n        return template;\r\n    }\r\n\r\n    replaceLoopMatches (data, match, prop) {\r\n        let htmlTemplate = match.split('.')[2].trim();\r\n        let htmlTemplateWithData = '';\r\n        let currentHtmlTemplate = htmlTemplate;\r\n\r\n        for (let object of data[prop]) {\r\n            for (let arrProp of this.getMatches(htmlTemplate, this.regExpArrProp)) {\r\n                let replaceArrProp = arrProp + '!=';\r\n                arrProp = arrProp.slice(2, prop.length + 1);\r\n                currentHtmlTemplate = currentHtmlTemplate.replace(replaceArrProp, object[arrProp]);\r\n            }\r\n            htmlTemplateWithData += currentHtmlTemplate;\r\n            currentHtmlTemplate = htmlTemplate;\r\n        }\r\n\r\n        return htmlTemplateWithData;\r\n    }\r\n\r\n    getMatches (string, regEx) {\r\n        return string.match(regEx);\r\n    }\r\n\r\n    getTemplate (startIndex, endIndex) {\r\n        if (!startIndex) return false;\r\n        return this.html.substring(\r\n            this.html.indexOf(startIndex) + startIndex.length,\r\n            this.html.indexOf(endIndex)\r\n        );\r\n    }\r\n\r\n    getDataFromMatch (data, prop) {\r\n        // Get the property. {{ this.data.test }} -> test.\r\n        if (data[prop]) return data[prop];\r\n        return false;\r\n    }\r\n\r\n    getProp (match) {\r\n        return match.split('.')[1].trim();\r\n    }\r\n\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (RenderData);\n\n//# sourceURL=webpack:///./app/js/renderData.js?");

/***/ }),

/***/ "./app/js/utils.js":
/*!*************************!*\
  !*** ./app/js/utils.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Utils {\r\n\r\n    static animateIn (elements) {\r\n        let delay = 75;\r\n\r\n        for (let element of elements) {\r\n            setTimeout(() => element.classList.remove('out'), delay);\r\n            delay += 75;\r\n        }\r\n\r\n        return true;\r\n    }\r\n\r\n    static animateOut (elements) {\r\n        let delay = 75;\r\n\r\n        for (let element of elements) {\r\n            setTimeout(() => element.classList.add('out'), delay);\r\n            delay += 75;\r\n        }\r\n\r\n        return true;\r\n    }\r\n\r\n    static getInputValue (DOMElement, name) {\r\n        return DOMElement.querySelector(`input[name=\"${name}\"]`).value;\r\n    }\r\n\r\n    static storeLocal (object, name = 'user') {\r\n        localStorage.setItem(name, JSON.stringify(object));\r\n    }\r\n\r\n    static getLocal (name = 'user') {\r\n        return JSON.parse(localStorage.getItem(name));\r\n    }\r\n\r\n    static getIdFromUrl () {\r\n        let id = window.location.hash.substr(1);\r\n        id = id.split('/')[1];\r\n        return id;\r\n    }\r\n\r\n}\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (Utils);\n\n//# sourceURL=webpack:///./app/js/utils.js?");

/***/ })

/******/ });