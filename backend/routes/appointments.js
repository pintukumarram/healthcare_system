// routes/appointments.js
const express = require("express");
const Appointment = require("../models/Appointment");
const User = require("../models/User"); // Import the User model
const router = express.Router();

// Book an Appointment
router.post("/book", async (req, res) => {
  const { patientName, doctorName, appointmentDate } = req.body;

  // Check if the required fields are provided
  if (!patientName || !doctorName || !appointmentDate) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Look up the patient by name
    const patient = await User.findOne({ name: patientName });

    if (!patient) {
      return res.status(404).json({ message: "Patient not found." });
    }

    // Create a new appointment instance with the patient ID
    const appointment = new Appointment({
      patientId: patient._id,
      doctorName,
      appointmentDate
    });

    // Save the appointment to the database
    await appointment.save();

    // Send success response
    res.status(201).json({ message: "Appointment booked successfully" });
  } catch (error) {
    console.error("Error booking appointment:", error); // Log error for debugging
    res.status(500).json({ message: "Error booking appointment" });
  }
});


// Get All Appointments
router.get("/", async (req, res) => {
    try {
      const appointments = await Appointment.find().populate("patientId", "name age gender");
      res.status(200).json(appointments);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      res.status(500).json({ message: "Error fetching appointments" });
    }
  });
  

// Cancel an Appointment
router.delete("/:id", async (req, res) => {
  try {
    // Delete the appointment by ID
    await Appointment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    res.status(500).json({ message: "Error cancelling appointment" });
  }
});

module.exports = router;
