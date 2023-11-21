const mqtt = require('mqtt');
const dotenv = require("dotenv").config();
const {updateCount, setToHistory} = require('../controllers/countController');

// CONNECT TO MQTT BROKER
const connectToMQTT = () => {
  const host = process.env.MQTT_HOST;
  const mqttPort = process.env.MQTT_PORT;
  const clientId = process.env.MQTT_CLIENT_ID;

  //CONNCTION URL AND OPTIONS
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
  const setHistory = 'history/set'


  //---------------------------------------------------------------------------------
  //CONNECT TO MQTT AND SUBSCRIBE TO TOPICS
  client.on('connect', () => {
    console.log('--- Connected to MQTT broker');

    client.subscribe([count_update], () => {
      console.log(`--- Subscribed to topic '${count_update}'`);
    });
    client.subscribe([setHistory], () => {
      console.log(`--- Subscribed to topic '${setHistory}'`);
    });
    client.subscribe([count_set], () => {
      console.log(`--- Subscribed to topic '${count_set}'`);
    });
  });

  //---------------------------------------------------------------------------------
  //RECIVE MESSAGE FROM MQTT
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
      case setHistory:
        setToHistory(string);
        break;
      default:
        console.log('--Unknown topic:', topic);
    }

    console.log('test:', payload.toString());
 

    
  });

  client.on('error', (error) => {
    console.error('Connection failed', error);
  });
};

module.exports = {
  connectToMQTT,
};
