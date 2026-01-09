const router = require('express').Router();

/**
 * Health check endpoint for monitoring and deployment verification
 * Returns 200 OK if the service is running and connected to MongoDB
 */
router.get('/', async (req, res) => {
  try {
    const mongoose = require('mongoose');

    // Check MongoDB connection
    const mongoStatus = mongoose.connection.readyState;
    const isConnected = mongoStatus === 1; // 1 = connected

    return res.status(isConnected ? 200 : 503).json({
      status: isConnected ? 'ok' : 'degraded',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '0.1.0',
      environment: process.env.NODE_ENV || 'development',
      mongodb: {
        connected: isConnected,
        state: mongoStatus,
      },
      uptime: process.uptime(),
    });
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: error.message,
    });
  }
});

module.exports = router;
