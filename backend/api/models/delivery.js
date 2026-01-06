const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema(
  {
    trackingId: { type: String, required: true, unique: true },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['Pending', 'In Transit', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
    location: { type: String },
    expectedDate: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Delivery || mongoose.model('Delivery', DeliverySchema);
