"use strict";
exports.__esModule = true;
var form_controller_1 = require("./form.controller");
var list_controller_1 = require("./list.controller");
var form_util_1 = require("./form.util");
var App = (function () {
    function App(_fromController, _listController) {
        this._fromController = _fromController;
        this._listController = _listController;
        debugger;
    }
    return App;
}());
debugger;
var listController = new list_controller_1.ListController();
var formUtils = new form_util_1.FormUtils();
var formController = new form_controller_1.FormController(formUtils, listController);
var myApp = new App(formController, listController);
