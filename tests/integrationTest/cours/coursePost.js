
const { courseApi } = require("./courseApi");
const { message } = require("./../message");
const course = require("./course");

const bootcamp=require('./../bootcamp/bootcamp');

const {userNotlogin}=require('./../CommonFailTest');

const Course = require("../../../models/Course");

const Service=require('./../service');

const name="course";

module.exports.post = (server) => {
    const service=new Service(server,courseApi().POST);
  return () => {
   
    let token='';
    let obj={};
    let user;
    let cha = "";
   
    const exec = async () => {
        return await service.postValue();
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
      
      const bootcampMock= await bootcamp.createModelValidWithUser(user._id);

      service.setPath(courseApi().POST+'/'+bootcampMock.ops[0]._id);
      service.setToken(token);
    });
    afterEach(async () => {
    });
    it(message({ name: "course" }).userNotlogin, userNotlogin(course,service,exec));

    it(message({ name: "course" }).saveObject, async () => {
      obj = course.getCourseValid();
      service.setObj(obj);
      const res = await exec();
     
      const result = await Course.find({ title: "course" });
    
      expect(result).not.toBeNull();
      expect(res.body.success).toBeTruthy();
      expect(result.some((b) => b.title == obj.title)).toBeTruthy();
      expect(result.some((b) => b.description == obj.description)).toBeTruthy();
    });
    it("shold return 404 if No bootcamp with the id", async () => {
        obj = course.getCourseValid();
        service.setObj(obj);
        service.setPath(courseApi().POST+'/'+bootcamp.getObjectId());
        const res = await exec();
       
      
      
        expect(res.body.data).not.toBeNull();
        expect(res.body.success).toBeFalsy();
        expect(res.status).toBe(404);
       
      });
      it("shold return 404 if invalid bootcamp id", async () => {
       
        service.setPath(courseApi().POST+'/'+1);
        const res = await exec();
      
        expect(res.body.data).not.toBeNull();
        expect(res.body.success).toBeFalsy();
        expect(res.status).toBe(404);
       
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
    
    it( message({ name, paramName: "weeks" }).inValidProp,async () => {
        cha = "website";
        course.prop = cha;
        obj = course.getInvalidCrWeeks();
        delete obj.weeks
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
    it( message({ name, paramName: "tuition" }).inValidProp,async () => {
         
          obj = course.getCourseValid();
         delete  obj.tuition;
          service.setObj(obj);
          const res = await exec();
          expect(res.body.success).toBeFalsy();
          expect(res.status).toBe(400);
        }
      );

   
  };
};



