/**
 * The post view.
 * @type {Object}
 */
module.exports = {
    template: require('./post.template.html'),
    mixins: [require('../mixins/post-resource')],

    data() {
        return {
            post: {},
            loaded: false,
            id: this.$route.params.id
        };
    },

    components: {
        blogArticle: require('../components/article'),
        loader: require('../components/loader')
    },

    ready() {
        this.post = this.getPost(this.id);
    },
    methods: {}
};
