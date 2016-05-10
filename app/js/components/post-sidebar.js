/**
 * The post-sidebar view.
 * @type {Object}
 */
module.exports = {
    template: require('./post-sidebar.template.html'),
    props: ['editPost'],
    mixins: [require('../mixins/post-resource')],
    data() {
        return {
            posts: [],
            active: null
        };
    },
    computed: {
        hasEditingPost() {
            if (typeof(this.editPost.id) == 'undefined') {
                return false;
            }
            return true;
        },
        blargh() {
            return 'blargh'
        }
    },
    ready() {
        this.getPosts([],{unpublished: true});
    },
    methods: {
        setEdit(id) {
            this.$dispatch('edit-start', id);
        },
        create() {
            this.$dispatch('create-post');
        },
        updatePost(post) {
            this.posts.some((item, i) => {
                if (item.id == post.id) {
                    this.posts.$set(i, post);
                    return true;
                }
                return false;
            });
        }
    },
    events: {
        'created': function(post) {
            this.posts.push(post);
        },
        'edit-start': function(id) {
            this.active = id;
        },
        'edit-stop': function() {
            this.active = null;
        },
        'saved': function(post) {
            this.updatePost(post);
        }
    }
};
