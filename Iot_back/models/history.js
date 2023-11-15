const mongoose = require('mongoose');


const timeSchema = new mongoose.Schema({
    time: Number,
    count: Number,
    temperature: Number,
});

const dateSchema = new mongoose.Schema({
    date: Number,
    time: [timeSchema]
});

const daySchema = new mongoose.Schema({
    day: Number,
    date: [dateSchema]
});

// Define the Room subdocument schema
const roomSchema = new mongoose.Schema({
    week_day:[daySchema],
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
const RoomHistory = mongoose.model("RoomHistory", campusSchema, 'room_history');

module.exports = RoomHistory;





