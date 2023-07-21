const { format, createLogger, transports } = require("winston");
require("winston-daily-rotate-file");


/**
 * This is used to create daily new logger file as per dateandtime
 */
const fileRotateTransport = new transports.DailyRotateFile({
  filename: "logs/logger-%DATE%.log",
  datePattern: "YYYY-MM-DD",
  maxFiles: "14d",
});

const logger = createLogger({
  level: "debug",
  format:format.combine(
    format.timestamp({format: 'MMM-DD-YYYY HH:mm:ss'}),
    format.align(),
    format.printf(info => `${info.level}: ${[info.timestamp]}: ${info.message}`),
),
  transports: [fileRotateTransport, new transports.Console()],
});

module.exports = logger;