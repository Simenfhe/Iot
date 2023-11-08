const Redis = require("ioredis");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const { connectToMQTT } = require('../routers/mqtt');


function connect() {
    //connect to MQTT and topic
   connectToMQTT();
 
    // connect to Redis
    const redis = new Redis(
     {
       host: process.env.REDIS_HOST, // Redis server host
       port: process.env.REDIS_PORT,        // Redis server port
     }
   );
 
   //test the redis connection
   redis.ping((err, result) => {
     if (err) {
       console.error("Error connecting to Redis:", err);
     } else {
       console.log("--- Connected to Redis. Server response:", result, "---");
     }
   });
 
   //Connect to mongoose
   mongoose
     .connect(process.env.URI)
     .then(() =>
       console.log("--- Connected to MongoDB---")
     )
     .catch(() =>
       console.error("Could not connect to MongoDB...", process.env.URI)
     );
 }

 module.exports = connect;