const { courseApi } = require("./courseApi");
const { message } = require("./../message");
const course = require("./course");

const { noObject,invalidId} = require("./../CommonFailTest");

const Service = require("./../service");

module.exports.getById = (server) => {
  const service = new Service(server, courseApi().GETBYID);
  return () => {
    const exec = async () => {
      return await service.getById();
    };
    it(message({ name: "course" }).one, async () => {
      const result = await course.create();

      service.setId(result.ops[0]._id);
      const res = await exec();
      expect(res.status).toBe(200);
      expect(res.body.data).toHaveProperty("title");
    });
    it( message({ name: "course" }).invalidId,invalidId(course, service, exec));

    it( message({ name: "course" }).noObject,noObject(course, service, exec) );
  };
};
