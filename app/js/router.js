module.exports = {
    '/': {
        component: require('./views/welcome')
    },
    'posts/:id': {
        name: 'post',
        component: require('./views/post')
    },
    'posts/:id/edit': {
        name: 'post-edit',
        component: require('./views/post-edit')
    },
    'posts/create': {
        component: require('./views/post-create')
    },
    '/posts': {
        component: require('./views/posts')
    },
    '*': {
        component: require('./views/404')
    }
};
