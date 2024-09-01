const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const flightRoutes = require('./routes/flightRoutes');
const reservationRoutes = require('./routes/reservationRoutes');

const app = express();

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());

// 라우트 설정
app.use('/api/flights', flightRoutes);
app.use('/api/reservations', reservationRoutes);

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
