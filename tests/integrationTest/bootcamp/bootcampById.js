const request = require("supertest");
const { bootcampApi } = require("./bootcampApi");
const { message } = require("./../message");
const bootcampModel = require("./bootcamp");
const mongoose = require("mongoose");

const Bootcamp = require("../../../models/Bootcamp");

const Service=require('./../service');

module.exports.getById=(server)=>{
  const service=new Service(server, bootcampApi().GETBYID);
  return   ()=>{
    it(message({ name: "bootcamp" }).one, async () => {
        //const bootcampModel = new BootCampModel();
        const bootcamp = await bootcampModel.create();

       service.setId(bootcamp.ops[0]._id);
        const res =await service.getById();

        // const res = await request(server).get(
        //   bootcampApi(bootcamp.ops[0]._id).GETBYID
        // );
        expect(res.status).toBe(200);
        expect(res.body.data).toHaveProperty("name");
      });
      it(message({ name: "bootcamp" }).invalidId, async () => {
        service.setId(1);
        const res = await service.getById();
        expect(res.status).toBe(404);
      });
      it(message({ name: "bootcamp" }).noObject, async () => {
        const id = mongoose.Types.ObjectId();
        service.setId(id);
        const res = await service.getById();
        expect(res.status).toBe(404);
      });
      
}
}