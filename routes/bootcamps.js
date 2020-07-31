const express = require("express");
const {
  getAll,
  getBYId,
  post,
  put,
  remove,
  getByRadius,
} = require("./../controller/bootcampsController");

const route = express.Router();

route.route("/radius/:zipcode/:distance").get(getByRadius);

route.route("/").get(getAll).post(post);

route.route("/:id").get(getBYId).put(put).delete(remove);

module.exports = route;
