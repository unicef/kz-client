'use strict';
const createEnvVariable = require('../build/utils').createEnvVariable;

module.exports = {
    NODE_ENV: '"development"',
    API_ROOT: createEnvVariable('API_ROOT', 'http://localhost:8000'),
    ONLINE_USER_SERVICE: createEnvVariable('ONLINE_USER_SERVICE', 'http://localhost:3000'),
};
