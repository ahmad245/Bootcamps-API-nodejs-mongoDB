const request = require("supertest");
const { advancedResultApi } = require("./advancedResultApi");
const { message } = require("./../../integrationTest/message");
const bootcampModel = require("./../bootcamp/bootcamp");
const Bootcamp=require('./../../../models/Bootcamp');
const advancedResultsMiddleware=require('./../../../middelware/advancedResults');
module.exports.advancedResult = (server) => {
  return () => {
    it(message({ name: "bootcamps" }).all, async () => {
      await bootcampModel.createCollectionValid();
     let  req={
          query:{
              page:1,
              limit:1
          }
      };
      let res={};
      const next = jest.fn();
     await advancedResultsMiddleware(Bootcamp)(req,res,next);
     expect(res.advancedResults).not.toBeNull();
     expect(res.advancedResults.success).toBeTruthy();
     expect(res.advancedResults.count).toBe(1);
    });
  };
};
