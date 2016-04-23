var Vue = require('./vue-register');

Vue.http.options.root = 'http://sara.app';

/**
 * Vue root instance
 */
var App = Vue.extend({
    ready() {
        // From example plugin
        this.$pluginSay();
    },
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

var VueRouter = require('vue-router');
var Router = new VueRouter({history: true});
Router.map(require('./routes.js'));
Router.start(App, '#app');
