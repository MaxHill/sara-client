/**
 * The posts view.
 * @type {Object}
 */
module.exports = {
    template: require('./posts.template.html'),
    mixins: [require('../mixins/post-resource')],
    data() {
        return {};
    },

    components: {
        blogArticle: require('../components/article'),
        loader: require('../components/loader')
    },

    ready() {
        this.getPosts(['photos']);
    },

    methods: {}
};
