/**
 * The uploader view.
 * @type {Object}
 */
module.exports = {
    template: require('./uploader.template.html'),
    props: {
        photos: {
            default() {
                return [];
            }
        },
        overrides: {}
    },
    data() {
        return {
            uploader: null,
            dropzone: require('dropzone'),
            options: {
                url: '/',
                paramName: 'photo',
                maxFilesize: 4,
                thumbnailWidth: null,
                thumbnailHeight: null,
                previewsContainer: '.Uploader__previews',
                acceptedFiles: '.jpg, .jpeg, .png, .gif',
                removedfile: this.delete,
                success: this.addToPhotos,
                headers: {
                    'Authorization': null
                },
                // jscs:disable
                previewTemplate: `
                    <div class='Uploader__preview-item'>
                        <span class="Uploader__remove" data-dz-remove>
                            <img class="Icon__huge Uploader__icon" src="/images/icons/delete.svg"></img>
                        </span>
                        <img data-dz-thumbnail class='Uploader__image'>
                        <div class="Uploader__progress dz-progress">
                            <div class="Uploader__uploaded dz-upload" data-dz-uploadprogress>
                            </div>
                        </div>
                        <div data-dz-errormessage></div>
                    </div>`
                // jscs:enable
            }
        };
    },
    ready() {
        // jscs:disable
        this.options.headers.Authorization = this.$http.headers.common['Authorization'];
        // jscs:enable
        this.setup();
    },
    methods: {
        setup() {
            this.setOptions();
            this.uploader = new this.dropzone(
                '.Uploader__dropzone',
                this.options
            );
            this.setDefaultPhotos();
        },
        setOptions() {
            for (let option in this.overrides) {
                this.options[option] = this.overrides[option];
            }
        },
        setDefaultPhotos() {
            var self = this;

            if (typeof(this.photos) == 'undefined' ||
                this.photos.length == 0) {
                return true;
            }

            this.photos.forEach((photo) => {
                let mockFile = {name: photo.name, size: 1234};
                var path = self.$http.options.root + '/' + photo.path;
                // Call the default addedfile event handler
                self.uploader.emit('addedfile', mockFile);

                // And optionally show the thumbnail of the file:
                self.uploader.emit('thumbnail', mockFile, path);

                // Make sure that there is no progress bar, etc...
                self.uploader.emit('complete', mockFile);

                // self.uploader.options.addedfile.call(
                //     self.uploader,
                //     mockFile
                // );
                // self.uploader.options.thumbnail.call(
                //     self.uploader,
                //     mockFile,
                //     path
                // );
            });
        },
        delete(file) {
            this.photos.forEach((photo, index) => {
                let fileInfo = file;
                if (file.xhr) {
                    fileInfo = JSON.parse(file.xhr.response).data;
                }

                if (fileInfo.name == photo.name) {
                    let self = this;
                    this.$http({
                        url: 'photos/' + photo.id,
                        method: 'DELETE'
                    }).then(() => {
                        self.photos.splice(index, 1);
                        file.
                            previewElement.
                            parentNode.
                            removeChild(file.previewElement);
                    }, () => {
                        self.$dispatch('error', 'Could not delete photo');
                    });
                }
            });
        },
        addToPhotos(file, response) {
            if (file.status !== 'success') {
                return false;
            }
            this.photos.push(response.data);
        }
    }
};
