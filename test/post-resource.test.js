var Help = require('./test-helper');
var PostResource;

describe('Post-Resource', () => {

    beforeEach(() => {
        var mixin = require('../app/js/mixins/post-resource');
        PostResource = Help.bootstrapMixin(mixin);
    });

    it('should exist', () => {
        expect(typeof PostResource.getPosts).toBe('function');
    });

    it('should know what path to use', () => {
        expect(typeof(PostResource.path) != 'undefined').toBe(true);
        expect(typeof PostResource.path).toBe('string');
    });

    it('should be able to get all posts', () => {
        expect(typeof PostResource.getPosts).toBe('function');
    });

    it('should be able to get one post', () => {
        expect(typeof PostResource.getPost).toBe('function');
    });

    it('should be able to create a post', () => {
        expect(typeof PostResource.createPost).toBe('function');
    });

    it('should be able to update a post', () => {
        expect(typeof PostResource.updatePost).toBe('function');
    });
});
