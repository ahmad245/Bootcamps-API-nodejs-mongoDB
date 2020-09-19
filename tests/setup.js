jest.setTimeout(50000);
const dotenv=require('dotenv');
process.env.NODE_ENV="test";
dotenv.config({path:`./config/${process.env.NODE_ENV}.env`});
const mongoose=require('mongoose');
mongoose.Promise=global.Promise;
   mongoose.connect(process.env.MONGO_URI_TEST,{
      useCreateIndex:true,
      useNewUrlParser:true,
      useFindAndModify:false,
      useUnifiedTopology: true
  })
  .then((conn) => console.log(`Connected to ${conn.connection.host}.test..`))
 
  



