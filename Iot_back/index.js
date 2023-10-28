
//adding mongoose + modules
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const { SSE } = require('sse')
const mqtt = require('mqtt');

const host = process.env.MQTT_HOST ;
const mqttPort = '8084'
const clientId = `emqx_cloudcea9ea`

const connectUrl = `wss://${host}:${mqttPort}/mqtt`
const client = mqtt.connect(connectUrl, {
  clientId,
  clean: true,
  connectTimeout: 4000,
  username: process.env.MQTT_USER,
  password: process.env.MQTT_PASSW,
  reconnectPeriod: 1000,
})

console.log('mqtt pasww', process.env.MQTT_PASSW)
console.log('mqtt user', process.env.MQTT_USER)

const topic = 'hei/simen'

client.on('connect', () => {
  console.log('Connected to MQTT broker')

  client.subscribe([topic], () => {
    console.log(`Subscribe to topic '${topic}'`)
    client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
      if (error) {
        console.error(error)
      }
    })
  })
})

client.on('message', (topic, payload) => {
  console.log('Received Message:', topic, payload.toString())
})


client.on('error', (error) => {
  console.error('connection failed', error)
})


//Routes
const counter = require("./routers/countRoutes");
const rooms = require("./routers/roomRouter");

//Adding settings for the CORS
app.use(
  cors({
    origin: ["http://localhost:5173","*"],
    credentials: true,
  })
);

mongoose
  .connect(process.env.URI)
  .then(() =>
    console.log("Connected to MongoDB...", "on", process.env.URI)
  )
  .catch(() =>
    console.log("Could not connect to MongoDB...", process.env.URI)
  );

//running request through JSON
app.use(express.json());

//Route for players
app.use("/counter", counter);
app.use("/rooms", rooms);

//SSE endpoint
app.get("/sse", (req,res) => {
  const sse = new SSE()
  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection','keep-alive')
  res.setHeader('Access-Control-Allow-Origin','*')
  
  sse.init(req,res)
  sse.send({data:'initial data'})

  req.on('close',() =>{
    
  })
})





//Running the server on a set port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
