var Help = require('./test-helper');
var PostResource;
var Vue;

describe('The Post-Resource', () => {

    beforeEach(() => {
        var mixin = require('../app/js/mixins/post-resource');
        PostResource = Help.bootstrapMixin(mixin);
    });

    it('should know what path to use', () => {
        expect(typeof(PostResource.path) != 'undefined').toBe(true);
        expect(typeof PostResource.path).toBe('string');
    });

    it('should be able to get all posts', () => {
        spyOn(PostResource.resource, 'get').and.callThrough();

        PostResource.getPosts();

        expect(typeof PostResource.getPosts).toBe('function');
        expect(PostResource.resource.get)
            .toHaveBeenCalledWith({}, {include: []});
    });

    it('should be able to include photos when getting all posts', () => {
        spyOn(PostResource.resource, 'get').and.callThrough();

        PostResource.getPosts(['photos']);

        expect(PostResource.resource.get)
            .toHaveBeenCalledWith({}, {include: ['photos']});
    });

    it('should be able to get a post', () => {
        spyOn(PostResource.resource, 'get').and.callThrough();

        PostResource.getPost(1);

        expect(typeof PostResource.getPost).toBe('function');
        expect(PostResource.resource.get)
            .toHaveBeenCalledWith({id: 1}, {include: []});
    });

    it('should be able to iclude photos when getting a post', () => {
        spyOn(PostResource.resource, 'get').and.callThrough();

        PostResource.getPost(1, ['photos']);

        expect(typeof PostResource.getPost).toBe('function');
        expect(PostResource.resource.get)
            .toHaveBeenCalledWith({id: 1}, {include: ['photos']});
    });

    it('should be able to create a post', () => {
        spyOn(PostResource.resource, 'save').and.callThrough();
        PostResource.post = {data: 'mockdata'};

        PostResource.createPost();

        expect(typeof PostResource.createPost).toBe('function');
        expect(PostResource.resource.save)
            .toHaveBeenCalledWith({data: 'mockdata'});
    });

    it('should be able to create an embryo post', () => {
        spyOn(PostResource, '$http').and.callThrough();
        PostResource.post = {data: 'mockdata'};

        PostResource.createEmbryoPost();

        expect(typeof PostResource.createEmbryoPost).toBe('function');
        expect(PostResource.$http)
            .toHaveBeenCalledWith({url: 'posts/embryo', method: 'POST'});
    });

    it('should be able to update a post', () => {
        spyOn(PostResource.resource, 'update').and.callThrough();
        PostResource.post = {data: 'mockdata'};

        PostResource.updatePost(1);

        expect(typeof PostResource.updatePost).toBe('function');
        expect(PostResource.resource.update)
            .toHaveBeenCalledWith({id: 1},{data: 'mockdata'});
    });

    it('should have a plural variable "loading"', () => {
        expect(PostResource.loading).toBeDefined();
    });

    it('should be able to call a callback when creating embryo post', () => {
        // Create callback with fake bind method
        PostResource.callback = function() {return {bind() {}};};
        spyOn(PostResource, '$http').and.callThrough();
        spyOn(PostResource, 'callback').and.callThrough();
        PostResource.post = {data: 'mockdata'};

        PostResource.createEmbryoPost(PostResource.callback);

        expect(typeof PostResource.createEmbryoPost).toBe('function');
        expect(PostResource.$http)
            .toHaveBeenCalledWith({url: 'posts/embryo', method: 'POST'});
    });
});
