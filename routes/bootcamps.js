const express = require("express");
const {
  getAll,
  getById,
  post,
  put,
  remove,
  getByRadius,
} = require("./../controller/bootcampsController");

const courseRoute=require('./course');
const reviewRoute=require('./review');

const {protect,authorize}=require('../middelware/auth');

const advancedResults=require('./../middelware/advancedResults');
const Bootcamp=require('../models/Bootcamp');

const {clearCache}=require('../middelware/clearCache');

const route = express.Router();

route.use('/:bootcampId/courses',courseRoute);
route.use('/:bootcampId/reviews',reviewRoute);

route.route("/radius/:zipcode/:distance").get(getByRadius);

route.route("/")
   .get(advancedResults(Bootcamp,'courses'),getAll)
   .post(protect,authorize('admin','publisher'),clearCache('Bootcamp') ,post);

route.route("/:id")
  .get(getById)
  .put(protect,authorize('admin','publisher'),clearCache('Bootcamp'),put)
  .delete(protect,authorize('admin','publisher'),clearCache('Bootcamp'),remove);

module.exports = route;
