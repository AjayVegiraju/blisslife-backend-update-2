const Availability = require('../models/availability');
const Appointment = require('../models/appointment');

const getAllAppointments = async (req, res) => {
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
    }).populate('user', 'name email');

    const availableTimeSlots = []; // You can calculate available time slots based on the availability and bookedAppointments

    res.status(200).json({ bookedAppointments, availableTimeSlots });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving all appointments: ' + error.message });
  }
};

module.exports = getAllAppointments;