
const { bootcampApi } = require("./bootcampApi");
const { message } = require("./../message");
const bootcamp = require("./bootcamp");

const {userNotlogin}=require('./../CommonFailTest');

const Bootcamp = require("../../../models/Bootcamp");
const User = require("../../../models/User");

const Service=require('./../service');

module.exports.post = (server) => {
    const service=new Service(server,bootcampApi().POST);
  return () => {
    // Define the happy path, and then in each test, we change
    // one parameter that clearly aligns with the name of the
    // test.
    let token='';
    let obj={};
    let user;
    let cha = "";
   // const bootcamp = new BootCampModel();

    const exec = async () => {
        return await service.postValue();
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
      service.setToken(token);
    });
    afterEach(async () => {
        // await  User.collection.dropIndexes();
        // await User.remove({});
       
    });
    it(message({ name: "bootcamp" }).userNotlogin, userNotlogin(bootcamp,service,exec));

    it(message({ name: "bootcamp" }).saveObject, async () => {
      obj = bootcamp.getBootcampValid();
      service.setObj(obj);
      const res = await exec();

      const result = await Bootcamp.find({ name: "bootcamp" });

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
    });

    it(
      message({ name: "bootcamp", paramName: "name", param: 2 }).lessthan,
      async () => {
        cha = "b";
        bootcamp.prop = cha;
        obj = bootcamp.getInvalidBcName();
        service.setObj(obj);
        await verfy();
      }
    );
    it(
      message({ name: "bootcamp", paramName: "name", param: 50 }).morthan,
      async () => {
        let cha = new Array(52).join("a");

        bootcamp.prop = cha;
        obj = bootcamp.getInvalidBcName();
        service.setObj(obj);
        await verfy();
      }
    );

    it(
      message({ name: "bootcamp", paramName: "description", param: 2 })
        .lessthan,
      async () => {
        bootcamp.prop = cha;
        obj = bootcamp.getInvalidBcDescription();
        service.setObj(obj);
        await verfy();
      }
    );
    it(
      message({ name: "bootcamp", paramName: "description", param: 500 })
        .morthan,
      async () => {
        let cha = new Array(502).join("a");

        bootcamp.prop = cha;
        obj = bootcamp.getInvalidBcDescription();
        service.setObj(obj);
        await verfy();
      }
    );
    it(
      message({ name: "bootcamp", paramName: "website" }).inValidProp,
      async () => {
        cha = "website";

        bootcamp.prop = cha;
        obj = bootcamp.getInvalidBcWebsite();
        service.setObj(obj);
        await verfy();
      }
    );
    it(
      message({ name: "bootcamp", paramName: "email" }).inValidProp,
      async () => {
        cha = "email";

        bootcamp.prop = cha;
        obj = bootcamp.getInvalidBcEmail();
        service.setObj(obj);
        const res = await exec();
        expect(res.body.success).toBeFalsy();
        expect(res.status).toBe(400);
      }
    );

    it(
      message({ name: "bootcamp", paramName: "phone", param: 20 }).morthan,
      async () => {
        let cha = new Array(22).join("1");

        bootcamp.prop = cha;
        obj = bootcamp.getInvalidBcPhone();
        service.setObj(obj);
        await verfy();
      }
    );
    it(
      message({ name: "bootcamp", paramName: "address" }).inValidProp,
      async () => {
        cha="ahmad";
        bootcamp.prop = cha;
        obj = bootcamp.getBootcampValid();
        delete obj.address;
        service.setObj(obj);

        await verfy();
      }
    );
    it(
      message({ name: "bootcamp", paramName: "careers" }).inValidProp,
      async () => {
        let cha = ["aaa"];
        bootcamp.prop = cha;
        obj = bootcamp.getInvalidBcCareers();
        service.setObj(obj);
        await verfy();
      }
    );
  };
};







// const request = require("supertest");
// const { bootcampApi } = require("./bootcampApi");
// const { message } = require("./../message");
// const bootcamp = require("./bootcamp");
// const mongoose = require("mongoose");

// const Bootcamp = require("../../../models/Bootcamp");
// const User = require("../../../models/User");

// module.exports.post = (server) => {
//   return () => {
//     // Define the happy path, and then in each test, we change
//     // one parameter that clearly aligns with the name of the
//     // test.
//     let token;
//     let obj;
//     let user;
//     let cha = "";
//    // const bootcamp = new BootCampModel();

//     const exec = async () => {
//       return await request(server)
//         .post(bootcampApi().POST)
//         .set("Authorization", `Bearer ${token}`)

//         .send(obj);
//     };

//     const verfy = async () => {
//       const res = await exec();
//       expect(res.body.success).toBeFalsy();
//       expect(res.status).toBe(400);
//     };

//     beforeEach(async () => {
//       await User.remove({});
//       const userToken = await bootcamp.getUserToken();
//       token = userToken.token;
//       user = userToken.user;
//     });
//     afterEach(async () => {});
//     it(message({ name: "bootcamp" }).userNotlogin, async () => {
//       token = "";
//       obj = bootcamp.getBootcampValid();
//       const res = await exec();
//       expect(res.status).toBe(401);
//       expect(res.body.success).toBeFalsy();
//     });

//     it(message({ name: "bootcamp" }).saveObject, async () => {
//       obj = bootcamp.getBootcampValid();
//       const res = await exec();

//       const result = await Bootcamp.find({ name: "bootcamp" });

//       expect(result).not.toBeNull();
//       expect(res.body.success).toBeTruthy();
//       expect(result.some((b) => b.name == obj.name)).toBeTruthy();
//       expect(result.some((b) => b.description == obj.description)).toBeTruthy();
//       expect(result.some((b) => b.website == obj.website)).toBeTruthy();
//       expect(result.some((b) => b.phone == obj.phone)).toBeTruthy();
//       expect(result.some((b) => b.email == obj.email)).toBeTruthy();
//       expect(result.some((b) => b.housing == obj.housing)).toBeTruthy();
//       expect(
//         result.some((b) => b.jobAssistance == obj.jobAssistance)
//       ).toBeTruthy();
//       expect(
//         result.some((b) => b.jobGuarantee == obj.jobGuarantee)
//       ).toBeTruthy();
//       expect(result.some((b) => b.acceptGi == obj.acceptGi)).toBeTruthy();
//       expect(
//         result.some((b) => b.careers.length == obj.careers.length)
//       ).toBeTruthy();

//       expect(result[0].careers).toEqual(expect.arrayContaining(obj.careers));
//     });

//     it(
//       message({ name: "bootcamp", paramName: "name", param: 2 }).lessthan,
//       async () => {
//         cha = "b";
//         bootcamp.prop = cha;
//         obj = bootcamp.getInvalidBcName();
//         await verfy();
//       }
//     );
//     it(
//       message({ name: "bootcamp", paramName: "name", param: 50 }).morthan,
//       async () => {
//         let cha = new Array(52).join("a");

//         bootcamp.prop = cha;
//         obj = bootcamp.getInvalidBcName();
//         await verfy();
//       }
//     );

//     it(
//       message({ name: "bootcamp", paramName: "description", param: 2 })
//         .lessthan,
//       async () => {
//         bootcamp.prop = cha;
//         obj = bootcamp.getInvalidBcDescription();
//         await verfy();
//       }
//     );
//     it(
//       message({ name: "bootcamp", paramName: "description", param: 500 })
//         .morthan,
//       async () => {
//         let cha = new Array(502).join("a");

//         bootcamp.prop = cha;
//         obj = bootcamp.getInvalidBcDescription();
//         await verfy();
//       }
//     );
//     it(
//       message({ name: "bootcamp", paramName: "website" }).inValidProp,
//       async () => {
//         cha = "website";

//         bootcamp.prop = cha;
//         obj = bootcamp.getInvalidBcWebsite();
//         await verfy();
//       }
//     );
//     it(
//       message({ name: "bootcamp", paramName: "email" }).inValidProp,
//       async () => {
//         cha = "email";

//         bootcamp.prop = cha;
//         obj = bootcamp.getInvalidBcEmail();
//         const res = await exec();
//         expect(res.body.success).toBeFalsy();
//         expect(res.status).toBe(400);
//       }
//     );

//     it(
//       message({ name: "bootcamp", paramName: "phone", param: 20 }).morthan,
//       async () => {
//         let cha = new Array(22).join("1");

//         bootcamp.prop = cha;
//         obj = bootcamp.getInvalidBcPhone();
//         await verfy();
//       }
//     );
//     it(
//       message({ name: "bootcamp", paramName: "address" }).inValidProp,
//       async () => {
//         bootcamp.prop = cha;
//         obj = bootcamp.getBootcampValid();
//         delete obj.address;

//         await verfy();
//       }
//     );
//     it(
//       message({ name: "bootcamp", paramName: "careers" }).inValidProp,
//       async () => {
//         let cha = ["aaa"];
//         bootcamp.prop = cha;
//         obj = bootcamp.getInvalidBcCareers();

//         await verfy();
//       }
//     );
//   };
// };
