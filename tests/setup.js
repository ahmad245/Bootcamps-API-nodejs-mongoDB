jest.setTimeout(5000000);

const mongoose=require('mongoose');
mongoose.Promise=global.Promise;
   mongoose.connect("mongodb+srv://ahmad:syria2451039@ahmad.gkzxp.mongodb.net/devcamperTest?retryWrites=true&w=majority",{
      useCreateIndex:true,
      useNewUrlParser:true,
      useFindAndModify:false,
      useUnifiedTopology: true
  })
  .then((conn) => console.log(`Connected to ${conn.connection.host}...`))
  //.catch((err)=>console.log("err"));
  ;

 // console.log(`MongoDB connected ${conn.connection.host}`);
  


//module.exports=connectDB;

process.env.GEOCODER_PROVIDER = "mapquest";
process.env.GEOCODER_API_KEY="W0xFMYBPfAGGbdZ4TtryrqnPvfkTW6JE"
process.env.GEOCODER_SECRET_KEY="99W6R56Wplgb5vgG"