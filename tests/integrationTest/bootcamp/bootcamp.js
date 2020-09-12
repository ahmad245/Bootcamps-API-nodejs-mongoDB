jest.setTimeout(5000000);
const mongoose=require('mongoose');
const Bootcamp=require('../../../models/Bootcamp');
const {validCollection,bootcamp}=require('./seed');
const userModel=require('./../user/UserModel');
const Repository=require('./../Repository');
class BootcampModel extends Repository{
  
    getBootcampValid(){
      return  bootcamp();
  }

    getInvalidBcName(){

       return bootcamp({name:this.prop});
    }
    getInvalidBcDescription(){
        return bootcamp({description:this.prop});
     }
     getInvalidBcWebsite(){
        return bootcamp({website:this.prop});
     }
     getInvalidBcPhone(){
        return bootcamp({phone:this.prop});
     }
     getInvalidBcEmail(){
        return bootcamp({email:this.prop});
     }
     getInvalidBcAddress(){
        return bootcamp({address:this.prop});
     }
     getInvalidBcCareers(){
        return bootcamp({careers:this.prop});
     }
    

}

module.exports=new BootcampModel(Bootcamp,validCollection);
// constructor(name,description,website,phone,email,address,careers,housing,jobAssistance,jobGuarantee,acceptGi){
//     this.name=name;
//     this.description=description;
//     this.website=website;
//     this.phone=phone;
//     this.email=email;
//     this.address=address;
//     this.careers=careers;
//     this.housing=housing;
//     this.jobAssistance=jobAssistance;
//     this.jobGuarantee=jobGuarantee;
//     this.acceptGi=acceptGi;
// }