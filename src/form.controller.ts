import { ArtistModel } from './artist.model';
import { FormUtils } from './form.util';
import { ListController } from './list.controller';

export class FormController {
    private _artistForm: any;
    private _artistFormFields: any;

    private _addButton: any;
    private _clearButton: any;

    constructor (private formUtils: FormUtils, private listController: ListController) {
        this._artistForm = document.querySelector('#new-artist-form');
        this._artistFormFields = {
            name: this._artistForm.querySelector('input[name="artist_name"]'),
            image: this._artistForm.querySelector('input[name="image_url"]'),
            youtubeUrl: this._artistForm.querySelector('input[name="youtube_url"]')
        }
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

    addArtist () {
        let newArtist: ArtistModel = {
            name: '',
            image: '',
            youtubeUrl: ''
        };
        let isValid = false;

        newArtist.name = this._artistFormFields.name.value;
        newArtist.image = this._artistFormFields.image.value;
        newArtist.youtubeUrl = this._artistFormFields.youtubeUrl.value;

        if (newArtist.name.length > 0)  {
            isValid = true;
        } else {
            this._artistFormFields.name.classList.add('invalid');
        }

        if ((newArtist.image.length > 0) &&  (this.formUtils.validateUrl(newArtist.image))) {
            isValid = true;
        } else {
            this._artistFormFields.image.classList.add('invalid');
        }

        if ((newArtist.youtubeUrl.length > 0) && (!this.formUtils.validateUrl(newArtist.youtubeUrl))) {
            isValid = true;
        } else {
            this._artistFormFields.youtubeUrl.classList.add('invalid');
        }

        if (isValid) {
            this.listController.addArtist(newArtist);
            this.clearForm();
        }
    }

    clearForm () {
        this._artistFormFields.name.value = '';
        this._artistFormFields.name.classList.remove('invalid');

        this._artistFormFields.image.value = '';
        this._artistFormFields.image.classList.remove('invalid');        

        this._artistFormFields.youtubeUrl.value = '';
        this._artistFormFields.youtubeUrl.classList.remove('invalid');                
    }
}