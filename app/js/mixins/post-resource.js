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
            loading: false,
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
                this.$dispatch('error','Could not load posts');
            });
        },

        getPost(id, include = []) {
            this.$set('loading', true);
            this.resource.get({id: id}, {include}).then((response) => {
                this.$set('post', response.data.data);
                this.$set('loading', false);
            }, (response) => {
                this.$dispatch('error','Could not load the post');
                this.$router.go({path: '/posts'});
            });
        },

        createPost() {
            this.$set('loading', true);
            this.resource.save(this.post).then((response) => {
                this.$set('post', response.data.data);
                this.$set('loading', false);
            }, (response) => {
                this.$dispatch('error','Could not create new post');
            });
        },

        createEmbryoPost(callback) {
            let request = {
                url: 'posts/embryo',
                method: 'POST'
            };
            this.$set('loading', true);
            this.$http(request).then((response) => {
                this.$set('post', response.data.data);
                this.$set('loading', false);
                if (typeof callback == 'function') {
                    callback();
                }
            }, (response) => {
                this.$dispatch('error','Could not create new post');
            });
        },

        updatePost(id) {
            this.resource.update({id: id},this.post).then((response) => {
                this.$dispatch('success','Post updated');
            }, (response) => {
                this.$dispatch('error','Could not update post');
            });
        },

        deletePost(id) {
            this.resource.delete({id: id},this.post).then((response) => {
                this.$dispatch('success','Post deleted');
                this.$router.go({path: '/posts'});
            }, (response) => {
                this.$dispatch('error','Could not delete post');
            });
        }
    },
};
