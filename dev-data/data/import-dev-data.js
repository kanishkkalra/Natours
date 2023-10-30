////// FILE CREATED TO ADD AND DELETE ALL DATA FROM JSON FILE TO DATABASE

const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})
const Tour = require("./../../models/tourModel")

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose.connect(DB,{
    useNewUrlParser: true
}).then(() => {console.log("DB connection Successful")});


// READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8'));

// IMPORT DATA INTO DB
const importData = async () => {
    try{
        await Tour.create(tours);
        console.log('Data successfully loaded!');
        process.exit();
    } catch (err){
        console.log(err)
    }
};

// DELETE ALL DATA FROM DATABASE
const deleteData = async () => {
    try{
        await Tour.deleteMany();
        console.log('Data successfully deleted!');
        process.exit();
    } catch (err){
        console.log(err)
    }
}

// node dev-data/data/import-dev-data.js --import
if(process.argv[2] == "--import"){
    importData();
}

// node dev-data/data/import-dev-data.js --delete
if(process.argv[2] == "--delete"){
    deleteData();
}
