/**
 * post-resource mixin.
 * @type {Object}
 */
module.exports = {
    data() {
        return {
            postsResource: this.$resource('posts{/id}'),
            post: {},
            posts: [],
            loaded: false,
            newPost: {
                title: '',
                content: ''
            }
        };
    },
    methods: {
        getPosts() {
            this.postsResource.get().then(function(response) {
                this.$set('posts', response.data.data);
                this.$set('loaded', true);
            }, function(argument) {
                this.$set('error', true);
                this.$set('message', 'Sorry no posts yet.');
            });
        },

        getPost(id) {
            this.postsResource.get({id: id}).then(function(response) {
                this.$set('post', response.data.data);
                this.$set('loaded', true);
            }, function(response) {
                console.log('Im awesome');
                this.$router.go({path: '/posts'});
            });
        },

        createPost() {
            // save item
            this.postsResource.save(this.newPost).then(function(response) {
                alert('Created');
            }, function(response) {
                alert('error');
            });
        },

        updatePost(id) {
            // save item
            this.postsResource.update({id: id},this.post).then(function(response) {
                alert('Updated');
            }, function(response) {
                alert('error');
            });
        }
    },
};
