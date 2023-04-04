const Appointment = require('../models/appointment');

const getUserAppointments = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: 'Please provide the user ID.' });
    }

    const appointments = await Appointment.find({ user: userId });

    if (!appointments) {
      return res.status(404).json({ message: 'No appointments found for this user.' });
    }

    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving appointments: ' + error.message });
  }
};

module.exports = getUserAppointments;