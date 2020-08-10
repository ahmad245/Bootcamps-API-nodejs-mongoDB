const express=require('express');
const dotenv=require('dotenv');
const morgan=require('morgan');
var path = require('path');

const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

const cookieParser = require('cookie-parser');


const connectDB=require('./config/db');

dotenv.config({path:'./config/config.env'});
connectDB();

const app=express();

// Cookie parser
app.use(cookieParser());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 mins
    max: 100
  });

  app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

app.use(express.static(path.join(__dirname,'public')));
app.use(morgan('dev'));

require('./startup/logging')();
require('./startup/routes')(app);

const PORT=process.env.PORT || 500;
app.listen(PORT,()=>{
    console.log(`server connect to port ${PORT} `);
})