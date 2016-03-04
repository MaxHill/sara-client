/**
 * The post-update view.
 * @type {Object}
 */
module.exports = {
    template: require('./post-edit.template.html'),
    mixins: [require('../mixins/post-resource')],
    data() {
        return {
            post: {},
            loading: true,
            id: this.$route.params.id
        };
    },
    components: {
        trix: require('../components/trix'),
        loader: require('../components/loader')
    },
    ready() {
        this. post = this.getPost(this.id);
    },
    methods: {}
};
