
const { courseApi } = require("./courseApi");
const { message } = require("./../message");
const course = require("./course");

const {userNotlogin,noObject,noPermission,invalidId}=require('./../CommonFailTest');

const Course = require("../../../models/Course");

const Service=require('./../service');

const name="course";

module.exports.remove = (server) => {
    const service=new Service(server,courseApi().DELETE);
  return () => {
   
    let token='';
    let obj={};
    let user;
    let cha = "";
    let id;
   
    const exec = async () => {
        return await service.deleteValue();
    };

    beforeEach(async () => {
     
      const userToken = await course.getUserToken();
      token = userToken.token;
      user = userToken.user;
     // const bootcampMock= await bootcamp.createModelValidWithUser(user._id);
      const courseMock=await course.createModelValidWithUser(user._id);
      id=courseMock.ops[0]._id;
      service.setId(courseMock.ops[0]._id);
      service.setToken(token);
    });
    afterEach(async () => {
    });

    it(message({ name}).userNotlogin, userNotlogin(course,service,exec));
    it(message({name}).noPermission,noPermission(course,service,exec))

    it(message({ name}).invalidId, invalidId(course,service,exec));

    it(message({ name }).noObject, noObject(course,service,exec));

    it(message({ name }).deleteIfInputValid, async () => {
        const res = await exec();
        const result = await Course.findById(id);
      
        expect(result).toBeNull();
        expect(res.body.success).toBeTruthy();
  
      })
   
   


   
  };
};



