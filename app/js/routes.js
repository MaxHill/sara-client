module.exports = {
    '/': {
        name: 'posts',
        component: require('./views/posts')
    },
    '/admin': {
        component: require('./views/admin/layout'),
        subRoutes: {
            '/': {
                name: 'dashboard',
                component: {
                    template: '<p>This will be a dashboard in the future!</p>'
                }
            },
            '/posts': {
                name: 'posts-admin',
                component: require('./views/admin/post')
            },
        }
    },
    '/login': {
        name: 'login',
        component: require('./views/login')
    },
    '*': {
        component: require('./views/404')
    }
};
