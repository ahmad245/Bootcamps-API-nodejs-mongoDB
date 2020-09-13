
const { reviewApi } = require("./reviewApi");
const { message } = require("./../message");
const review = require("./review");

const bootcamp=require('./../bootcamp/bootcamp');

const {userNotlogin,noObject,noPermission,invalidId}=require('./../CommonFailTest');

const Review = require("../../../models/Review");

const Service=require('./../service');

const name="review";

module.exports.put = (server) => {
    const service=new Service(server,reviewApi().PUT);
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
     
      const userToken = await review.getUserToken();
      token = userToken.token;
      user = userToken.user;
     // const bootcampMock= await bootcamp.createModelValidWithUser(user._id);
      const reviewMock=await review.createModelValidWithUser(user._id);
      id=reviewMock.ops[0]._id;
      service.setId(reviewMock.ops[0]._id);
      service.setToken(token);
    });
    afterEach(async () => {
    });

    it(message({ name}).userNotlogin, userNotlogin(review,service,exec));
    it(message({name}).noPermission,noPermission(review,service,exec))

    it(message({ name}).invalidId, invalidId(review,service,exec));

    it(message({ name }).noObject, noObject(review,service,exec));


    it(message({ name: "review" }).saveObject, async () => {
      obj = review.getReviewValid();
      service.setObj(obj);
      const res = await exec();

      const result = await Review.findById(id);
    
      expect(result).not.toBeNull();
      expect(res.body.success).toBeTruthy();
      expect(result.title).toBe('review');
    });
  
    it(message({ name, paramName: "title", param: 2 }).lessthan,async () => {
        cha = "b";
        review.prop = cha;
        obj = review.getInvalidReTitle();
        service.setObj(obj);
        await verfy();
      }
    );
    it(message({ name, paramName: "title", param: 100 }).morthan,async () => {
        let cha = new Array(102).join("a");

        review.prop = cha;
        obj = review.getInvalidReTitle();
        service.setObj(obj);
        await verfy();
      }
    );

    it(message({ name, paramName: "text", param: 2 }).lessthan, async () => {
      let cha="a";
        review.prop = cha;
        obj = review.getInvalidReText();
        service.setObj(obj);
        await verfy();
      }
    );
    it( message({ name, paramName: "text", param: 100 }) .morthan,async () => {
        let cha = new Array(102).join("a");

        review.prop = cha;
        obj = review.getInvalidReText();
        service.setObj(obj);
        await verfy();
      }
    );
    
 
    it(message({ name, paramName: "rating" }).inValidProp,async () => {
       let cha = 20;
        review.prop = cha;
        obj = review.getInvalidReRating();
        service.setObj(obj);
        const res = await exec();
        expect(res.body.success).toBeFalsy();
        expect(res.status).toBe(400);
      }
    );
   


   
  };
};



