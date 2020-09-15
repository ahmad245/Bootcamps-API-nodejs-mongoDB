jest.setTimeout(5000000);
const mongoose=require('mongoose');
const User=require('../../../models/User');

const {user}=require('./seed');

class UserModel{
    constructor(){}

  async  getUser(email=null){
       const user =await User.create(this.getValidUser(email));
      const  token = user.getSignedJwtToken();
      return {token,user};
    }

    async create(){
    return  await User.create(this.getValidUser());
    }

    getValidUser(email){
        return user({email});
    }
}

module.exports=UserModel;