const Bootcamp = require("../../../models/Bootcamp");
const User=require("../../../models/User");
const Course=require("../../../models/Course");

const cours = require("./course");

const { getAll } = require("./coursGetAll");
const { getById } = require("./courseById");
const {post}=require('./coursePost');
const {put}=require('./coursePut');
const {remove}=require('./courseDelete');

module.exports.courseTest = () => {
  let server = require("../../../index");
  beforeEach(async () => {
    //  require("../../../index");
    
  });
  afterEach(async () => {
   // await bootcamp.remove()
     await Bootcamp.collection.dropIndexes();
     await Bootcamp.remove({});

     await Course.collection.dropIndexes();
     await Course.remove({});
  
    await  User.collection.dropIndexes();
    await User.remove({});
    await server.close();
  });
 describe("GET/", getAll(server));

   describe("GET /:id", getById(server));

   describe('POST /',post(server));
   describe('PUT /',put(server));
   describe('DELETE /',remove(server));
};
