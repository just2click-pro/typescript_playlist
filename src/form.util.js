"use strict";
exports.__esModule = true;
var FormUtils = (function () {
    function FormUtils() {
        this._validURLRegExp = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
    }
    FormUtils.prototype.validateUrl = function (isValidURL) {
        return this._validURLRegExp.test(isValidURL);
    };
    return FormUtils;
}());
exports.FormUtils = FormUtils;
