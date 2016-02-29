/**
 * The post-create view.
 * @type {Object}
 */
module.exports = {
    template: require('./post-create.template.html'),
    mixins: [require('../mixins/post-resource')],
    data() {
        return {};
    },
    methods: {}
};
