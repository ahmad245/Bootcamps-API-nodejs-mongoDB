const mongoose=require('mongoose');
const Bootcamp=require('./Bootcamp');
const couresSchema=new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters'],
        minlength:[3, 'Name can not be less than 3 characters'],
        required: [true, 'Please add a course title']
      },
      description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Description can not be more than 500 characters'],
        minlength:[3, 'Description can not be less than 3 characters'],
        required: [true, 'Please add a description']
      },
      weeks: {
        type: String,
        required: [true, 'Please add number of weeks']
      },
      tuition: {
        type: Number,
        required: [true, 'Please add a tuition cost']
      },
      minimumSkill: {
        type: String,
        required: [true, 'Please add a minimum skill'],
        enum: ['beginner', 'intermediate', 'advanced']
      },
      scholarshipAvailable: {
        type: Boolean,
        default: false
      },
      createdAt: {
        type: Date,
        default: Date.now
      },
      bootcamp:{
          type:mongoose.Schema.ObjectId,
          ref:'Bootcamp',
          required:true
      },
      user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
      }

})

couresSchema.statics.getAverageCost=async function(bootcampId){
  const obj=await this.aggregate([
   {
     $match:{bootcamp:bootcampId}
   },
   {
     $group:{
      _id: '$bootcamp',
      averageCost: { $avg: '$tuition' }
     }
   }
  ])
  try {
    if (obj[0]) {
         await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
           averageCost:Math.ceil(obj[0].averageCost / 10) * 10,
         });
       } else {
         await this.model("Bootcamp").findByIdAndUpdate(bootcampId, {
           averageCost: undefined,
         });
       }
     } catch (err) {
       console.error(err);
     }
}

// Call getAverageCost after save
couresSchema.post('save', async function() {
  await this.constructor.getAverageCost(this.bootcamp);
});

// Call getAverageCost after remove
couresSchema.post('remove', async function () {
  await this.constructor.getAverageCost(this.bootcamp);
});





const Course=mongoose.model('Course',couresSchema);

module.exports=Course;