const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})

const app = require('./app')

const DB = process.env.DATABASE.replace('<PASSWORD>',process.env.DATABASE_PASSWORD);

mongoose.connect(DB,{
    useNewUrlParser: true
}).then(() => {console.log("DB connection Successful")});

// Tour Schema
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'A tour must have a name'], // The message is showed in case its left empty
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5 // Will automatically set to 4.5 if any rating is not given
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    }
})

// Tour Model
const Tour = mongoose.model('Tour', tourSchema);

// Creating a new document using the tour model
const testTour = new Tour({
    name: 'The Park Camper',
    price: 997
});

// Saving the new document
testTour.save().then(doc => {
    console.log(doc)
}).catch(err => {
    console.log("ERROR!!!!", err)
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});