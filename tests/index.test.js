process.env.NODE_ENV ='test'
const {bootcampTest}=require('./integrationTest/bootcamp/bootcampTest');


describe('/api/bootcamp',bootcampTest);