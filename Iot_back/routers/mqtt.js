const mqtt = require('mqtt');
const dotenv = require("dotenv").config();
const Redis = require('ioredis'); // Import the ioredis library
const {Room, validateRoom} = require('../models/room');


const redis = new Redis({
  host: 'localhost', // Redis server host
  port: 6379,        // Redis server port
});

const connectToMQTT = () => {
  const host = process.env.MQTT_HOST;
  const mqttPort = process.env.MQTT_PORT;
  const clientId = 'emqx_cloudcea9ea';

  const connectUrl = `wss://${host}:${mqttPort}/mqtt`;
  const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: process.env.MQTT_USER,
    password: process.env.MQTT_PASSW,
    reconnectPeriod: 1000,
  });

  const topic = 'hei/simen';

  client.on('connect', () => {
    console.log('--- Connected to MQTT broker');

    client.subscribe([topic], () => {

    });
  });

  client.on('message', async (topic, payload) => {
    console.log('Received Message:', topic, payload.toString());
    //ADD THE KEY "test" AND VALUE "123" TO REDIS

    // Parse the JSON payload into a JavaScript object
    const data = JSON.parse(payload.toString());
    console.log('ID:', data.id);
    console.log('Amount:', data.amount);

    let room = await Room.findOne({name: data.id});
    if(room) {
      console.log(room);
      room.available = data.amount;
      room.save();
      redis.set(data.id, data.amount, 'EX', 10).catch((error) => {
      console.error('Error setting key-value pair in Redis:', error);
    });
    }

//{"id":"5945","amount":"7"}
    
  });

  client.on('error', (error) => {
    console.error('Connection failed', error);
  });
};

module.exports = {
  connectToMQTT,
};
