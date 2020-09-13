const Bootcamp = require("./../models/Bootcamp");
const geocoder = require("../utils/geocoder");

module.exports.getAll = async (req, res, next) => {
    res.status(200).json(res.advancedResults);
    
};
module.exports.getById = async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id).cache({key:req.params.id});
  if (!bootcamp) {
    return res.status(404).json({ success: false ,error: "Resource not found"});
  }
  res.status(200).json({ data: bootcamp, success: true });
};
module.exports.post = async (req, res, next) => {
 // Add user to req,body
 req.body.user = req.user.id;

 // Check for published bootcamp
 const publishedBootcamp = await Bootcamp.findOne({ user: req.user.id }).cache({key:req.user.id});

 // If the user is not an admin, they can only add one bootcamp
 if (publishedBootcamp && req.user.role !== 'admin') {
   return  res.status(400).json({ success: false,error:`The user with ID ${req.user.id} has already published a bootcamp` });
 }

 const  bootcamp = await Bootcamp.create(req.body);
  res.status(201).json({ data: bootcamp, success: true });
};
module.exports.put = async (req, res, next) => {

  let bootcamp=await Bootcamp.findById(req.params.id);
  
  
  if (!bootcamp) {
    return res.status(404).json({ success: false,error:`Bootcamp not found with id of ${req.params.id}` });
  }

  // If the user is not an admin, they can only add one bootcamp
 if (bootcamp.user.toString() !== req.user.id  && req.user.role !== 'admin') {
  return  res.status(403).json({ success: false,error:`User ${req.user.id} is not authorized to update this bootcamp` });
}


   bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  
  res.status(200).json({ data: bootcamp, success: true });
};
module.exports.remove = async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  if (!bootcamp) {
    return res.status(404).json({ success: false,error:`Bootcamp not found with id of ${req.params.id}` });
  }

  // If the user is not an admin, they can only add one bootcamp
 if (bootcamp.user.toString() !== req.user.id  && req.user.role !== 'admin') {
  return  res.status(403).json({ success: false,error:`User ${req.user.id} is not authorized to delete this bootcamp` });
}
  await bootcamp.remove();
 
  
  res.status(200).json({ data: bootcamp, success: true });
};

module.exports.getByRadius = async (req, res, next) => {
  const { distance, zipcode } = req.params;
  const radiusEarth = 6371; // km (mil 3 958,8)
  const radius = distance / radiusEarth;

  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const long = loc[0].longitude;

  const bootcamps = await Bootcamp.find({
    location: {
      $geoWithin: { $centerSphere: [[long, lat], radius] },
    },
  });

  res.status(200).json({ data: bootcamps, total: bootcamps.length });
};
