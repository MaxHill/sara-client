/**
 * The post-sidebar view.
 * @type {Object}
 */
module.exports = {
    template: require('./post-sidebar.template.html'),
    props: ['editId', 'posts'],
    data() {
        return {
            active: null
        };
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
