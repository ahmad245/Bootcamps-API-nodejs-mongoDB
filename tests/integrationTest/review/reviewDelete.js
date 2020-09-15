
const { reviewApi } = require("./reviewApi");
const { message } = require("./../message");
const review = require("./review");

const {userNotlogin,noObject,noPermission,invalidId}=require('./../CommonFailTest');

const Review = require("../../../models/Review");

const Service=require('./../service');

const name="review";

module.exports.remove = (server) => {
    const service=new Service(server,reviewApi().DELETE);
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

    it(message({ name }).deleteIfInputValid, async () => {
        const res = await exec();
        const result = await Review.findById(id);
      
        expect(result).toBeNull();
        expect(res.body.success).toBeTruthy();
  
      })
   
   


   
  };
};



