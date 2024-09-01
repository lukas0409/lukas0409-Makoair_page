const db = require('../config/db');

const Flight = {
  getAllFlights: (callback) => {
    const query = 'SELECT * FROM flights';
    db.query(query, callback);
  },

  getFlightById: (id, callback) => {
    const query = 'SELECT * FROM flights WHERE id = ?';
    db.query(query, [id], callback);
  }
};

module.exports = Flight;
