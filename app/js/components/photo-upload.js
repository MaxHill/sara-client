var Dropzone = require('dropzone');
module.exports = {
    template: require('./photo-upload.template.html'),
    props: ['photos', 'uploadpath'],
    mixins: [require('../mixins/photo-resource')],
    data: function() {
        return {
            token: 'photo-upload.js - ADD TOKEN HERE',
            imageUpload: null
        };
    },
    ready: function() {
        var self = this;
        this.imageUpload = new Dropzone('.PhotoUpload', {
            url: this.$http.options.root + '/' + this.uploadpath,
            maxFiles: 10,
            paramName: 'photo',
            maxFilesize: 3,
            thumbnailWidth: 1000,
            thumbnailHeight: 1000,
            acceptedFiles: '.jpg, .jpeg, .png, .gif',
            init: function() {
                var currentPhotos = self.photos;
                console.log(currentPhotos);
                if (
                    typeof(currentPhotos) !== 'undefined' &&
                    currentPhotos.length !== 0
                ) {
                    currentPhotos.forEach((photo) => {
                        var mockFile = {name: photo.name, size: 12345};
                        var url = self.$http.options.root + '/' + photo.path;
                        this.options.addedfile.call(this, mockFile);
                        this.options.thumbnail.call(this, mockFile, url);
                        mockFile.previewElement.classList.add('dz-success');
                        mockFile.previewElement.classList.add('dz-complete');
                        this.element
                            .getElementsByClassName('PhotoUpload__message')[0]
                            .classList.add('PhotoUpload__message--hidden');
                        this.element.
                            getElementsByClassName('PhotoUpload__progress')[0]
                            .classList.add('PhotoUpload__progress--hidden');
                    });
                }
            },
            removedfile: function(file) {
                self.photos.every((photo) => {
                    if (photo.name == file.name) {
                        self.deletePhoto(photo.id);
                        return false;
                    }
                    return true;
                });
            },
            // jscs:disable
            previewTemplate: `
            <div class='PhotoUpload__preview'>
                <span data-dz-remove>
                    <img class="Icon  Icon__small PhotoUpload__remove" src="/images/icons/ui/circle-remove.svg">
                </span>
                <img data-dz-thumbnail class='PhotoUpload__image'>
                <div class="PhotoUpload__progress dz-progress">
                    <div class="PhotoUpload__uploaded dz-upload" data-dz-uploadprogress>
                    </div>
                </div>
                <div data-dz-errormessage></div>
            </div>`
            // jscs:enable
        });
        this.registerListners();
    },

    methods: {
        registerListners: function() {
            this.successListner();
            this.removeListner();
            this.addListner();
            this.dragLeaveListner();
            this.dragOverListner();
            this.dragEnterListner();
            this.dragEndListner();
            this.maxFileListner();
            this.errorListner();
        },
        successListner: function() {
            this.imageUpload.on('success', function() {
                this.element.
                    getElementsByClassName('PhotoUpload__progress')[0].
                    classList.add('PhotoUpload__progress--hidden');
            });
        },
        removeListner: function() {
            this.imageUpload.on('removedfile', function($file, $fileList) {
                console.log('photo-upload.js', $file);
                this.element
                    .getElementsByClassName('PhotoUpload__message')[0]
                    .classList.remove('PhotoUpload__message--hidden');
            });
        },
        addListner: function() {
            this.imageUpload.on('addedfile', function() {
                this.element
                    .getElementsByClassName('PhotoUpload__message')[0]
                    .classList.add('PhotoUpload__message--hidden');
            });
        },
        dragLeaveListner: function() {
            this.imageUpload.on('dragleave', function() {
                this.element.classList.remove('Avatar--over');
                this.element.
                    getElementsByClassName('PhotoUpload__icon')[0].
                    classList.remove('PhotoUpload__icon--over');
            });
        },
        dragOverListner: function() {
            this.imageUpload.on('dragover', function() {
                this.element.classList.add('Avatar--over');
                this.element.
                    getElementsByClassName('PhotoUpload__icon')[0].
                    classList.add('PhotoUpload__icon--over');
            });
        },
        dragEnterListner: function() {
            this.imageUpload.on('dragenter', function() {
                this.element.classList.add('Avatar--over');
                this.element.
                    getElementsByClassName('PhotoUpload__icon')[0].
                    classList.add('PhotoUpload__icon--over');
            });
        },
        dragEndListner: function() {
            this.imageUpload.on('dragend', function() {
                this.element.classList.remove('Avatar--over');
                this.element.
                    getElementsByClassName('PhotoUpload__icon')[0].
                    classList.remove('PhotoUpload__icon--over');
            });
        },
        maxFileListner: function() {
            this.imageUpload.on('maxfilesexceeded', function(file) {
                this.removeAllFiles();
                this.addFile(file);
            });
        },
        errorListner: function() {
            this.imageUpload.on('error', function(file, respons) {
                var errors = '';
                for (var i = 0; i < response.photo.length; i++) {
                    errors += `<li>` + response.photo[i]   + `</li>`;
                }
                file.previewElement.classList.add('dz-error');
                file.previewElement.
                    querySelector('[data-dz-errormessage]').
                    innerHTML = `
                    <ul class="PhotoUpload__error">
                        <li><b>Error:</b></li>${errors}
                    </ul>`;
            });
        }
    }
};
