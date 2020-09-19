const Bootcamp = require("../../../models/Bootcamp");
const User=require("../../../models/User");

const { advancedResult } = require("./advancedResult");
const {auth}=require('./auth');

module.exports.middleware = () => {
  let server = require("../../../index");
  afterEach(async () => {
   // await bootcamp.remove()
     await Bootcamp.collection.dropIndexes();
     await Bootcamp.collection.remove({});
  
    await  User.collection.dropIndexes();
    await User.remove({});
    await server.close();
  });
 describe("PAGINATION/", advancedResult(server));
 describe("AUTH/", auth(server));

};
