const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// GET /api/products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().limit(200).lean();
    return res.json(products);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    if (!product) {return res.status(404).json({ error: 'Product not found' });}
    return res.json(product);
  } catch {
    return res.status(400).json({ error: 'Invalid product id' });
  }
});

// POST /api/products
router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    return res.status(201).json(product);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// PUT /api/products/:id
router.put('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {return res.status(404).json({ error: 'Product not found' });}
    return res.json(product);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// DELETE /api/products/:id
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {return res.status(404).json({ error: 'Product not found' });}
    return res.status(204).end();
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;
