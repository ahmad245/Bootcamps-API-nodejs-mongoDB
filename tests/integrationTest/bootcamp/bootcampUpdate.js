
const { bootcampApi } = require("./bootcampApi");
const { message } = require("./../message");
const bootcamp = require("./bootcamp");

const {noPermission,noObject,userNotlogin,invalidId}=require('./../CommonFailTest');


const Bootcamp = require("../../../models/Bootcamp");
const User = require("../../../models/User");

const Service=require('./../service');

const name="bootcamp";

module.exports.put = (server) => {
    const service=new Service(server,bootcampApi().PUT);
  return () => {
   
    let token='';
    let obj={};
    let user;
    let cha = "";

    const exec = async () => {
        return await service.putValue();
    };

    const verfy = async () => {
      const res = await exec();
      expect(res.body.success).toBeFalsy();
      expect(res.status).toBe(400);
    };

    beforeEach(async () => {
      const userToken = await bootcamp.getUserToken();
      token = userToken.token;
      user = userToken.user;
    
      const bootcampMock= await bootcamp.createModelValidWithUser(user._id);
      service.setId(bootcampMock.ops[0]._id);
      service.setToken(token);
    });
    afterEach(async () => {
      
    });
    it(message({name}).noPermission,noPermission(bootcamp,service,exec))
    it(message({ name }).userNotlogin, userNotlogin(bootcamp,service,exec));

    it(message({ name}).invalidId, invalidId(bootcamp,service,exec));

    it(message({ name }).noObject, noObject(bootcamp,service,exec));


    it(message({ name }).saveObject, async () => {
      obj = bootcamp.getBootcampValid();
      service.setObj(obj);
      const res = await exec();

      const result = await Bootcamp.find({ name:"bootcamp" });
       
       
      expect(result).not.toBeNull();
      expect(res.body.success).toBeTruthy();
      expect(result.some((b) => b.name == obj.name)).toBeTruthy();
      expect(result.some((b) => b.description == obj.description)).toBeTruthy();
      expect(result.some((b) => b.website == obj.website)).toBeTruthy();
      expect(result.some((b) => b.phone == obj.phone)).toBeTruthy();
      expect(result.some((b) => b.email == obj.email)).toBeTruthy();
      expect(result.some((b) => b.housing == obj.housing)).toBeTruthy();
      expect(
        result.some((b) => b.jobAssistance == obj.jobAssistance)
      ).toBeTruthy();
      expect(
        result.some((b) => b.jobGuarantee == obj.jobGuarantee)
      ).toBeTruthy();
      expect(result.some((b) => b.acceptGi == obj.acceptGi)).toBeTruthy();
      expect(
        result.some((b) => b.careers.length == obj.careers.length)
      ).toBeTruthy();

      expect(result[0].careers).toEqual(expect.arrayContaining(obj.careers));
    })

    it(message({ name, paramName: "name", param: 2 }).lessthan,async () => {
        cha = "b";
        bootcamp.prop = cha;
        obj = bootcamp.getInvalidBcName();
        service.setObj(obj);
        await verfy();
      } )
    it(  message({ name, paramName: "name", param: 50 }).morthan,async () => {
        let cha = new Array(52).join("a");

        bootcamp.prop = cha;
        obj = bootcamp.getInvalidBcName();
        service.setObj(obj);
        await verfy();
      } )

    it( message({ name, paramName: "description", param: 2 }) .lessthan,async () => {
        bootcamp.prop = cha;
        obj = bootcamp.getInvalidBcDescription();
        service.setObj(obj);
        await verfy();
      }
    );
    it(message({ name, paramName: "description", param: 500 }) .morthan,async () => {
        let cha = new Array(502).join("a");

        bootcamp.prop = cha;
        obj = bootcamp.getInvalidBcDescription();
        service.setObj(obj);
        await verfy();
      }
    );
    it( message({ name, paramName: "website" }).inValidProp,async () => {
        cha = "website";

        bootcamp.prop = cha;
        obj = bootcamp.getInvalidBcWebsite();
        service.setObj(obj);
        await verfy();
      }
    );
    it( message({ name, paramName: "email" }).inValidProp,async () => {
        cha = "email";

        bootcamp.prop = cha;
        obj = bootcamp.getInvalidBcEmail();
        service.setObj(obj);
        const res = await exec();
        expect(res.body.success).toBeFalsy();
        expect(res.status).toBe(400);
      }
    );

    it( message({ name, paramName: "phone", param: 20 }).morthan,async () => {
        let cha = new Array(22).join("1");

        bootcamp.prop = cha;
        obj = bootcamp.getInvalidBcPhone();
        service.setObj(obj);
        await verfy();
      }
    );
  
    it( message({ name, paramName: "careers" }).inValidProp,async () => {
        let cha = ["aaa"];
        bootcamp.prop = cha;
        obj = bootcamp.getInvalidBcCareers();
        service.setObj(obj);
        await verfy();
      }
    );
  };
};





