const fs=require('fs');
const mongoose=require('mongoose');
const dotenv=require('dotenv');

dotenv.config({path:'./config/config.env'});
const BootCamp=require('./models/Bootcamp');
const Course=require('./models/Course');

mongoose.connect(process.env.MONGO_URI,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology: true
})

const BootCamps=JSON.parse(fs.readFileSync(__dirname+`/_data/bootcamps.json`).toString('utf-8'));
const Courses=JSON.parse(fs.readFileSync(__dirname+`/_data/courses.json`).toString('utf-8'));

const dataInset=async()=>{
    try {
        await BootCamp.create(BootCamps);
        await Course.create(Courses);
        process.exit();
    } catch (error) {
        
    }
}

const dataDelete=async()=>{
    try {
        await BootCamp.deleteMany();
        await Course.deleteMany();
        process.exit();
    } catch (error) {
        
    }
}

if(process.argv[2]=='-i'){
    dataInset();
}
else if (process.argv[2]=='-d') {
    dataDelete();
}

