var configDev = {};
try {
    var configDev = require('./config-dev.js');
} catch (e) {}

var config = {
    url: 'http://sara.app'
};

module.exports = Object.assign(config,configDev);
