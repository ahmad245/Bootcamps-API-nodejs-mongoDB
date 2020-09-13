const { reviewApi } = require("./reviewApi");
const { message } = require("./../message");
const review = require("./review");

const { noObject,invalidId} = require("./../CommonFailTest");

const Service = require("./../service");

module.exports.getById = (server) => {
  const service = new Service(server, reviewApi().GETBYID);
  return () => {
    const exec = async () => {
      return await service.getById();
    };
    it(message({ name: "review" }).one, async () => {
      const result = await review.create();

      service.setId(result.ops[0]._id);
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty("title");
    });
    it( message({ name: "review" }).invalidId,invalidId(review, service, exec));

    it( message({ name: "review" }).noObject,noObject(review, service, exec) );
  };
};
