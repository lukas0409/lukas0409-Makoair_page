const Reservation = require('../models/reservationModel');

const reservationController = {
  createReservation: (req, res) => {
    const { user_id, flight_id, seat_id, reservation_number } = req.body;
    const reservationData = { user_id, flight_id, seat_id, reservation_number };

    Reservation.createReservation(reservationData, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ message: 'Reservation created', id: result.insertId });
    });
  },

  getReservationById: (req, res) => {
    const { id } = req.params;

    Reservation.getReservationById(id, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: 'Reservation not found' });
      }
      res.json(result[0]);
    });
  },

  getReservationsByUserId: (req, res) => {
    const { userId } = req.params;

    Reservation.getReservationsByUserId(userId, (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  }
};

module.exports = reservationController;
