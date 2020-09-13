const express=require('express');
const bootcampsRoute=require('./../routes/bootcamps');
const coursesRoute=require('./../routes/course');
const authRoute=require('./../routes/auth');
const userRoute=require('./../routes/user');
const reviewRoute=require('./../routes/review');
const error=require('../middelware/errorHandling');

module.exports=(app)=>{
    app.use(express.json())
    app.use('/api/v1/bootcamps',bootcampsRoute);
    app.use('/api/v1/courses',coursesRoute);
    app.use('/api/v1/auth',authRoute);
    app.use('/api/v1/users', userRoute);
    app.use('/api/v1/reviews', reviewRoute);
    
    app.use(error);
}