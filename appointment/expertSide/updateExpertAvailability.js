const Availability = require('../models/availability');

const updateExpertAvailability = async (req, res) => {
  try {
    const { availabilityId } = req.params;
    const { available_start_time, available_end_time, appointment_duration } = req.body;

    if (!availabilityId) {
      return res.status(400).json({ message: 'Please provide the availability ID.' });
    }

    const availability = await Availability.findById(availabilityId);

    if (!availability) {
      return res.status(404).json({ message: 'Availability not found.' });
    }

    if (available_start_time) {
      availability.available_start_time = new Date(available_start_time);
    }
    if (available_end_time) {
      availability.available_end_time = new Date(available_end_time);
    }
    if (appointment_duration) {
      availability.appointment_duration = appointment_duration;
    }

    const updatedAvailability = await availability.save();
    res.status(200).json(updatedAvailability);
  } catch (error) {
    res.status(500).json({ message: 'Error updating availability: ' + error.message });
  }
};

module.exports = updateExpertAvailability;