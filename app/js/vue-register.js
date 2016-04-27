var Vue = require('vue');

/**
 * Register plugins.
 */
Vue.use(require('vue-router'));
Vue.use(require('vue-resource'));

/**
 * Vue filter to truncate a string to the specified length.
 *
 * @param {String} value The value string.
 */
Vue.filter('truncate', function(value, length) {
    if (value.length < length) {
        return value;
    }

    length = length - 3;

    return value.substring(0, length) + '...';
});

module.exports = Vue;
