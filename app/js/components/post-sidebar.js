/**
 * The post-sidebar view.
 * @type {Object}
 */
module.exports = {
    template: require('./post-sidebar.template.html'),
    props: ['editId', 'posts'],
    mixins: [require('../mixins/post-resource')],
    data() {
        return {
            active: null
        };
    },
    ready() {
        this.getPosts();
    },
    methods: {
        setEdit(id) {
            this.$dispatch('edit-start', id);
        },
        create() {
            this.$dispatch('create-post');
        }
    },
    events: {
        'edit-start': function(id) {
            this.active = id;
        },
        'edit-stop': function() {
            this.active = null;
        }
    }
};
