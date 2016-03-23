var Help = require('./test-helper');

describe('Uploader', () => {

    var Uploader;
    beforeEach(() => {
        Uploader = Help.bootstrapComponent(
            require('../app/js/components/uploader')
        );
    });

    it('should exist', () => {
        expect(typeof Uploader).toBe('object');
    });

    it('should have a uploader variable to bind dropzone to', () => {
        expect(typeof Uploader.uploader).not.toBe('undefined');
    });

    it('should set some default options', () => {
        let data = {
            url: '/',
            paramName: 'photo',
            maxFilesize: 4,
            thumbnailWidth: 250,
            thumbnailHeight: 250,
            removedfile: Uploader.delete,
            acceptedFiles: '.jpg, .jpeg, .png, .gif',

        };

        expect(Uploader.options).toEqual(jasmine.objectContaining(data));
    });

    it('should be able to override the default options', () => {
        let data = {
            url: 'test-url',
            test: 'option'
        };
        Uploader.overrides = data;

        Uploader.setOptions();

        expect(Uploader.options).toEqual(jasmine.objectContaining(data));
    });

    it('should have a dropzone instance', () => {
        spyOn(Uploader, 'dropzone');
        Uploader.setup();
        expect(Uploader.dropzone).toHaveBeenCalled();
    });

    it('should override defaults when setting up', () => {
        let data = {
            url: 'test-url',
            test: 'option'
        };
        Uploader.overrides = data;
        spyOn(Uploader, 'dropzone');
        spyOn(Uploader, 'setDefaultPhotos');

        Uploader.setup();

        expect(Uploader.dropzone).toHaveBeenCalled();
        expect(Uploader.setDefaultPhotos).toHaveBeenCalled();
        expect(Uploader.options).toEqual(jasmine.objectContaining(data));
    });

    it('should add the default photos', () => {
        // Mock path
        Uploader.$http = {
            options: {
                root: 'example.com'
            }
        };
        // Mock options
        Uploader.uploader = {
            options: {
                addedfile: {call() {return true;}},
                thumbnail: {call() {return true;}}
            }
        };
        // Test photos
        Uploader.photos = [
            {name: 'example-name', path: 'example-path'},
            {name: 'example-name2', path: 'example-path2'}
        ];
        let addedfile = spyOn(Uploader.uploader.options.addedfile, 'call');
        let thumbnail = spyOn(Uploader.uploader.options.thumbnail, 'call');

        Uploader.setDefaultPhotos();

        expect(addedfile.calls.count()).toBe(2);
        expect(thumbnail.calls.count()).toBe(2);
    });

    it('should add event listner for when file was removed', () => {

    });
});
