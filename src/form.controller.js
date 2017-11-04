"use strict";
exports.__esModule = true;
var FormController = (function () {
    function FormController(formUtils, listController) {
        var _this = this;
        this.formUtils = formUtils;
        this.listController = listController;
        this._artistForm = document.querySelector('#new-artist-form');
        this._addButton = document.querySelector('#add-btn')
            .addEventListener('click', function (e) {
            e.preventDefault();
            _this.addArtist();
        });
        this._clearButton = document.querySelector('#clear-btn')
            .addEventListener('click', function (e) {
            e.preventDefault();
            _this.clearForm();
        });
    }
    FormController.prototype.addArtist = function () {
        debugger;
        // Verify that artist name exists
        var newArtist;
        var isValid = true;
        newArtist.name = this._artistForm.querySelector('input[name="artist_name"]').value;
        newArtist.image = this._artistForm.querySelector('input[name="image_url"]').value;
        newArtist.youtubeUrl = this._artistForm.querySelector('input[name="youtube_url"]').value;
        if (newArtist.name.length > 0) {
            // error
        }
        if (!this.formUtils.validateUrl(newArtist.image)) {
            // error
        }
        if (!this.formUtils.validateUrl(newArtist.youtubeUrl)) {
            // error
        }
        this.listController.addArtist(newArtist);
    };
    FormController.prototype.clearForm = function () {
    };
    return FormController;
}());
exports.FormController = FormController;
