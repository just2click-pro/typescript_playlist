import { ArtistModel } from "./artist.model";

export class ListController {
    private _listHandle: any;
    private _list: ArtistModel[];

    constructor () {
        this._listHandle = document.querySelector('#list-container');
    }

    getList () {
        this._list = JSON.parse(localStorage.getItem("playlist-items")) || [];
    }

    saveList () {
        localStorage.setItem("playlist-items", JSON.stringify(this._list));
    }

    renderArtist (artist: ArtistModel) {
        let newArtist = 
        '<div class="col s4">' + 
            '<div class="card-panel blue-grey darken-1 white-text">' +
                '<div class="card-stacked blue-grey darken-1">' +
                    '<div class="card-content white-text">' +
                        '<div class="artist-data">' + 
                            '<div class="avatar" style="background-image: url(' + artist.image + ')"></div>' + 
                            '<div class="artist-name">' + artist.name + '</div>' +
                        '</div>' +
                    '</div>' + 
                    '<div class="card-action right">' +
                        '<a href="' + artist.youtubeUrl  + '" target="_blank">Watch Youtube Video</a>' +
                    '</div>' +
                '</div>' +
            '</div>'+
        '</div>';

        return newArtist;
    }

    addArtist (artist: ArtistModel) {
        this._list.push(artist);
        this.saveList();
        this.renderList();
    }

    removeArtist (artist: ArtistModel) {
        let artistIndex = this._list.findIndex( currentArtist => {
            return ((currentArtist.name == artist.name) && (currentArtist.image == artist.image) && (currentArtist.youtubeUrl == artist.youtubeUrl));
        });

        this._list.slice(artistIndex, 1);
        this.saveList();
        this.renderList();        
    }

    renderList () {
        let self = this;
        this._listHandle.innerHTML = '';
        if (this._list) {
            this._list.map( (artist) => {
                self._listHandle.insertAdjacentHTML('beforeend', self.renderArtist(artist));
            });
        }
    }
}