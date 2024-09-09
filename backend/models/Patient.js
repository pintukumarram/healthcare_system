// models/Patient.js
const mongoose = require("mongoose");

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  
});

module.exports = mongoose.model("Patient", PatientSchema);
