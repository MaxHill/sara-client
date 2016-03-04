/**
 * post-resource mixin.
 * @type {Object}
 */
module.exports = {
    data() {
        return {
            path: 'posts{/id}',
        };
    },
    methods: {
        getPosts() {
            this.$resource(this.path)
                .get()
                .then(function(response) {
                this.$set('posts', response.data.data);
                this.$set('loading', true);
            }, function(argument) {
                this.$set('loading', false);
                this.$set('error', true);
                this.$set('message', 'Sorry no posts yet.');
            });
        },

        getPost(id) {
            this.$resource(this.path)
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
                .save(this.newPost)
                .then(function(response) {
                alert('Created');
            }, function(response) {
                alert('Error creating');
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
