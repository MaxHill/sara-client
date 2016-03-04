/**
 * The posts view.
 * @type {Object}
 */
module.exports = {
    template: require('./posts.template.html'),
    mixins: [require('../mixins/post-resource')],
    data() {
        return {
            posts: [],
            loading: true,
            error: false,
            message: ''
        };
    },

    components: {
        blogArticle: require('../components/article'),
        loader: require('../components/loader')
    },

    ready() {
        this.getPosts();
    },

    methods: {}
};
