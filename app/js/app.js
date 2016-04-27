var Vue = require('./vue-register');
var VueRouter = require('vue-router');
var Config = require('./config');

Vue.http.options.root = Config.url;

/**
 * Vue root instance
 */
const App = Vue.extend({
    ready() {},
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
Router.map(require('./routes.js'));
Router.start(App, '#app');
