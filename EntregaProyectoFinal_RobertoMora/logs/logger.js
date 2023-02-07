import winston from 'winston'

let logger // Levels: Silly, Debug, Verbose, Info, Warn, Error

  logger = winston.createLogger({
    level: 'debug',
    transports: [
      new winston.transports.File({ filename: 'info.log', level: 'info' }),
      new winston.transports.File({ filename: 'warn.log', level: 'warn' }),
      new winston.transports.File({ filename: 'errors.log', level: 'error' }),
      new winston.transports.Console({ level: 'info' }),
    ]
  })

export default logger