const mongoose = require('mongoose');
const logger = require('../utils/logger');
const { MONGO_CONNECTED, MONGO_ERROR } = require('./constants');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        logger.info(`${MONGO_CONNECTED}: ${conn.connection.host}`);
    } catch (error) {
        logger.error(`${MONGO_ERROR}: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;

