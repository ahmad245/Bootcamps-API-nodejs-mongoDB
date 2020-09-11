require('express-async-errors');
 
const winston=require('winston');
const {format}=require('winston');

module.exports=function()
{    
  const loggerFormat = format.combine(
    format.errors({ stack: true }),
    format.timestamp(),
    format.metadata(),
    format.json()
  )
  
  const consoleFormat = {
    format: format.combine(
      format.splat(),
      format.simple(),
      format.errors({ stack: true })
    ),
    level: 'info',
    handleExceptions: true,
    json: false,
    colorize: true
  }
const logger = winston.createLogger({
    level: 'info',
    format: loggerFormat,
    defaultMeta: { service: 'user-service' },
    transports: [
      //
      // - Write all logs with level `error` and below to `error.log`
      // - Write all logs with level `info` and below to `combined.log`
      //
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    //  new winston.transports.Console(consoleFormat)
    ],
  });
   
  //
  // If we're not in production then log to the `console` with the format:
  // `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
  //
  console.log(process.env.NODE_ENV);
  
  if (!( ['test','production'].includes(process.env.NODE_ENV))) {
    logger.add(new winston.transports.Console({
      format: winston.format.simple(),
    }));
  }
  
  // if (process.env.NODE_ENV !== 'production') {
  //   logger.add(new winston.transports.Console({
  //     format: winston.format.simple(),
  //   }));
  // }
  
  winston.add(logger)
 
  //winston.debug('Hey man, I am here!')
}