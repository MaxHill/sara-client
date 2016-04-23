    /**
 * The notifications component.
 * @type {Object}
 */
module.exports = {
    template: require('./notifications.template.html'),
    data() {
        return {
            notifications: []
        };
    },
    methods: {
        close(notification) {
            notification.closed = true;
        },
        addNotification(type, message) {
            let notification = {message,type,closed: false};
            this.notifications.unshift(notification);
            if (notification.type == 'error') {
                return;
            }
            this.timeoutNotification(notification);
        },
        timeoutNotification(notification) {
            setTimeout(() => {
                notification.closed =  true;
            }, 3000);
        }
    },
    events: {
        'notice': function(message) {
            this.addNotification('notice', message);
        },
        'success': function(message) {
            this.addNotification('success', message);
        },
        'error': function(message) {
            this.addNotification('error', message);
        }
    }
};
