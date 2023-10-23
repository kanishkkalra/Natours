const mongoose = require('mongoose')

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

module.exports = Tour;