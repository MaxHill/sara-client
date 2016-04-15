/**
 * The post-admin view.
 * @type {Object}
 */
module.exports = {
    template: require('./post-admin.template.html'),
    mixins: [require('../mixins/post-resource')],
    data() {
        return {
            posts: {},
            editing: false,
            post: {}
        };
    },
    components: {
        postSidebar: require('../components/post-sidebar'),
        postEdit: require('../components/post-edit')
    },
    ready() {
        this.getPosts();
    },
    events: {
        'edit-start': function(id) {
            this.editing = true;
            this.$broadcast('edit-start', id);
        },
        'edit-stop': function() {
            this.editing = false;
        }
    }
};
