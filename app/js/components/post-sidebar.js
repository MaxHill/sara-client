/**
 * The post-sidebar view.
 * @type {Object}
 */
module.exports = {
    template: require('./post-sidebar.template.html'),
    props: ['editId', 'posts'],
    methods: {
        setEdit(id) {
            this.$dispatch('edit-start', id);
        },
        create() {
            this.$dispatch('create-new-post');
        }
    }
};
