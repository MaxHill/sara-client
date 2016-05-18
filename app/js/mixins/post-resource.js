/**
 * post-resource mixin.
 * @type {Object}
 */
module.exports = {
    data() {
        return {
            resource: this.$resource('posts{/id}'),
            path: 'posts{/id}',
            loading: false
        };
    },
    methods: {
        getPosts(include = [], filters = {}) {
            this.$set('loading', true);
            this.resource.get({}, {include, filters}).then((response) => {
                this.$set('posts', response.data.data);
                this.$set('loading', false);
            }, (response) => {
                this.$set('loading', false);
                this.$set('error', true);
                this.$set('message', 'Sorry no posts yet.');
                this.$dispatch('error','Could not load posts');
            });
        },

        getPost(id, include = [], filters = {}) {
            this.$set('loading', true);
            this.resource.get({id}, {include, filters}).then((response) => {
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
                    callback(response);
                }
            }, (response) => {
                this.$dispatch('error','Could not create new post');
            });
        },

        publishPost(id, callback) {
            let request = {
                url: `posts/${id}/publish`,
                method: 'POST'
            };

            this.$http(request).then((response) => {
                this.$dispatch('success','Post was published');
                if (typeof callback == 'function') {
                    callback(response);
                }
            }, (response) => {
                this.$dispatch('error','Could not create new post');
            });
        },

        unpublishPost(id, callback) {
            let request = {
                url: `posts/${id}/unpublish`,
                method: 'POST'
            };

            this.$http(request).then((response) => {
                this.$dispatch('success','Post was unpublished');
                if (typeof callback == 'function') {
                    callback(response);
                }
            }, (response) => {
                this.$dispatch('error','Could not create new post');
            });
        },

        updatePost(id, callback) {
            this.resource.update({id: id},this.post).then((response) => {
                this.$dispatch('success','Post updated');
                if (typeof callback == 'function') {
                    callback(response);
                }
            }, (response) => {
                this.$dispatch('error','Could not update post');
            });
        },

        deletePost(id, callback) {
            this.resource.delete({id: id},this.post).then((response) => {
                this.$dispatch('success','Post deleted');
                this.$dispatch('deleted');
                if (typeof callback == 'function') {
                    callback(response);
                }
            }, (response) => {
                this.$dispatch('error','Could not delete post');
            });
        }
    },
};
