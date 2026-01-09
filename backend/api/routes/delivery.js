const express = require('express');
const router = express.Router();
const Delivery = require('../models/delivery');
const Product = require('../models/product');
const User = require('../models/user');

function generateTrackingId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

// GET /api/deliveries
router.get('/', async (req, res) => {
  try {
    const deliveries = await Delivery.find().populate('product user').limit(200).lean();
    return res.json(deliveries);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// GET /api/deliveries/:id
router.get('/:id', async (req, res) => {
  try {
    const d = await Delivery.findById(req.params.id).populate('product user').lean();
    if (!d) {
      return res.status(404).json({ error: 'Delivery not found' });
    }
    return res.json(d);
  } catch {
    return res.status(400).json({ error: 'Invalid delivery id' });
  }
});

// POST /api/deliveries
router.post('/', async (req, res) => {
  try {
    const { product: productId, user: userId, trackingId } = req.body;

    // basic existence checks
    const product = await Product.findById(productId);
    const user = await User.findById(userId);
    if (!product) {
      return res.status(400).json({ error: 'Invalid product id' });
    }
    if (!user) {
      return res.status(400).json({ error: 'Invalid user id' });
    }

    const tId = trackingId || generateTrackingId();
    const d = new Delivery({ ...req.body, trackingId: tId });
    await d.save();
    return res.status(201).json(await d.populate('product user'));
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// PUT /api/deliveries/:id
router.put('/:id', async (req, res) => {
  try {
    const delivery = await Delivery.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('product user');
    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }
    return res.json(delivery);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// DELETE /api/deliveries/:id
router.delete('/:id', async (req, res) => {
  try {
    const d = await Delivery.findByIdAndDelete(req.params.id);
    if (!d) {
      return res.status(404).json({ error: 'Delivery not found' });
    }
    return res.status(204).end();
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

module.exports = router;
