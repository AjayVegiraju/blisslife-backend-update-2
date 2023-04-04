const Appointment = require('../models/appointment');


const updateUserAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { start_time, end_time, notes } = req.body;

    if (!appointmentId) {
      return res.status(400).json({ message: 'Please provide the appointment ID.' });
    }

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found.' });
    }

    if (start_time) {
      appointment.start_time = new Date(start_time);
    }
    if (end_time) {
      appointment.end_time = new Date(end_time);
    }
    if (notes) {
      appointment.notes = notes;
    }

    const updatedAppointment = await appointment.save();
    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating appointment: ' + error.message });
  }
};

module.exports = updateUserAppointment;