'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    ROOT_API: '"http://api.uscip.iskytest.com"',
    // ROOT_API: '"http://crypto.iskytest.com"',
});
