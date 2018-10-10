import winston from 'winston';
import config from '../config';

const options = {
  file: {
    level: 'info',
    filename: config.logFileName,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  }
};

const transports = [
  new winston.transports.File(options.file),
  new winston.transports.Console(options.console)
];

const logger = winston.createLogger({
  transports: transports,
  exitOnError: false
});

logger.info('Logger initialized -- logging to: ' + transports.map((t) => {
  return t.name;
}).join(', '));

// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
  write: function (message, encoding) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message);
  }
};

export default logger;