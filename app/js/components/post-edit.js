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
        },
        save(id) {
            this.updatePost(id, this.postUpdated);
        },
        publish(id) {
            this.publishPost(id, this.setStatus('published'));
        },
        unpublish(id) {
            this.publishPost(id, this.setStatus('unpublished'));
        },
        setStatus($status) {
            this.post.status = $status;
        },
        postUpdated(post) {
            this.post = post.data.data;
        }
    },
    events: {
        'edit-start': function(id) {
            this.post = {};
            this.getPost(id, ['photos']);
        }
    }
};
