process.env.NODE_ENV ='test'
const {bootcampTest}=require('./integrationTest/bootcamp/bootcampTest');
const {courseTest}=require('./integrationTest/cours/courseTest');
const {reviewTest}=require('./integrationTest/review/reviewTest');
const {middleware}=require('./integrationTest/middleware/middlewareTest');


describe('/api/bootcamp',bootcampTest);
describe('/api/course',courseTest);
describe('/api/review',reviewTest);
describe('middleware',middleware);