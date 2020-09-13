
const { courseApi } = require("./courseApi");
const { message } = require("./../message");
const course = require("./course");

const bootcamp=require('./../bootcamp/bootcamp');

const {userNotlogin,noObject,noPermission,invalidId}=require('./../CommonFailTest');

const Course = require("../../../models/Course");

const Service=require('./../service');

const name="course";

module.exports.put = (server) => {
    const service=new Service(server,courseApi().PUT);
  return () => {
   
    let token='';
    let obj={};
    let user;
    let cha = "";
    let id;
   
    const exec = async () => {
        return await service.putValue();
    };


    const verfy = async () => {
      const res = await exec();
      expect(res.body.success).toBeFalsy();
      expect(res.status).toBe(400);
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


    it(message({ name: "course" }).saveObject, async () => {
      obj = course.getCourseValid();
      service.setObj(obj);
      const res = await exec();

      const result = await Course.findById(id);
    
      expect(result).not.toBeNull();
      expect(res.body.success).toBeTruthy();
      expect(result.title).toBe('course');
    });
  
    it(message({ name, paramName: "title", param: 2 }).lessthan,async () => {
        cha = "b";
        course.prop = cha;
        obj = course.getInvalidCrTitle();
        service.setObj(obj);
        await verfy();
      }
    );
    it(message({ name, paramName: "title", param: 50 }).morthan,async () => {
        let cha = new Array(52).join("a");

        course.prop = cha;
        obj = course.getInvalidCrTitle();
        service.setObj(obj);
        await verfy();
      }
    );

    it(message({ name, paramName: "description", param: 2 }).lessthan, async () => {
        course.prop = cha;
        obj = course.getInvalidCrDescription();
        service.setObj(obj);
        await verfy();
      }
    );
    it( message({ name, paramName: "description", param: 500 }) .morthan,async () => {
        let cha = new Array(502).join("a");

        course.prop = cha;
        obj = course.getInvalidCrDescription();
        service.setObj(obj);
        await verfy();
      }
    );
    
 
    it(message({ name, paramName: "minimumSkill" }).inValidProp,async () => {
        cha = "ahmad";

        course.prop = cha;
        obj = course.getInvalidCrMinimumSkill();
        service.setObj(obj);
        const res = await exec();
        expect(res.body.success).toBeFalsy();
        expect(res.status).toBe(400);
      }
    );
   


   
  };
};



