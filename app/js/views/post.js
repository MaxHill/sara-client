/**
 * The post view.
 * @type {Object}
 */
module.exports = {
    template: require('./post.template.html'),
    data() {
        return {
            resource: this.$resource('posts{/id}'),
            loaded: false,
            id: this.$route.params.id,
            post: {}
        };
    },
    components: {
        blogArticle: require('../components/article'),
        loader: require('../components/loader')
    },
    ready() {
        this.getPost();
    },
    methods: {
        getPost() {
            this.resource.get({id: this.id}).then(function(response) {
                this.$set('post', response.data.data);
                this.$set('loaded', true);
            }, function(response) {
                console.log('Im awesome');
                this.$router.go({path: '/posts'});
            });
        }
    },
};
