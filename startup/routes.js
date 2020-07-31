const express=require('express');
const bootcampsRoute=require('./../routes/bootcamps');
const error=require('../middelware/errorHandling');

module.exports=(app)=>{
    app.use(express.json())
    app.use('/api/v1/bootcamps',bootcampsRoute);
    
    app.use(error);
}