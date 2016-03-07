/**
 * post-resource mixin.
 * @type {Object}
 */
module.exports = {
    data() {
        return {
            path: 'posts{/id}',
            post: {},
            posts: [],
            loading: true,
            error: false,
            message: ''
        };
    },
    methods: {
        createIncludeString(includes) {
            
            if ( typeof(includes) == 'undefined' || includes.length == 0 ) {
                return '';
            }

            let string = '';
            includes.forEach((include, index) => {
                let join = (index == 0) ? '?' : '&';
                string += join + 'include[]=' + include;
            });
            return string;
        },
        getPosts(includes) {
            let includeString = this.createIncludeString(includes);
            this.$resource(this.path + includeString)
                .get()
                .then(function(response) {
                this.$set('posts', response.data.data);
                this.$set('loading', false);
            }, function(argument) {
                this.$set('loading', false);
                this.$set('error', true);
                this.$set('message', 'Sorry no posts yet.');
            });
        },

        getPost(id, includes) {
            let includeString = this.createIncludeString(includes);
            this.$resource(this.path + includeString)
                .get({id: id})
                .then(function(response) {
                this.$set('post', response.data.data);
                this.$set('loading', false);
            }, function(response) {
                this.$router.go({path: '/posts'});
            });
        },

        createPost() {
            this.$resource(this.path)
                .save(this.post)
                .then(function(response) {
                    this.$set('post', response.data.data);
                    this.$set('loading', false);
            }, function(response) {
                alert('Error creating new post');
            });
        },

        createEmbryoPost() {
            this.$http({url: 'posts/embryo', method: 'POST'})
                .then(function(response) {
                    this.$set('post', response.data.data);
                    this.$set('loading', false);
            }, function(response) {
                alert('Error creating new post');
            });
        },

        updatePost(id) {
            this.$resource(this.path)
                .update({id: id},this.post)
                .then(function(response) {
                alert('Updated');
            }, function(response) {
                alert('Error updating');
            });
        },

        deletePost(id) {
            this.$resource(this.path)
                .delete({id: id},this.post)
                .then(function(response) {
                alert('Deleted');
                this.$router.go({path: '/posts'});
            }, function(response) {
                alert('Error deleting');
            });
        }
    },
};
