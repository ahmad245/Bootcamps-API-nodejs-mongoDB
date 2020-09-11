const Course = require("../models/Course");
const Bootcamp = require("../models/Bootcamp");

module.exports.getAll = async (req, res, next) => {
  let query;
  if (req.params.bootcampId) {
    const courses = await Course.find({ bootcamp: req.params.bootcampId });
    res
      .status(200)
      .json({ success: true, count: courses.length, data: courses });
  } else {
    res.status(200).json(res.advancedResults);
  }
};
module.exports.getById = async (req, res, next) => {
  const course = await Course.findById(req.params.id).cache({key:req.params.id});
  if (!course) {
    return res
      .status(400)
      .json({ success: false, error: "Resource not found" });
  }
  res.status(200).json({ success: true, data: course });
};

module.exports.post = async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user=req.user.id;
  const bootcamp = await Bootcamp.findById(req.params.bootcampId).cache({key:req.params.bootcampId});
  if (!bootcamp) {
    return res
      .status(404)
      .json({
        success: false,
        error: `No bootcamp with the id of ${req.params.bootcampId}`,
      });
  }
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== "admin") {
    return res
      .status(401)
      .json({
        success: false,
        error: `User ${req.user.id} is not authorized to add a course to bootcamp ${bootcamp._id}`,
      });
  }
  const course = await Course.create(req.body);
  res.status(201).json({ success: true, data: course });
};

module.exports.put = async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return res
      .status(404)
      .json({
        success: false,
        error: `No course with the id of ${req.params.id}`,
      });
  }

  // Make sure user is course owner
  if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
    return res
      .status(401)
      .json({
        success: false,
        error: `User ${req.user.id} is not authorized to update course ${course._id}`,
      });
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ data: course, success: true });
};

module.exports.remove = async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return res
      .status(404)
      .json({
        success: false,
        error: `No course with the id of ${req.params.id}`,
      });
  }

  // Make sure user is course owner
  if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
    return res
      .status(404)
      .json({
        success: false,
        error: `User ${req.user.id} is not authorized to delete course ${course._id}`,
      });
  }

  await course.remove();

  res.status(200).json({ data: course, success: true });
};
