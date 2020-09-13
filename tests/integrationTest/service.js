const request = require("supertest");
module.exports= class RequestService{
    constructor(server,path,obj={},token=''){
        this.server=server;
        this.obj=obj;
        this.token=token;
        this.path=path;
        this.id=1;

    }

    getAll(){
     return  request(this.server).get(this.path)
     .set("Authorization", `Bearer ${this.token}`);
      
    }
    getById(){
        return  request(this.server).get(this.path+this.getId())
        .set("Authorization", `Bearer ${this.token}`);  
    }
  async postValue(){
        return  await request(this.server).post(this.path)
        .set("Authorization", `Bearer ${this.getToken()}`)
        .send(this.getObj()); 
    }

    async putValue(){
      return await request(this.server).put(this.path+this.getId())
      .set("Authorization", `Bearer ${this.getToken()}`)
      .send(this.getObj()); 
    }
    async deleteValue(){
        return await request(this.server).delete(this.path+this.getId())
        .set("Authorization", `Bearer ${this.getToken()}`)
        .send(); 
      }


    getId(){
        return this.id;
    }
    setId(id){
        this.id=id;
    }
    getToken(){
        return this.token;
    }
    setToken(token){
        this.token=token;
    }
    getObj(){
        return this.obj;
    }
    setObj(obj){
        this.obj=obj;
    }

    getPath(){
        return this.path;
    }
    setPath(path){
        this.path=path;
    }

}