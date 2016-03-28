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
                thumbnailWidth: 250,
                thumbnailHeight: 250,
                acceptedFiles: '.jpg, .jpeg, .png, .gif',
                removedfile: this.delete,
                success: this.addToPhotos,
                // jscs:disable
                previewTemplate: `
                    <div class='Uploader__preview'>
                        <span data-dz-remove>
                            <img class="Icon  Icon__small Uploader__remove" src="/images/icons/ui/circle-remove.svg">
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
        this.setup();
    },
    methods: {
        setup() {
            this.setOptions();
            this.uploader = new this.dropzone('.Uploader', this.options);
            this.setDefaultPhotos();
        },
        setOptions() {
            for (let option in this.overrides) {
                this.options[option] = this.overrides[option];
            }
        },
        setDefaultPhotos() {
            var self = this;
            this.photos.forEach((photo) => {
                let mockFile = {name: photo.name, size: 1234};
                var path = self.$http.options.root + '/' + photo.path;
                self.uploader.options.addedfile.call(
                    self.uploader,
                    mockFile
                );
                self.uploader.options.thumbnail.call(
                    self.uploader,
                    mockFile,
                    path
                );
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
                        //error
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
