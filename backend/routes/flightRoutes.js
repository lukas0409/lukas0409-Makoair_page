const express = require('express');
const flightController = require('../controllers/flightController');
const router = express.Router();

router.get('/', flightController.getAllFlights);
router.get('/:id', flightController.getFlightById);

module.exports = router;
