const Availability = require('../models/availability');

const setExpertAvailability = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const { available_start_time, available_end_time, appointment_duration } = req.body;

    if (!sellerId) {
      return res.status(400).json({ message: 'Please provide the seller ID.' });
    }

    if (!available_start_time || !available_end_time || !appointment_duration) {
      return res.status(400).json({ message: 'Please provide all required fields: available_start_time, available_end_time, and appointment_duration.' });
    }

    const availability = new Availability({
      seller: sellerId,
      available_start_time: new Date(available_start_time),
      available_end_time: new Date(available_end_time),
      appointment_duration,
    });

    const savedAvailability = await availability.save();
    res.status(201).json(savedAvailability);
  } catch (error) {
    res.status(500).json({ message: 'Error setting availability: ' + error.message });
  }
};

module.exports = setExpertAvailability;