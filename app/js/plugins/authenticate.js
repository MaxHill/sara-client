const Store = require('store');
/**
 * Handles authentication.
 *
 * @param  {instance} Vue
 * @param  {object} options
 */

module.exports = (Vue, options) => {
    Vue.prototype.$isLoggedIn = function() {
        let user = Store.get('user');
        if (
            typeof(user) !== 'undefined' &&
            new Date(user.timeout) > new Date()
        ) {
            Vue.http.headers.common['Authorization'] = user.token;
            return true;
        }
        this.$logout();
        return false;
    };

    Vue.prototype.$login = function(email, password) {
        let request = {
            url: 'authenticate',
            method: 'POST',
            data: {email,password}
        };

        this.$http(request).then((response) => {
            this.$handleSuccessfullLogin(response);
        }, (response) => {
            this.$dispatch('error','Could not login');
        });
    };

    Vue.prototype.$logout = function() {
        Vue.http.headers.common['Authorization'] = null;
        Store.remove('user');
        return false;
    };

    Vue.prototype.$handleSuccessfullLogin = function(response) {
        let token = 'Bearer ' + response.data.token;
        Vue.http.headers.common['Authorization'] = token;

        // Save user to localstorage.
        Store.set('user', {
            token,
            timeout: response.data.timeout
        });

        this.$router.go({path: '/admin'});
    };
};
