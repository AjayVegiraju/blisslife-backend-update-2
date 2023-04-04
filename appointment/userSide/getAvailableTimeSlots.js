const Availability = require('../models/availability');
const Appointment = require('../models/appointment');

const generateTimeSlots = (start_time, end_time, duration) => {
  const slots = [];
  const startTime = new Date(start_time);
  const endTime = new Date(end_time);

  while (startTime < endTime) {
    const slot_start = new Date(startTime);
    startTime.setMinutes(startTime.getMinutes() + duration);
    const slot_end = new Date(startTime);

    if (slot_end <= endTime) {
      slots.push({ start_time: slot_start, end_time: slot_end });
    }
  }

  return slots;
};

const getAvailableTimeSlots = async (req, res) => {
  try {
    const { sellerId } = req.params;

    if (!sellerId) {
      return res.status(400).json({ message: 'Please provide the seller ID.' });
    }

    const availability = await Availability.findOne({ seller: sellerId });

    if (!availability) {
      return res.status(404).json({ message: 'Availability not found.' });
    }

    const timeSlots = generateTimeSlots(availability.available_start_time, availability.available_end_time, availability.appointment_duration);

    // Remove booked slots
    const bookedAppointments = await Appointment.find({ seller: sellerId, start_time: { $gte: availability.available_start_time }, end_time: { $lte: availability.available_end_time } });

    const availableSlots = timeSlots.filter(slot => !bookedAppointments.some(appointment => appointment.start_time >= slot.start_time && appointment.end_time <= slot.end_time));

    res.status(200).json(availableSlots);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving available time slots: ' + error.message });
  }
};

module.exports = getAvailableTimeSlots;