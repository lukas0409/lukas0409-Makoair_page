const express = require('express');
const reservationController = require('../controllers/reservationController');
const router = express.Router();

router.post('/', reservationController.createReservation);
router.get('/:id', reservationController.getReservationById);
router.get('/user/:userId', reservationController.getReservationsByUserId);

module.exports = router;
