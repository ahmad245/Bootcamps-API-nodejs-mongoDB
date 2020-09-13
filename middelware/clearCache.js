const {clearHash}=require('../sevise/cache');
module.exports.clearCache=(key)=>async (req,res,next)=>{ 
 await next();
 clearHash(key);
 if(req.method=='PUT' || req.method=='DELETE'){
    clearHash(req.params.id);
    if(req.params.bootcampId){
        clearHash(req.params.bootcampId);
        
    }
 }
}