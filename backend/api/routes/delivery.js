const express = require('express');
const router = express.Router();

// GET /api/deliveries - list deliveries (placeholder)
router.get('/', (req, res) => {
  res.json({ message: 'List deliveries' });
});

module.exports = router;
