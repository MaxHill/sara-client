module.exports = (Vue, options) => {
    Vue.prototype.$resource = function() {
        return {
            get() {
                return {then() {return true;}};
            },
            save() {
                return {then() {return true;}};
            },
            update() {
                return {then() {return true;}};
            },
            delete() {
                return {then() {return true;}};
            }
        };
    };
    Vue.prototype.$http = function() {
        return {
            then(func1, func2) {
                return func1({data: 'test'});
            },
            headers: {
                common: {
                    'Authorization': 'faketoken'
                }
            }
        };
    };
    Vue.http = {
        headers: {
            common: []
        }
    };
};
