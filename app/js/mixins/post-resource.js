/**
 * post-resource mixin.
 * @type {Object}
 */
module.exports = {
    data() {
        return {
            resource: this.$resource('posts{/id}'),
            path: 'posts{/id}',
            post: {},
            posts: [],
            loading: true,
            error: false,
            message: ''
        };
    },
    methods: {
        getPosts(include = []) {
            this.$set('loading', true);
            this.resource.get({}, {include}).then((response) => {
                this.$set('posts', response.data.data);
                this.$set('loading', false);
            }, (response) => {
                this.$set('loading', false);
                this.$set('error', true);
                this.$set('message', 'Sorry no posts yet.');
            });
        },

        getPost(id, include = []) {
            this.$set('loading', true);
            this.resource.get({id: id}, {include}).then((response) => {
                this.$set('post', response.data.data);
                this.$set('loading', false);
            }, (response) => {
                this.$router.go({path: '/posts'});
            });
        },

        createPost() {
            this.$set('loading', true);
            this.resource.save(this.post).then((response) => {
                this.$set('post', response.data.data);
                this.$set('loading', false);
            }, (response) => {
                alert('Error creating new post');
            });
        },

        createEmbryoPost() {
            let request = {
                url: 'posts/embryo',
                method: 'POST'
            };
            this.$set('loading', true);
            this.$http(request).then((response) => {
                this.$set('post', response.data.data);
                this.$set('loading', false);
            }, (response) => {
                alert('Error creating new post');
            });
        },

        updatePost(id) {
            this.resource.update({id: id},this.post).then((response) => {
                alert('Updated');
            }, (response) => {
                alert('Error updating');
            });
        },

        deletePost(id) {
            this.resource.delete({id: id},this.post).then((response) => {
                alert('Deleted');
                this.$router.go({path: '/posts'});
            }, (response) => {
                alert('Error deleting');
            });
        }
    },
};
