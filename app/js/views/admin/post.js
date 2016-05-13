/**
 * The post-admin view.
 * @type {Object}
 */
module.exports = {
    template: require('./post.template.html'),
    mixins: [require('../../mixins/post-resource')],
    data() {
        return {
            editing: false,
            post: {}
        };
    },
    components: {
        postSidebar: require('../../components/post-sidebar'),
        postEdit: require('../../components/post-edit')
    },
    events: {
        'create-post': function(id) {
            this.post = {};
            this.createEmbryoPost((post) => {
                this.editing = true;
                this.$broadcast('created', post.data.data);
            });
        },
        'edit-start': function(id) {
            this.editing = true;
            this.$broadcast('edit-start', id);
        },
        'edit-stop': function() {
            this.editing = false;
            this.$broadcast('edit-stop');
        },
        'deleted': function() {
            this.editing = false;
            this.$broadcast('deleted');
        }
    }
};
