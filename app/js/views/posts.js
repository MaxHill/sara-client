/**
 * The posts view.
 * @type {Object}
 */
module.exports = {
    template: require('./posts.template.html'),
    data() {
        return {
            resource: this.$resource('posts'),
            error: false,
            loaded: false,
            message: '',
            posts: []
        };
    },
    components: {
        blogArticle: require('../components/article'),
        loader: require('../components/loader')
    },
    ready() {
        this.getPosts();
    },
    methods: {
        getPosts() {
            this.resource.get().then(function(response) {
                this.$set('posts', response.data.data);
                this.$set('loaded', true);
            }, function (argument) {
                this.$set('error', true);
                this.$set('message', 'Sorry no posts yet.');
            });
        }
    }
};
