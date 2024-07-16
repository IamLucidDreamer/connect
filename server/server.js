const fs = require('fs');
const path = require('path');

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const logger = require('./utils/logger');
const { SERVER_RUNNING } = require('./config/constants');
const routes = require('./routes');

dotenv.config();

// DB Connection
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
    origin: ['http://localhost:3000', "https://new.d1ivogcauayjj5.amplifyapp.com" ], // Allow only this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', routes);

// Server Status
app.get('/api/status', (req, res) => {
    logger.info('Server Status Requested');
    res.send('Backend Server is Up and Running!');
});

app.get('/api/v1/status', (req, res) => {
    logger.info('Server Status Page Requested');
    res.send(fs.readFileSync(path.resolve(__dirname, "./templates/statusPage.html"), 'utf8'));
});


app.listen( 8080, () => {
    logger.info(`${SERVER_RUNNING} ${PORT}`);
});
