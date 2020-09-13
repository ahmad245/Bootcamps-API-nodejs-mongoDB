
const { bootcampApi } = require("./bootcampApi");
const { message } = require("./../message");
const bootcamp = require("./bootcamp");

const {noPermission,noObject,userNotlogin,invalidId}=require('./../CommonFailTest');


const Bootcamp = require("../../../models/Bootcamp");
const User = require("../../../models/User");

const Service=require('./../service');

const name="bootcamp";

module.exports.remove = (server) => {
    const service=new Service(server,bootcampApi().DELETE);
  return () => {
   
    let token='';
    let user;
    let id;

    const exec = async () => {
        return await service.deleteValue();
    };

    beforeEach(async () => {
      const userToken = await bootcamp.getUserToken();
      token = userToken.token;
      user = userToken.user;
    
      const bootcampMock= await bootcamp.createModelValidWithUser(user._id);
      id=bootcampMock.ops[0]._id;
      service.setId(bootcampMock.ops[0]._id);
      service.setToken(token);
    });
    afterEach(async () => {
      
    });
    it(message({name}).noPermission,noPermission(bootcamp,service,exec))
    it(message({ name }).userNotlogin, userNotlogin(bootcamp,service,exec));

    it(message({ name}).invalidId, invalidId(bootcamp,service,exec));

    it(message({ name }).noObject, noObject(bootcamp,service,exec));

    it(message({ name }).deleteIfInputValid, async () => {
      const res = await exec();
      const result = await Bootcamp.findById(id);
    
      expect(result).toBeNull();
      expect(res.body.success).toBeTruthy();

    })

   
  };
};





