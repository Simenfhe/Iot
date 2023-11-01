const mongoose = require('mongoose');

// Define the Room subdocument schema
const roomSchema = new mongoose.Schema({
  type: String,
  capacity: Number,
  available: Number,
  roomNr: Number
});

// Define the Buildings subdocument schema, including the 'rooms' field as an array of Room subdocuments
const buildingSchema = new mongoose.Schema({
  name: String,
  location: String,
  rooms: [roomSchema]
});

// Define the Campus schema, including the 'buildings' field as an array of Building subdocuments
const campusSchema = new mongoose.Schema({
  name: String,
  buildings: [buildingSchema]
});

// Create the Campus model
const Campus = mongoose.model('Campuses', campusSchema);

module.exports = Campus;





