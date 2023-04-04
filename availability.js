const mongoose = require('mongoose');

const availabilitySchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
    required: true,
  },
  available_start_time: {
    type: Date,
    required: true,
  },
  available_end_time: {
    type: Date,
    required: true,
  },
  appointment_duration: {
    type: Number, // Duration in minutes
    required: true,
  },
});

module.exports = mongoose.model('Availability', availabilitySchema);