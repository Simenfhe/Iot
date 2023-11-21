const mqtt = require('mqtt');
const dotenv = require("dotenv").config();
const {Room, validateRoom} = require('../models/room');
const {updateCount} = require('../controllers/countController');


const connectToMQTT = () => {
  const host = process.env.MQTT_HOST;
  const mqttPort = process.env.MQTT_PORT;
  const clientId = 'emqx_cloudcea9ea';

  const connectUrl = `wss://${host}:${mqttPort}/mqtt`;
  console.log(connectUrl)
  const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: process.env.MQTT_USER,
    password: process.env.MQTT_PASSW,
    reconnectPeriod: 1000,
  });

  const count_update = 'count/update'; 
  const count_set = 'count/set';

  client.on('connect', () => {
    console.log('--- Connected to MQTT broker');

    client.subscribe([count_update], () => {
      console.log(`--- Subscribed to topic '${count_update}'`);
    });
    client.subscribe([count_set], () => {
      console.log(`--- Subscribed to topic '${count_set}'`);
    });
  });

  client.on('message', async (topic, payload) => {
    console.log('Received Message:', topic, payload.toString());
    let string = payload.toString();
    //ADD THE KEY "test" AND VALUE "123" TO REDIS
    switch (topic) {
      case count_update:
        updateCount(string);
        break;
      case count_set:
        console.log('--count_set');
        break;
      default:
        console.log('--Unknown topic:', topic);
    }

    console.log('test:', payload.toString());
    // Parse the JSON payload into a JavaScript object
    // const data = JSON.parse(payload.toString());
    // console.log('ID:', data.id);
    // console.log('Amount:', data.amount);
    // let room = await Room.findOne({name: data.id});
    // if(room) {
    //   console.log(room);
    //   room.available = data.amount;
    //   room.save();
    //   redis.set(data.id, data.amount, 'EX', 10).catch((error) => {
    //   console.error('Error setting key-value pair in Redis:', error);
    // });
    // }

//{"id":"5945","amount":"7"}
    
  });

  client.on('error', (error) => {
    console.error('Connection failed', error);
  });
};

module.exports = {
  connectToMQTT,
};
