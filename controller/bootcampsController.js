const Bootcamp=require('./../models/Bootcamp');
const geocoder=require('../utils/geocoder');

module.exports.getAll=async(req,res,next)=>{
    const queryReq={...req.query};
   
   let  queryString=JSON.stringify(queryReq);
    console.log(queryString,queryReq);
    const query=await Bootcamp.find();
    res.status(200).json({data:query,total:query.length});
}
module.exports.getBYId=async(req,res,next)=>{
    const bootcamp=await Bootcamp.findById(req.params.id);
    if(!bootcamp){
        return res.status(400).json({success:false});
    }
    res.status(200).json({data:bootcamp,success:true});
}
module.exports.post=async(req,res,next)=>{
  bootcamp= await Bootcamp.create(req.body);
    res.status(201).json({data:bootcamp,success:true});
}
module.exports.put=async(req,res,next)=>{
    const bootcamp=await Bootcamp.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true
    })
    if(!bootcamp){
        return res.status(400).json({success:false});
    }
    res.status(200).json({data:bootcamp,success:true});
}
module.exports.remove=async(req,res,next)=>{
    const bootcamp=await Bootcamp.findByIdAndRemove(req.params.id);
    if(!bootcamp){
        return res.status(400).json({success:false});
    }
    res.status(200).json({data:bootcamp,success:true});
}

module.exports.getByRadius=async(req,res,next)=>{

    const {distance,zipcode}=req.params;
    const radiusEarth=6371;// km (mil 3 958,8)
    const radius=distance / radiusEarth;

    const loc = await geocoder.geocode(zipcode);
    const lat=loc[0].latitude;
    const long=loc[0].longitude;

     const bootcamps=await Bootcamp.find({
         location: {
            $geoWithin: { $centerSphere: [ [ long, lat ], radius ] }
         }
     })

     res.status(200).json({data:bootcamps,total:bootcamps.length});




}