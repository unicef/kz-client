'use strict';
const createEnvVariable = require('../build/utils').createEnvVariable;

module.exports = {
    NODE_ENV: '"development"',
    API_ROOT: createEnvVariable('API_ROOT', 'http://localhost:8000'),
};
