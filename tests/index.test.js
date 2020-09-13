process.env.NODE_ENV ='test'
const {bootcampTest}=require('./integrationTest/bootcamp/bootcampTest');
const {courseTest}=require('./integrationTest/cours/courseTest');


describe('/api/bootcamp',bootcampTest);
describe('/api/course',courseTest);