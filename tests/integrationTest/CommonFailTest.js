module.exports.noPermission = (model, service, exec) => {
  return async () => {
    const userToken = await model.getUserToken("ahmad@gmail.com");
    service.setToken(userToken.token);
    // service.setObj(obj);
    const res = await exec();
    expect(res.body.success).toBeFalsy();
    expect(res.status).toBe(403);
  };
};

module.exports.userNotlogin = (model, service, exec) => {
  return async () => {
    token = "";
    service.setToken(token);
    const res = await exec();
    expect(res.status).toBe(401);
    expect(res.body.success).toBeFalsy();
  };
};

module.exports.invalidId = (model, service, exec) => {
  return async () => {
       service.setId(1);
        const res = await exec();
        expect(res.status).toBe(404);
  };
};
module.exports.noObject = (model, service, exec) => {
    return async () => {
        const id =model.getObjectId()
        service.setId(id);
        const res = await exec();
        expect(res.body.success).toBeFalsy();
        expect(res.status).toBe(404);
    };
  };
  