const Flight = require('../models/flightModel');

const flightController = {
  getAllFlights: (req, res) => {
    Flight.getAllFlights((err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json(results);
    });
  },

  getFlightById: (req, res) => {
    const { id } = req.params;
    Flight.getFlightById(id, (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: 'Flight not found' });
      }
      res.json(result[0]);
    });
  }
};

module.exports = flightController;
