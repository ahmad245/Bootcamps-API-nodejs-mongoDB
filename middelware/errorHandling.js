const winston=require('winston');
module.exports=function(err,req,res,next)
{
    
    let status;
    let message;
      // Mongoose bad ObjectId
    if (err.name === 'CastError') {
         message = `Resource not found`;
        winston.error(message,err);
        status=404;
       // res.status(404).json(message);
      }

  // Mongoose duplicate key
  if (err.code === 11000) {
     message = 'Duplicate field value entered';
    winston.error(message,err);
    status=400;
    //res.status(400).json(message);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
     message = Object.values(err.errors).map(val => val.message);
    winston.error(message,err);
    status=400;
    // res.status(400).json(message);
  }

  //winston.error(err.message,err);
  //res.status(500).json(message);
console.log(message);

  res.status(status || 500).json({
    success: false,
    error: message || 'Server Error'
  });
    
}