const request = require("supertest");
const { bootcampApi } = require("./bootcampApi");
const { message } = require("./../message");
const bootcampModel = require("./bootcamp");
const mongoose = require("mongoose");

const Service=require('./../service');

const Bootcamp = require("../../../models/Bootcamp");



module.exports.getAll=(server)=>{
    
  return   ()=>{
        it(message({ name: "bootcamps" }).all, async () => {
         // const bootcampModel = new BootCampModel();
          await bootcampModel.createCollectionValid();

        //  const res = await request(server).get(bootcampApi().GET);

          const service=new Service(server,bootcampApi().GET);
          const res =await service.getAll();
          expect(res.status).toBe(200);
          expect(res.body.count).toBe(2);
          expect(res.body.data.some((b) => b.name == "bootcamp1")).toBeTruthy();
          expect(res.body.data.some((b) => b.name == "bootcamp2")).toBeTruthy();
        });
      
}
}
