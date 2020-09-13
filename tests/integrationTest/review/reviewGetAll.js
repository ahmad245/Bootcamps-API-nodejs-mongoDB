const { reviewApi } = require("./reviewApi");
const { message } = require("./../message");
const review = require("./review");

const Service = require("./../service");

module.exports.getAll = (server) => {
  return () => {
    it(message({ name: "reviews" }).all, async () => {
      await review.createCollectionValid();
      const service = new Service(server, reviewApi().GET);
      const res = await service.getAll();
      expect(res.status).toBe(200);
      expect(res.body.count).toBe(2);
      expect(res.body.data.some((b) => b.title == "review1")).toBeTruthy();
      expect(res.body.data.some((b) => b.title == "review2")).toBeTruthy();
    });
  };
};
