/**
 * post-resource mixin.
 * @type {Object}
 */
module.exports = {
    data() {
        return {
            path: 'photos{/id}'
        };
    },
    methods: {
        deletePhoto(id) {
            this.$resource(this.path)
                .delete({id: id},this.post)
                .then(function(response) {
                    alert('Deleted');
                }, function(response) {
                    alert('Error deleting');
                });
        }
    }
};
