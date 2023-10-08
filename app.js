const fs = require('fs')
const express = require('express');
const app = express();
const morgan = require("morgan");

// Middleware
app.use(express.json());


app.use(morgan('dev'));

// Creating our own middleware
app.use((req,res, next) => {
    console.log("Hello from the middleware");
    next();
}); 

app.use((req, res,next) => {
    req.requestTime = new Date().toISOString();
    next();
})

// app.get('/', (req, res) => {
//     res.status(200).json(
//         {
//             message: "Hello from the server side!",
//             app: "natours"
//         });
// });

// app.post('/', (req,res) => {
//     res.send("You can post to this URL");
// })


/////////////////////////////// TOURS FUNCTIONS
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`))

const getAllTours = (req,res) => {
    
    res.status(200).json({
        status: "Success",
        requestedTime: req.requestTime,
        results: tours.length,
        data: {
            tours
        }
    })
}

const getTour = (req,res) => {
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

const createTour = (req,res) => {
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

const updateTour = (req,res) => {
    if(req.params.id * 1 > tours.length){
        res.status(404).json({
            status : "Fail",
            message : "Not Found"
        })
    } else {
        res.status(200).json({
            status: "Success",
            data : {
                tour : "<Updated Tour Here...>"
            }
        })
    }
}

const deleteTour = (req,res) => {
    if(req.params.id *1 > tours.length){
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    } else {
        return res.status(204).json({
            status: "Success",
            data: null
        })
    }
}

//////////////////////////////////// USER FUNCTIONS

const getAllUsers = (req,res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined"
    })
}

const createUser = (req,res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined"
    })
}

const getUser = (req,res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined"
    })
}

const updateUser = (req,res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined"
    })
}

const deleteUser = (req,res) => {
    res.status(500).json({
        status: "error",
        message: "This route is not yet defined"
    })
}

// app.get("/api/v1/tours", getAllTours);
// app.get("/api/v1/tours/:id?", getTour);
// app.post("/api/v1/tours", createTour);
// app.patch("/api/v1/tours/:id", updateTour);
// app.delete("/api/v1/tours/:id",deleteTour);

///////// TOURS ROUTES
app
.route("/api/v1/tours")
.get(getAllTours)
.post(createTour);

app
.route("/api/v1/tours/:id?")
.get(getTour)
.patch(updateTour)
.delete(deleteTour);

/////////  USER ROUTES
app
.route("/api/v1/users")
.get(getAllUsers)
.post(createUser);

app
.route("/api/v1/users/:id")
.get(getUser)
.patch(updateUser)
.delete(deleteUser);

const port = 3000;

app.listen(port, () => {
    console.log(`App running on port ${port}...`);
});

