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
  console.log('room', room)
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

  //historyRoom.week_day.push({date: { time: [{time: 14, count: 8, temperature: 20}]}})

  let now = new Date();
  let week_day = now.getDay();
  let hour = now.getHours();
  now.setHours(1,0,0,0);
  const date = now.getTime();

 
  // console.log('week_day', week_day)
  // console.log('timestamp', date)
  // console.log('now', now)
  const length_ofdate = historyRoom.week_day[week_day].date.length - 1;
  // console.log('check', date, '-', historyRoom.week_day[week_day].date[length_ofdate].date)


  if(historyRoom.week_day[week_day].date[length_ofdate].date == date) {
    console.log('date is the same')
    historyRoom.week_day[week_day].date[0].time.push({time: hour, count: count, temperature: 18});
  } else {
    historyRoom.week_day[week_day].date[0] = {date: date, time: [{time: hour, count: count, temperature: 25}]};
  }


  historyCampus.save();
  // console.log('historyRoom---', historyRoom.week_day[week_day].date[0]);


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
