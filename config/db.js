const mongoose=require('mongoose');
const winston = require('winston');

const connectDB=()=>{
   mongoose.connect(process.env.MONGO_URI,{
      useCreateIndex:true,
      useNewUrlParser:true,
      useFindAndModify:false,
      useUnifiedTopology: true
  }).then((conn) => winston.info(`Connected to ${conn.connection.host}...`));
  ;

 // console.log(`MongoDB connected ${conn.connection.host}`);
  

}

module.exports=connectDB;