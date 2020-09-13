
const { reviewApi } = require("./reviewApi");
const { message } = require("./../message");
const review = require("./review");

const bootcamp=require('./../bootcamp/bootcamp');

const {userNotlogin}=require('./../CommonFailTest');

const Review = require("../../../models/Review");

const Service=require('./../service');

const name="review";

module.exports.post = (server) => {
    const service=new Service(server,reviewApi().POST);
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
     
      const userToken = await review.getUserToken();
      token = userToken.token;
      user = userToken.user;
      
      const bootcampMock= await bootcamp.createModelValidWithUser(user._id);

      service.setPath(`/api/v1/bootcamps/${bootcampMock.ops[0]._id}/reviews`);
      service.setToken(token);
    });
    afterEach(async () => {
    });
    it(message({ name: "review" }).userNotlogin, userNotlogin(review,service,exec));

    it(message({ name: "review" }).saveObject, async () => {
      obj = review.getReviewValid();
      service.setObj(obj);
      const res = await exec();
     console.log(res.body);
     
      const result = await Review.find({ title: "review" });
      expect(res.status).toBe(201);
    
      expect(result).not.toBeNull();
      expect(res.body.success).toBeTruthy();
      expect(result.some((b) => b.title == obj.title)).toBeTruthy();
      expect(result.some((b) => b.text == obj.text)).toBeTruthy();
    });
    it("shold return 404 if No bootcamp with the id", async () => {
        obj = review.getReviewValid();
        service.setObj(obj);
        service.setPath(reviewApi().POST+'/'+bootcamp.getObjectId());
        const res = await exec();
       
      
      
        expect(res.body.data).not.toBeNull();
        expect(res.body.success).toBeFalsy();
        expect(res.status).toBe(404);
       
      });
      it("shold return 404 if invalid bootcamp id", async () => {
       
        service.setPath(reviewApi().POST+'/'+1);
        const res = await exec();
      
        expect(res.body.data).not.toBeNull();
        expect(res.body.success).toBeFalsy();
        expect(res.status).toBe(404);
       
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
    
  
    it( message({ name, paramName: "rating" }).inValidProp,async () => {
         
          obj = review.getReviewValid();
         delete  obj.rating;
          service.setObj(obj);
          const res = await exec();
          expect(res.body.success).toBeFalsy();
          expect(res.status).toBe(400);
        }
      );

   
  };
};



