var Vue = require('./vue-register');
var VueRouter = require('vue-router');
var Config = require('./config');

Vue.http.options.root = Config.url;

/**
 * Vue root instance
 */
const App = Vue.extend({
    components: {
        notifications: require('./components/notifications')
    },
    events: {
        'notice': function(message) {
            this.$broadcast('notice', message);
        },
        'success': function(message) {
            this.$broadcast('success', message);
        },
        'error': function(message) {
            this.$broadcast('error', message);
        }
    }
});

const Router = new VueRouter({history: true});
Router.beforeEach(({to, next}) => {
    let re = new RegExp('^/admin.*');
    if (re.test(to.path)) {
        if (Router.app.$isLoggedIn() == false) {
            Router.go('/login');
        }
        return true;
    } else {
        next();
    }
});
Router.map(require('./routes.js'));
Router.start(App, '#app');

