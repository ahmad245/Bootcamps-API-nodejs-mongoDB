const Bootcamp = require("../../../models/Bootcamp");
const User=require("../../../models/User");

const { getAll } = require("./bootcampGetAll");
const { getById } = require("./bootcampById");
const {post}=require('./bootcampPost');
const {put}=require('./bootcampUpdate');

module.exports.bootcampTest = () => {
  let server = require("../../../index");
  beforeEach(async () => {
    //  require("../../../index");
    
    await Bootcamp.collection.dropIndexes();
    
  });
  afterEach(async () => {
    await Bootcamp.collection.remove({});
    await  User.collection.dropIndexes();
    await User.remove({});
    await server.close();
  });
 describe("GET/", getAll(server));

  describe("GET /:id", getById(server));

  describe('POST /',post(server));
  describe.only('PUT /',put(server));
};
