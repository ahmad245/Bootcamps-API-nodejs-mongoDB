const express=require('express');
const dotenv=require('dotenv');
const morgan=require('morgan');
var path = require('path');
const cookieParser = require('cookie-parser');


const connectDB=require('./config/db');

dotenv.config({path:'./config/config.env'});
connectDB();

const app=express();

// Cookie parser
app.use(cookieParser());

app.use(express.static(path.join(__dirname,'public')));
app.use(morgan('dev'));

require('./startup/logging')();
require('./startup/routes')(app);

const PORT=process.env.PORT || 500;
app.listen(PORT,()=>{
    console.log(`server connect to port ${PORT} `);
})