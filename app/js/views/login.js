/**
 * The login view.
 * @type {Object}
 */
module.exports = {
    template: require('./login.template.html'),
    data(){
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login() {
            this.$login(this.email, this.password);
        }
    }
};
