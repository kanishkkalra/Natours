const mongoose = require('mongoose')

// Tour Schema
const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'A tour must have a name'], // The message is showed in case its left empty
        unique: true
    },
    duration: {
        type: Number,
        required: [true,"A tour must have a duration"]
    },
    maxGroupSize: {
        type: Number,
        required: [true, "A tour must have a group size"]
    },
    difficulty: {
        type: String,
        required:[true, "A tour must have a difficulty"]
    },
    ratingsAvergae: {
        type: Number,
        default: 4.5 // Will automatically set to 4.5 if any rating is not given
    },
    ratingsQuantity:{
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, 'A tour must have a price']
    },
    priceDiscount: Number,
    summary: {
        type:String,
        trim: true ///Will remove all the whitespace from the beginning and the end
    },
    description: {
        type:String,
        trim: true,
        required: [true, "A tour must have a description."]
    },
    imageCover:{
        type: String,
        required: [true, "A tour must have a cover image"]
    },
    images: [String], // Type is an Array of String
    createdAt:{
        type: Date,
        default: Date.now() // Will give us a time stamp of the current date and time
    },
    startDates: [Date],
    
})

// Tour Model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;