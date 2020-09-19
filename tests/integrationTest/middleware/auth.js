const mongoose = require("mongoose");
const UserModel = require("../user/UserModel");
const User = require("../../../models/User");
const { protect } = require("../../../middelware/auth");
module.exports.auth = (server) => {
  return () => {
  it("should populate req.user with the payload of a valid JWT", async () => {
    const { user, token } = await new UserModel().getUser();

    const req = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const res = {};
    res.status = () => res;
    res.json = () => res;

    const next = jest.fn();

    await protect(req, res, next);

    expect(req.user.id).toBe(user.id);
  });

  }
}