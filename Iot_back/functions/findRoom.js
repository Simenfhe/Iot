const Campus = require('../models/campus');

const findRoom = async (campusId, buildingName, roomName) => {
    try {
      const campus = await Campus.findOne({ name: campusId });
  
      if (!campus) {
        return { error: `Campus not found ${campusId}` };
      }
  
      // Find the building by name
      const building = campus.buildings.find((building) => building.name === buildingName);
      if (!building) {
        return { error: 'Building not found' };
      }
  
      // Find the correct room
      const room = building.rooms.find((room) => room.roomNr == roomName);
      if (!room) {
        return { error: 'Room not found' };
      }
  
      return { room };
    } catch (error) {
      return { error: 'An error occurred while fetching the room' };
    }
  };

    module.exports = { findRoom };