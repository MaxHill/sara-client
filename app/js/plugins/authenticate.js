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

        if (typeof(user) !== 'undefined') {
            let timeoutIso = user.timeout.replace(' ', 'T');
            if (new Date(timeoutIso) > new Date()) {
                // jscs:disable
                Vue.http.headers.common['Authorization'] = user.token;
                // jscs:enable
                return true;
            }
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
        // jscs:disable
        Vue.http.headers.common['Authorization'] = null;
        // jscs:enable
        Store.remove('user');
        return false;
    };

    Vue.prototype.$handleSuccessfullLogin = function(response) {
        let token = 'Bearer ' + response.data.token;
        // jscs:disable
        Vue.http.headers.common['Authorization'] = token;
        // jscs:enable

        // Save user to localstorage.
        Store.set('user', {
            token,
            timeout: response.data.timeout
        });

        this.$router.go({path: '/admin'});
    };
};
