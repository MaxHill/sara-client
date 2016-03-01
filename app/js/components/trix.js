/**
 * The trix view.
 * @type {Object}
 */
module.exports = {
    template: require('./trix.template.html'),
    props: ['content'],
    ready() {
        var element = document.querySelector('trix-editor');
        var self = this;

        element.addEventListener('trix-initialize', self.updateContent);
        element.addEventListener('trix-change', self.updateContent);
    },
    methods: {
        updateContent() {
            var data = document.getElementById('editor');
            if (typeof data.value !== 'undefined') {
                this.$set('content', data.value);
            }
        }
    }
};
