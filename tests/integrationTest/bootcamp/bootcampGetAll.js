const request = require("supertest");
const { bootcampApi } = require("./bootcampApi");
const { message } = require("./../message");
const bootcampModel = require("./bootcamp");



const Service = require("./../service");

module.exports.getAll = (server) => {
  return () => {
    it(message({ name: "bootcamps" }).all, async () => {
      await bootcampModel.createCollectionValid();
     
      const service = new Service(server, bootcampApi().GET);
      const res = await service.getAll();
      expect(res.status).toBe(200);
      expect(res.body.count).toBe(2);
      expect(res.body.data.some((b) => b.name == "bootcamp1")).toBeTruthy();
      expect(res.body.data.some((b) => b.name == "bootcamp2")).toBeTruthy();
    });
  };
};
