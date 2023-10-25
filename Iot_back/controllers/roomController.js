//model and validation
const {Room, validateRoom} = require('../models/room');

//modules
const _ = require('lodash');


//get count 
const getRooms = async (req, res) => {
    const rooms = await Room.find().sort('name');
    res.send(rooms);
  };

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

  module.exports = {
    getRooms, addRoom
  };