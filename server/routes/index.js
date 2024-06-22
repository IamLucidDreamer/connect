const express = require('express');
const authRoutes = require('./v1/authRoutes');

const router = express.Router();

// Version 1 routes
router.use('/v1/auth', authRoutes);


module.exports = router;
