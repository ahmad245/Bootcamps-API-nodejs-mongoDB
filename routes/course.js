const express = require("express");
const {
  getAll,
  getById,
  post,
  put,
  remove,
} = require("./../controller/coursesController");

const advancedResults=require('./../middelware/advancedResults');
const Course=require('../models/Course');

const {protect,authorize}=require('../middelware/auth');


const route = express.Router({mergeParams:true});

route.route("/").get(advancedResults(Course,{path:'bootcamp',select:'name description'}), getAll);
route.route("/:bootcampId").post(protect,authorize('admin','publisher'),post);

route.route("/:id").get(getById).put(protect,authorize('admin','publisher'),put).delete(protect,authorize('admin','publisher'),remove);

module.exports = route;
