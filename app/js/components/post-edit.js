/**
 * The post-edit view.
 * @type {Object}
 */
module.exports = {
    template: require('./post-edit.template.html'),
    props: ['post'],
    computed: {
        loaded() {
            return typeof this.post.id !== 'undefined';
        }
    },
    mixins: [require('../mixins/post-resource')],
    components: {
        trix: require('../components/trix'),
        loader: require('../components/loader'),
        photoUpload: require('../components/uploader')
    },
    methods: {
        close() {
            this.post = {};
            this.$dispatch('edit-stop');
        }
    },
    events: {
        'edit-start': function(id) {
            this.post = {};
            this.getPost(id, ['photos']);
        }
    }
};
