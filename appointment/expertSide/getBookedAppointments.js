const Availability = require('../models/availability');
const Appointment = require('../models/appointment');

const getBookedAppointments = async (req, res) => {
  try {
    const { sellerId } = req.params;

    if (!sellerId) {
      return res.status(400).json({ message: 'Please provide the seller ID.' });
    }

    const availability = await Availability.findOne({ seller: sellerId });

    if (!availability) {
      return res.status(404).json({ message: 'Availability not found.' });
    }

    const bookedAppointments = await Appointment.find({
      seller: sellerId,
      start_time: { $gte: availability.available_start_time },
      end_time: { $lte: availability.available_end_time },
    }).populate('user', 'name email');

    res.status(200).json(bookedAppointments);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving booked appointments: ' + error.message });
  }
};

module.exports = getBookedAppointments;