const Bootcamp = require("../../../models/Bootcamp");
const User=require("../../../models/User");

const bootcamp = require("./bootcamp");


const { getAll } = require("./bootcampGetAll");
const { getById } = require("./bootcampById");
const {post}=require('./bootcampPost');
const {put}=require('./bootcampUpdate');
const {remove}=require('./bootcampDelete');

module.exports.bootcampTest = () => {
  let server = require("../../../index");
  beforeEach(async () => {
    //  require("../../../index");
    
   
    
  });
  afterEach(async () => {
   // await bootcamp.remove()
     await Bootcamp.collection.dropIndexes();
     await Bootcamp.collection.remove({});
  
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
