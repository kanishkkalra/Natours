const express = require('express');
const app = express();
const tourController = require('./../controllers/tourController')

const router = express.Router();

// Param Middleware - Only works for specific parameters. In this case only works for id parameter
router.param('id',tourController.checkID);

router
 .route('/')
 .get(tourController.getAllTours)
 .post(tourController.checkBody, tourController.createTour);
 
router
 .route('/:id')
 .get(tourController.getTour)
 .patch(tourController.updateTour)
 .delete(tourController.deleteTour);  


module.exports = router;