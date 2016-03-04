/**
 * The post-create view.
 * @type {Object}
 */
module.exports = {
    template: require('./post-create.template.html'),
    mixins: [require('../mixins/post-resource')],
    data() {
        return {
            post: {
                title: '',
                content: ''
            }
        };
    },
    components: {
        trix: require('../components/trix'),
    },
    methods: {}
};
