const dotenv = require("dotenv");
const winston = require('winston');

dotenv.config();

const configureLogging = () => {
    // check if the app is running in development mode or sandbox
    const isLocalhost = () => {
        return process.env.VERCEL_ENV === "localhost";
    };

    // determine the logging configuration based on the environment
    if (isLocalhost()) {
        console.log('Applying localhost logger configuration')
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
