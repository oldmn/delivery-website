const express = require('express');
const router = express.Router();

// GET /api/products - list products (placeholder)
router.get('/', (req, res) => {
  res.json({ message: 'List products' });
});

module.exports = router;
