/**
 * The post-list view.
 * @type {Object}
 */
module.exports = {
    template: require('./post-list.template.html'),
    data() {
        return {
            resource: this.$resource('posts'),
            error: false,
            message: '',
            posts: []
        };
    },
    ready() {
        this.getPosts();
    },
    methods: {
        getPosts() {
            this.resource.get().then(function(response) {
                this.$set('posts', response.data.data);
            }, function (argument) {
                this.$set('error', true);
                this.$set('message', 'Sorry no posts yet.');
            });
        }
    },
};
