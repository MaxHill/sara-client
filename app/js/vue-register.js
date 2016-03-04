var Vue = require('vue');

/**
 * Register plugins.
 */
Vue.use(require('./plugins/example'));
Vue.use(require('vue-router'));
Vue.use(require('vue-resource'));

Vue.http.options.root = 'http://sara.app';

module.exports = Vue;
