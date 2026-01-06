const express = require('express');
const router = express.Router();

// GET /api/users - list users (placeholder)
router.get('/', (req, res) => {
  res.json({ message: 'List users' });
});

module.exports = router;
