const winston = require('winston');
const configureLogging = require('./loggingConfig');

const loggingConfig = configureLogging();
const logger = winston.createLogger(loggingConfig);

module.exports = logger;
