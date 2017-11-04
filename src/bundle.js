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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const form_controller_1 = __webpack_require__(1);
const list_controller_1 = __webpack_require__(2);
const form_util_1 = __webpack_require__(3);
class App {
    constructor(_fromController, _listController) {
        this._fromController = _fromController;
        this._listController = _listController;
        _listController.getList();
        _listController.renderList();
    }
}
let listController = new list_controller_1.ListController();
let formUtils = new form_util_1.FormUtils();
let formController = new form_controller_1.FormController(formUtils, listController);
let myApp = new App(formController, listController);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class FormController {
    constructor(formUtils, listController) {
        this.formUtils = formUtils;
        this.listController = listController;
        this._artistForm = document.querySelector('#new-artist-form');
        this._artistFormFields = {
            name: this._artistForm.querySelector('input[name="artist_name"]'),
            image: this._artistForm.querySelector('input[name="image_url"]'),
            youtubeUrl: this._artistForm.querySelector('input[name="youtube_url"]')
        };
        this._addButton = document.querySelector('#add-btn')
            .addEventListener('click', (e) => {
            e.preventDefault();
            this.addArtist();
        });
        this._clearButton = document.querySelector('#clear-btn')
            .addEventListener('click', (e) => {
            e.preventDefault();
            this.clearForm();
        });
    }
    addArtist() {
        let newArtist = {
            name: '',
            image: '',
            youtubeUrl: ''
        };
        let isValid = false;
        newArtist.name = this._artistFormFields.name.value;
        newArtist.image = this._artistFormFields.image.value;
        newArtist.youtubeUrl = this._artistFormFields.youtubeUrl.value;
        if (newArtist.name.length > 0) {
            isValid = true;
        }
        else {
            this._artistFormFields.name.classList.add('invalid');
        }
        if ((newArtist.image.length > 0) && (this.formUtils.validateUrl(newArtist.image))) {
            isValid = true;
        }
        else {
            this._artistFormFields.image.classList.add('invalid');
        }
        if ((newArtist.youtubeUrl.length > 0) && (!this.formUtils.validateUrl(newArtist.youtubeUrl))) {
            isValid = true;
        }
        else {
            this._artistFormFields.youtubeUrl.classList.add('invalid');
        }
        if (isValid) {
            this.listController.addArtist(newArtist);
            this.clearForm();
        }
    }
    clearForm() {
        this._artistFormFields.name.value = '';
        this._artistFormFields.name.classList.remove('invalid');
        this._artistFormFields.image.value = '';
        this._artistFormFields.image.classList.remove('invalid');
        this._artistFormFields.youtubeUrl.value = '';
        this._artistFormFields.youtubeUrl.classList.remove('invalid');
    }
}
exports.FormController = FormController;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class ListController {
    constructor() {
        this._listHandle = document.querySelector('#list-container');
    }
    getList() {
        this._list = JSON.parse(localStorage.getItem("playlist-items")) || [];
    }
    saveList() {
        localStorage.setItem("playlist-items", JSON.stringify(this._list));
    }
    renderArtist(artist) {
        let newArtist = '<div class="col s4">' +
            '<div class="card-panel blue-grey darken-1 white-text">' +
            '<div class="card-stacked blue-grey darken-1">' +
            '<div class="card-content white-text">' +
            '<div class="artist-data">' +
            '<div class="avatar" style="background-image: url(' + artist.image + ')"></div>' +
            '<div class="artist-name">' + artist.name + '</div>' +
            '</div>' +
            '</div>' +
            '<div class="card-action right">' +
            '<a href="' + artist.youtubeUrl + '" target="_blank">Watch Youtube Video</a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>';
        return newArtist;
    }
    addArtist(artist) {
        this._list.push(artist);
        this.saveList();
        this.renderList();
    }
    removeArtist(artist) {
        let artistIndex = this._list.findIndex(currentArtist => {
            return ((currentArtist.name == artist.name) && (currentArtist.image == artist.image) && (currentArtist.youtubeUrl == artist.youtubeUrl));
        });
        this._list.slice(artistIndex, 1);
        this.saveList();
        this.renderList();
    }
    renderList() {
        let self = this;
        this._listHandle.innerHTML = '';
        if (this._list) {
            this._list.map((artist) => {
                self._listHandle.insertAdjacentHTML('beforeend', self.renderArtist(artist));
            });
        }
    }
}
exports.ListController = ListController;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class FormUtils {
    constructor() {
        this._validURLRegExp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
    }
    validateUrl(isValidURL) {
        return this._validURLRegExp.test(isValidURL);
    }
}
exports.FormUtils = FormUtils;


/***/ })
/******/ ]);