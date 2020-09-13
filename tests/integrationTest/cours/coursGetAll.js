const { courseApi } = require("./courseApi");
const { message } = require("./../message");
const courseModel = require("./course");

const Service = require("./../service");

module.exports.getAll = (server) => {
  return () => {
    it(message({ name: "courses" }).all, async () => {
      await courseModel.createCollectionValid();
      const service = new Service(server, courseApi().GET);
      const res = await service.getAll();
      expect(res.status).toBe(200);
      expect(res.body.count).toBe(2);
      expect(res.body.data.some((b) => b.title == "course1")).toBeTruthy();
      expect(res.body.data.some((b) => b.title == "course2")).toBeTruthy();
    });
  };
};
