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
    ready() {
      this.createEmbryoPost();
    },
    components: {
        trix: require('../components/trix'),
        loader: require('../components/loader'),
        photoUpload: require('../components/photo-upload'),
    },
    methods: {}
};
