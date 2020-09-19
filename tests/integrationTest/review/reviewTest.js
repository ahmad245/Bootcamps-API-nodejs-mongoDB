const Bootcamp = require("../../../models/Bootcamp");
const User=require("../../../models/User");
const Course=require("../../../models/Course");
const Review=require("../../../models/Review");

const review = require("./review");

const { getAll } = require("./reviewGetAll");
const { getById } = require("./reviewById");
const {post}=require('./reviewPost');
const {put}=require('./reviewPut');
const {remove}=require('./reviewDelete');

module.exports.reviewTest = () => {
  let server = require("../../../index");
  beforeEach(async () => {
    //  require("../../../index");
    
  });
  afterEach(async () => {
   // await bootcamp.remove()
     await Bootcamp.collection.dropIndexes();
     await Bootcamp.remove({});
     await Review.collection.dropIndexes( {  bootcamp: 1, user: 1 } )
     await Review.collection.dropIndexes();
     await Review.remove({});

  
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
