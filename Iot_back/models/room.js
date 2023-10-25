const mongoose = require('mongoose');
const Joi = require('joi');

const Room =  mongoose.model('Room', new mongoose.Schema({

    name: {
        type: Number,
        min: 0,
        max: 9999,
        required: true
    },
    capacity: {
        type: Number,
        min: 0,
        max: 9999,
        required: true
    },
    available: {
        type: Number,
        min: 0,
        max: 9999,
        required: true
    }
}));


function validateRoom(room){
    const schema = Joi.object({
        name: Joi.number().min(2).max(9999).required(),
        capacity: Joi.number().min(2).max(9999).required(),
        available: Joi.number().min(2).max(9999).required()
    });

    const validation = schema.validate(room);
    return validation;
}

module.exports.Room = Room;
module.exports.validateRoom = validateRoom;
