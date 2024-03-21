const winston = require('winston');

const configureLogging = () => {
    // check if the app is running in development mode or sandbox
    const isLocalhost = () => {
        return process.env.NODE_ENV === 'development';
    };

    // determine the logging configuration based on the environment
    if (isLocalhost()) {
        return {
            level: 'debug',
            format: winston.format.cli(),
            transports: [
              new winston.transports.Console()
            ]
        };
    }
}

module.exports = configureLogging;
