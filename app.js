const fs = require('fs')
const express = require('express');
const app = express();
const morgan = require("morgan");

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

// Middleware
app.use(express.json());

app.use(express.static(`${__dirname}/public`))

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}


// Creating our own middleware
app.use((req,res, next) => {
    console.log("Hello from the middleware");
    next();
}); 

app.use((req, res,next) => {
    req.requestTime = new Date().toISOString();
    next();
})


// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id?", getTour);
// app.post("/api/v1/tours", createTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id",deleteTour);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;

