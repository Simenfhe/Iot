//model and validation
const Campus = require('../models/campus');
const RoomHistory = require('../models/history');

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

const setToHistory = async (payload) => {
  console.log(payload)
  //define the data
  const data = payload.split("/");
  const data_campus = data[0];
  const data_building = data[1];
  const data_room = data[2];

  console.log(`campus: ${data_campus}`);
  console.log(`building: ${data_building}`);
  console.log(`room: ${data_room}`);

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

  let count = room.count;

  console.log('count', count)

  //find the campus
  const historyCampus = await RoomHistory.findOne({name: data_campus});
  if (!historyCampus) {
      console.log(`Campus not found ${data_campus}`);
  }
  //find the building
  const historyBuilding = historyCampus.buildings.find((building) => building.name === data_building);
  if (!historyBuilding) {
      console.log(`Building not found ${data_building}`);
  }
  //find the room
  const historyRoom = historyBuilding.rooms.find((room) => room.roomNr == data_room);
  if (!historyRoom) {
      console.log(`Room not found ${data_room}`);
  }

  console.log('historyRoom---', historyRoom.week_day[0]);

//   const sampleData = {
//     "name": "Gjøvik",
//     "buildings": [
//         {
//             "name": "Bygg 118",
//             "location": "example",
//             "rooms": [
//                 {
//                     "roomNr": "203",
//                     "type": "group room",
//                     "available": 12,
//                     "count": 16
//                 },
//                 {
//                     "roomNr": "207",
//                     "type": "group room",
//                     "available": 2,
//                     "count": 16
//                 },
//                 {
//                     "roomNr": "301",
//                     "type": "group room",
//                     "capacity": 21,
//                     "roomId": 304,
//                     "count": 4,
//                     "week_day": [
//                         {
//                             "date": [
//                                 {
//                                     "date": 1345678765,
//                                     "time": [
//                                         {
//                                             "time": 11,
//                                             "count": count,
//                                             "temperature": 22
//                                         }
//                                     ]
//                                 }
//                             ]
//                         }
//                     ]
//                 }
//             ]
//         },
//         {
//             "name": "Bygg 121",
//             "location": "borte"
//         }
//     ]
// };

// const newBuilding = new RoomHistory(sampleData)
// newBuilding.save();

  //Gjøvik/Bygg 118/301
  // console.log('historyRoom', historyRoom)
  // historyCampus.save();


}

//Gjøvik/Bygg 118/301

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
  getCount, getTemp, getAir, updateCount, setToHistory
};
