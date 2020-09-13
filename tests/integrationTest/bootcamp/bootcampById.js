const { bootcampApi } = require("./bootcampApi");
const { message } = require("./../message");
const bootcamp = require("./bootcamp");

const { noObject,invalidId} = require("./../CommonFailTest");

const Service = require("./../service");

module.exports.getById = (server) => {
  const service = new Service(server, bootcampApi().GETBYID);
  return () => {
    const exec = async () => {
      return await service.getById();
    };
    it(message({ name: "bootcamp" }).one, async () => {
      const result = await bootcamp.create();

      service.setId(result.ops[0]._id);
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty("name");
    });
    it( message({ name: "bootcamp" }).invalidId,invalidId(bootcamp, service, exec));

    it( message({ name: "bootcamp" }).noObject,noObject(bootcamp, service, exec) );
  };
};
