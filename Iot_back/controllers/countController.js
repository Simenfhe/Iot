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

  // console.log(`campus: ${data_campus}`);
  // console.log(`building: ${data_building}`);
  // console.log(`room: ${data_room}`);

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
  // console.log('room', room)
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
  let date = now.getTime();
  
  //---------REMOVE THIS WHEN DONE TESTING----------------
 
//-------------------------------------------------------

  // console.log('week_day', week_day)
  // console.log('timestamp', date)
  // console.log('now', now)
  const length_ofdate = historyRoom.week_day[week_day].date.length - 1;
  // console.log('check', date, '-', historyRoom.week_day[week_day].date[length_ofdate].date)


  if(historyRoom.week_day[week_day].date[length_ofdate].date == date) {
    console.log('date is the same')
    historyRoom.week_day[week_day].date[length_ofdate].time.push({time: hour, count: count, temperature: 18});
  } else {
    historyRoom.week_day[week_day].date.push({date: date, time: [{time: hour, count: count, temperature: 25}]});
  }


  try {
    await historyCampus.save();
    console.log('Data saved successfully');
} catch (error) {
    console.error('Error saving data:');
}

}

const getHistory = async (req,res) => {
  console.log("history")
  const history = "84"
    res.send(history);

    const campusId = req.params.campusId; // Extract the campus ID from the request
    const buildingName = req.params.buildingId; // Extract the building ID from the request
    const roomName = req.params.roomId; // Extract the room ID from the request

    console.log('campusId', campusId)
    console.log('buildingName', buildingName)
    console.log('roomName', roomName)

    //find the room
  const campus = await RoomHistory.findOne({name: campusId});
  if (!campus) {
    console.log(`Campus not found ${campusId}`);
  }
  //find the building
  const building = campus.buildings.find((building) => building.name === buildingName);
  if (!building) {
    console.log(`Building not found ${buildingName}`);
  }
  //find the room
  const room = building.rooms.find((room) => room.roomNr == roomName);
  if (!room) {
    console.log(`Room not found ${roomName}`);
  }

  let now = new Date();
  let week_day = now.getDay();

  //---------REMOVE THIS WHEN DONE TESTING----------------
  week_day = 6;

  //find day from 6 weeks ago
  let limit = new Date();
  limit.setDate(limit.getDate() - 42);
  limit.setHours(1,0,0,0);
  let limit_date = limit.getTime();

  console.log('limit', limit_date)

  let data = room.week_day[week_day].date[0].date;
  
  //sort out the object to only contain the last 6 weeks
  while(data < limit_date) {
    room.week_day[week_day].date.shift();
    data = room.week_day[week_day].date[0].date;
  }

  let avg_data = room.week_day[week_day];
  let avg_array = []

  let sum = 0;
  let count = 0;
  //collect the average for every hour to be in a histogram
  for(let i = 0; i < 22; i++) {
    count = 0;
    sum = 0;
    console.log('test', avg_data.date.length)
    console.log('i', i)
    console.log('--------------------------------------------------------------------------')
    console.log('++++', avg_data.date[i])
    for(let j = 0; j < avg_data.date.length; j++) {
      console.log('---------', j)
      
      sum += avg_data.date[j].time[i].count;
      count++;
    }
    if(count != 0) {
      avg_data.date[0].time[i].count = Math.round(sum/count);
    }
    //push the avg to the array
    let average = sum/count;
    console.log('average', average)
    avg_array.push(average);
  }



  console.log('room', room.week_day[week_day].date)
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
  getCount, getTemp, getAir, updateCount, setToHistory, getHistory
};

//---------USED TO FILL IN DATA----------------
/*
 week_day = 5;
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(1,0,0,0);

  //empty the array historyRoom.week_day[6].date
  historyRoom.week_day[week_day].date = [];

  //loop throug every 7th day and add an object for every hour to the array starting from 8 weeks ago
  for(let i = 0; i < 12; i++) {
    let limit = new Date();
    limit.setDate(limit.getDate() - (i*7 + 84)); //84 is 12 weeks
    limit.setHours(1,0,0,0);
    let limit_date = limit.getTime();
    //loop through every hour
    for(let j = 0; j < 24; j++) {
      //if j < 8 then count is 0. j between 8 and 12 is random between 4 and 18. j between 13 and 16 random is between 12 and 25.j > 16 is random between 0 and 5
      let random = 0;
      if(j >= 8 && j < 12) {
        random = Math.floor(Math.random() * (18 - 4 + 1)) + 4;
      } else if(j >= 13 && j < 16) {
        random = Math.floor(Math.random() * (25 - 12 + 1)) + 12;
      } else if(j >= 16) {
        random = Math.floor(Math.random() * (5 - 0 + 1)) + 0; 
      }
      if (j == 0) {
        historyRoom.week_day[week_day].date.push({date: limit_date, time: [{time: j, count: random, temperature: 18}]});
      }
      else {
        let length = historyRoom.week_day[week_day].date.length - 1;
        historyRoom.week_day[week_day].date[length].time.push({time: j, count: random, temperature: 18});
      }
    }
  }


 date = tomorrow.getTime();
*/
//