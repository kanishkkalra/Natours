const fs = require('fs')

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.checkBody = (req,res,next) => {
    
    if(!req.body.price || !req.body.name){
        return res.status(400).json({
            status:"fail",
            message: "Missing name or price"
        })
    } 
    
    next();

};

// Middleware to check if ID is valid or not
exports.checkID = (req,res,next,val) => {
    if(req.params.id * 1 > tours.length){
        return res.status(404).json({
            status : "Fail",
            message : "Not Found"
        })
    }
    console.log(`The ID is: ${val}`)
    next();
}

exports.getAllTours = (req,res) => {
    
    res.status(200).json({
        status: "Success",
        requestedTime: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    })
}

exports.getTour = (req,res) => {
    const id = req.params.id * 1; // Will convert the id to number

    const tour = tours.find(el => el.id === id);

    if(!tour) {
        return res.status(404).json({
            status: "Fail",
            message: "Invalid ID"
        })
    }

    return res.status(200).json({
        status: 'Success',
        data : {
            tour
        }
    })
}

exports.createTour = (req,res) => {
    const newId = tours[tours.length -1].id + 1;
    const newTour = Object.assign({id:newId}, req.body);

    tours.push(newTour)
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: "Success",
            data: {
                tour: newTour
            }
        })
    })
}

exports.updateTour = (req,res) => {
    res.status(200).json({
        status: "Success",
        data : {
            tour : "<Updated Tour Here...>"
        }
    })
    
}

exports.deleteTour = (req,res) => {
    return res.status(204).json({
        status: "Success",
        data: null
    })
    
}