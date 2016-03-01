/**
 * The post-update view.
 * @type {Object}
 */
module.exports = {
    template: require('./post-edit.template.html'),
    mixins: [require('../mixins/post-resource')],
    data() {
        return {
            id: this.$route.params.id
        };
    },
    components: {
        trix: require('../components/trix'),
    },
    ready() {
        this.getPost(this.id);
    },
    methods: {}
};
