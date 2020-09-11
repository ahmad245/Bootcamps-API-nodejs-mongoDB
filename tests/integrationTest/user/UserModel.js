jest.setTimeout(5000000);
const mongoose=require('mongoose');
const User=require('../../../models/User');

const {user}=require('./seed');

class UserModel{
    constructor(){}

  async  getUser(){
       const user =await User.create(this.getValidUser());
      const  token = user.getSignedJwtToken();
      return {token,user};
    }

    getValidUser(){
        return user();
    }
}

module.exports=UserModel;