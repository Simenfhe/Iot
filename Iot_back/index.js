
//adding mongoose + modules
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const SSE = require('sse')
const {Room, validateRoom} = require('./models/room');
const {findRoom} = require('./functions/findRoom')
const Redis = require("ioredis");
const connect = require('./functions/connect');
const {setToHistory } = require('./controllers/countController');

//---------DELETE THIS LATER-------------------------------------------
// const string = 'Gjøvik/Bygg 118/301'
// setToHistory(string);

//---CONNECT TO REDIS, MONGO_DB AND MQTT 
connect();
 
const redis = new Redis(
  {
    host: process.env.REDIS_HOST, // Redis server host
    port: process.env.REDIS_PORT,        // Redis server port
  }
);

//Routes
const counter = require("./routers/countRoutes");
const rooms = require("./routers/roomRouter");

//Adding settings for the CORS
app.use(
  cors({
    origin: [process.env.CORS_ORIGIN,"*"],
    credentials: true,
  })
);



//running request through JSON
app.use(express.json());

//Route for players
app.use("/counter", counter);
app.use("/rooms", rooms);

//SSE endpoint
app.get('/sse/:campusId/:buildingName/:roomName', async (req, res) => {
  const campusId = req.params.campusId; // Extract the campus ID from the request
  const buildingName = req.params.buildingName; // Extract the building ID from the request
  const roomName = req.params.roomName; // Extract the room ID from the request

  try {
  const data = await findRoom(campusId, buildingName, roomName);
  const room = data.room;
    if (room) {
      value = room.count;
      console.log('cap: ',room.count) // Set the value based on room.available
    } else {
      console.error(`Room '${roomName}' not found in MongoDB`);
    }
  } catch (error) {
    console.error('MongoDB error:', error);
    // Handle the error and respond accordingly
  }




  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache',
    'Access-Control-Allow-Origin': '*',
  });

  let counter = 0;

  // Send a message on connection
  res.write('event: connected\n');
  res.write(`data: ${value}\n`);
  res.write(`id: ${counter}\n\n`);
  counter += 1;

  let interval;

req.on('close', () => {
  clearInterval(interval);
  res.end('OK');
});

  // Send a subsequent message every five seconds
  interval = setInterval(async () => {
    if(redis.get(roomName)) {
      cashe_value = await redis.get(roomName);
      console.log('cashe_value: ', cashe_value)
      if(value != cashe_value & cashe_value != null) 
      { value = cashe_value;
        res.write('event: message\n');
        res.write(`data: ${value}\n`);
        res.write(`id: ${counter}\n\n`); }
    }
    console.log('sse running');
    console.log('counter: ', counter)

    
    
    counter += 1;
  }, 1000);



  // Close the connection when the client disconnects
  req.on('close', () => res.end('OK'));
});













//Running the server on a set port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
