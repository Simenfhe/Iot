//model and validation
const Campus = require('../models/campus');

const Redis = require('ioredis'); // Import the ioredis library


const redis = new Redis({
  host: process.env.REDIS_HOST, // Redis server host
  port: process.env.REDIS_PORT, // Redis server port
});

//update or set the count of a room
const updateCount = async (payload) => {

  //define the data
  const data = payload.split("//");
  const roomString = data[0];
  const operation = data[1];
  const roomData = roomString.split("/");
  const data_campus = roomData[0];
  const data_building = roomData[1];
  const data_room = roomData[2];

  console.log(`campus: ${data_campus}`);
  console.log(`building: ${data_building}`);
  console.log(`room: ${data_room}`);
  console.log(`operation: ${operation}`);

  //find the room
  const campus = await Campus.findOne({name: data_campus});
  if (!campus) {
    console.log(`Campus not found ${data_campus}`);
  }
  //find the building
  const building = campus.buildings.find((building) => building.name === data_building);
  if (!building) {
    console.log(`Building not found ${data_building}`);
  }
  //find the room
  const room = building.rooms.find((room) => room.roomNr == data_room);
  if (!room) {
    console.log(`Room not found ${data_room}`);
  }
  //update the room count

  switch (operation) {
    case "+":
      room.count += 1;
      break;
    case "-":
      room.count -= 1;
      break;
    default:
      room.count = operation;
  }

  console.log(room)
  campus.save();


  //save the room count in redis
  redis.set(roomString, room.count, 'EX', 20).catch((error) => {
    console.error('Error setting key-value pair in Redis:', error);
  });

}

const getCount = async (req,res) => {
  console.log("count")
}
const getTemp = async (req,res) => {
  console.log("temp")
  const temp = "22"
    res.send(temp);
}

const getAir = async (req,res) => {
  console.log("Air")
  const air = "84"
    res.send(air);
}

module.exports = {
  getCount, getTemp, getAir, updateCount
};
