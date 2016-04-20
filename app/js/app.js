var Vue = require('./vue-register');

Vue.http.options.root = 'http://sara.app';

/**
 * Vue root instance
 */
var App = Vue.extend({
    data() {
        return {};
    },
    ready() {
        // From example plugin
        this.$pluginSay();
    },
    components: {
        navigation: require('./components/nav')
    },
    events: {
        'success': function(message) {
            alert('Success - ' + message);
        },
        'error': function(message) {
            alert('Error - ' + message);
        }
    }
});

var VueRouter = require('vue-router');
var Router = new VueRouter({history: true});
Router.map(require('./routes.js'));
Router.start(App, '#app');
