import { createLogger, format, transports } from 'winston';
const { combine, /*timestamp,*/ label, printf } = format;

const myFormat = printf(({ level, message, label }) => {
  const timestamp = new Date().toISOString().
  replace(/T/, ' ').      // replace T with a space
    replace(/\..+/, '');     // delete the dot and everything after
  return `-------------------\n${timestamp} ${level}\n-------------------\n${message}\n\n\n\n`;
});

const logger = createLogger({
  level: 'info',
  format: combine(
    //label({ label: 'Winston logger' }),
    //timestamp,
    myFormat
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new transports.DailyRotateFile({
      filename: 'app-error-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
      level: 'error'
    }),
    new transports.DailyRotateFile({
      filename: 'app-all-%DATE%.log',
      datePattern: 'YYYY-MM-DD-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d'
    }),
    // new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// transport.on('rotate', function(oldFilename, newFilename) {
//   // do something fun
// });

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.simple(),
  }));
}

export default logger;
