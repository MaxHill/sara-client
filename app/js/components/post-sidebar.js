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
        };
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
        },
        removeEmbryoPosts() {
            this.posts.some((item, i) => {
                if (item.status == 'embryo') {
                    this.posts.splice(i, 1);
                    return true;
                }
                return false;
            });
        },
        removePost(id) {
            this.posts.some((item, i) => {
                if (item.id == id) {
                    this.posts.splice(i, 1);
                    return true;
                }
                return false;
            });
        }
    },
    events: {
        'created': function(post) {
            this.active = post.id;
            this.posts.unshift(post);
        },
        'edit-start': function(id) {
            this.active = id;
        },
        'edit-stop': function() {
            this.active = null;
            this.removeEmbryoPosts();
        },
        'deleted': function() {
            this.removePost(this.active);
            this.active = null;
            this.removeEmbryoPosts();
        },
        'saved': function(post) {
            this.updatePost(post);
        }
    }
};
