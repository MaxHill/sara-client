/**
 * The post-edit view.
 * @type {Object}
 */
module.exports = {
    template: require('./post-edit.template.html'),
    props: ['post'],
    mixins: [require('../mixins/post-resource')],
    components: {
        trix: require('../components/trix'),
        loader: require('../components/loader'),
        photoUpload: require('../components/uploader')
    },
    methods: {
        close() {
            this.post = {};
            this.loading = true;
            this.$dispatch('edit-stop');
        }
    },
    events: {
        'edit-start': function(id) {
            this.getPost(id, ['photos']);
        }
    }
};
