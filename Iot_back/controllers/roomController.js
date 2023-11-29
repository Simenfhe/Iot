//model and validation
const {Room, validateRoom} = require('../models/room');
const Campus = require('../models/campus');
const RoomHistory = require('../models/history');
const findRoom = require('../functions/findRoom');

//modules
const _ = require('lodash');


//get count 
const getAllRooms = async (req, res) => {
    const data = await Campus.find().sort('name');
    res.send(data);
  };




//old
const addRoom = async(req, res) => {
    //validating the tool
    const { error } = validateRoom(req.body);
    if(error) {
        console.log(error.details[0].message)
        return res.status(400).send(error.details[0].message);
    }
    //checking if the room exists
    try {
        let room = await Room.findOne({name: req.body.name});
        if (room) return res.status(400).send('room allready exists');
    }
    catch {
        res.status(400).send('connection to database failed');
    }
    //creating the tool
    let room = new Room(_.pick(req.body, 
        ['name', 'capacity', 'available']));
    
    try {
        room.save();
        res.send(`Room created: "${Room.name}"`);
    }
    catch {
        return res.status(400).send('An error occured during the creation of the room');
    }
}

getRoomFromCookie = async (req, res) => {
    console.log('getRoomFromCookie')

    //if Cookie exists .. do this, else return

    //extract info from cookie
    const campusId =""; 
    const buildingName="";
    const roomName="";

    const result = await findRoom(campusId, buildingName, roomName);
    
    if (result.error) {
        res.status(500).send(result.error);
        console.log('Oops');
    } else {
        res.send(result.room);
    }
}



// Get one specific room in a specific campus and building
        //Read the room that the user wants to get, and add a count to the room (most used), give the user a cookie with this room
const getRoom = async (req, res) => {
    const campusId = req.params.campusId; // Extract the campus ID from the request
    const buildingName = req.params.buildingId; // Extract the building ID from the request
    const roomName = req.params.roomId; // Extract the room ID from the request
  
    
    const result = await findRoom(campusId, buildingName, roomName);
    
    if (result.error) {
        res.status(500).send(result.error);
        console.log('Oops');
    } else {
        res.send(result.room);
    }
  };
  




  module.exports = {
    getAllRooms, addRoom, getRoom
  };