const mongoose=require('mongoose');
const redis=require('redis');
const utile=require('util');

const redisUrl=process.env.REDISURL;
const client=redis.createClient(redisUrl);
 client.hget=utile.promisify(client.hget);
 //client.hset=utile.promisify(client.hset);

const exec=mongoose.Query.prototype.exec;


mongoose.Query.prototype.cache=function(option={}){
 this.useCache=true;
 this.hashKey=JSON.stringify(option.key || ''); 
 return this;
}

mongoose.Query.prototype.exec=async function(){
    
  if(!this.useCache){
        return exec.apply(this,arguments);
     }

  const key=JSON.stringify(Object.assign({},this.getQuery(),this.getOptions(),{collection:this.mongooseCollection.name}));
  const cache=await client.hget(this.hashKey,key);
  
  
  if(cache){  
    const doc=JSON.parse(cache);
    return Array.isArray(doc)
      ?doc.map(d=>new this.model(d))
      :new this.model(doc);
  } 
  const result=await exec.apply(this,arguments);
    client.hset(this.hashKey,key,JSON.stringify(result))
    client.expire(this.hashKey,2000);
   return exec.apply(this,arguments);
}
module.exports = {
  
    clearHash(hashKey) {
      client.del(JSON.stringify(hashKey));
    }
  };