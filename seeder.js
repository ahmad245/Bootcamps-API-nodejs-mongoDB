const fs=require('fs');
const mongoose=require('mongoose');
const dotenv=require('dotenv');

dotenv.config({path:'./config/config.env'});
const BootCamp=require('./models/Bootcamp');

mongoose.connect(process.env.MONGO_URI,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology: true
})

const BootCamps=JSON.parse(fs.readFileSync(__dirname+`/_data/bootcamps.json`).toString('utf-8'));

const dataInset=async()=>{
    try {
        await BootCamp.create(BootCamps);
        process.exit();
    } catch (error) {
        
    }
}

const dataDelete=async()=>{
    try {
        await BootCamp.deleteMany();
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

