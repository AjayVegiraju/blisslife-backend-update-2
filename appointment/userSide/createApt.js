const expressAsyncHandler = require("express-async-handler");
const Appointment = require("../../models/");

const createUserAppointment = async (req, res) => {
  try {
    const { seller, start_time, end_time, user } = req.body;

    if (!seller || !start_time || !end_time || !user) {
      return res.status(400).json({ message: 'Please provide all required fields: seller, start_time, end_time, and user.' });
    }

    const newAppointment = new Appointment({
      seller,
      start_time: new Date(start_time),
      end_time: new Date(end_time),
      user
    });

    const savedAppointment = await newAppointment.save();
    res.status(201).json(savedAppointment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating appointment: ' + error.message });
  }
};

module.exports = createUserAppointment;