module.exports = {
    '/': {
        component: require('./views/welcome')
    },
    'posts/:id': {
        name: 'post',
        component: require('./views/post')
    },
    '/posts': {
        component: require('./views/posts')
    },
    '*': {
        component: require('./views/404')
    }
};
