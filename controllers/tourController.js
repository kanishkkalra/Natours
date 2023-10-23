const fs = require('fs')
const Tour = require("../models/tourModel")


exports.getAllTours = async (req,res) => {

    try {
        const tours = await Tour.find();
    
        res.status(200).json({
            status: "Success",
            result: tours.length,
            data: {
                tours
            }
        })
    } catch(err) {
        res.status(404).json({
            status: "Fail",
            message: err
        })
    }
    
}

exports.getTour = async (req,res) => {
    try {
        const tour = await Tour.findById(req.params.id); 
        res.status(200).json({
            status: "Success",
            data: {
                tour
            }
        })
    } catch(err) {
        res.status(404).json({
            status:"Fail",
            message: err
        })
    }
}

exports.createTour = async (req,res) => {

    try {
        const newTour = await Tour.create(req.body);

        res.status(201).json({
            status: 'Success',
            data: {
                tour: newTour
            }
        })
    } catch (err) {
        res.status(400).json({
            status: "Fail",
            message: "Invalid Data Sent"
        })
    }
    
}

exports.updateTour = async (req,res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // With new in the 3rd argument, the new updated document will be returned
            runValidators:true // Run the validation check for the updated document as well
        }); 
        res.status(200).json({
            status: "Success",
            data: {
                tour
            }
        })
    } catch(err){
        res.status(404).json({
            status: "Fail",
            message: err
        })
    }
    
}

exports.deleteTour = async (req,res) => {
    try{
        const tour = await Tour.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "SuccessFully Deleted",
            data:{
                tour
            } 
        })
    } catch (err) {
        res.status(404).json({
            status: "Fail",
            message: err
        })
    }
    
}