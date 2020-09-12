const userModel=require('./user/UserModel');

module.exports= class Repository{
    constructor(model,validCollection){
        this.model=model;
        this.prop='';
        this.validCollection=validCollection;
        this.user=null;
        this.token='';
    }
    setProp(prop){
        this.prop=prop;
     }
   async  createCollectionValid(){
      await this.model.collection.insertMany(this.getCollecttionValid());
     }
     async  create(){
      return    await this.model.collection.insertOne(this.getCollecttionValid()[0])
         //.create(this.getCollecttionValid()[0]);
        }

        async createBootcampValidWithUser(user=null){
      
            return await this.model.collection.insertOne(this.validCollection({user})[0]);
        }  
    async remove(){
        await this.model.collection.dropIndexes();
        await  this.model.collection.remove({});
     }
 
    async getUserToken(email=null){
        const {token,user}=await new userModel().getUser(email);
        this.user=user;
        this.token=token;
        return {token,user};
     }
 
     getCollecttionValid(){
         return this.validCollection();
     }
}