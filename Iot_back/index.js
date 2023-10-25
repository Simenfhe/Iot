//adding mongoose + modules
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const { SSE } = require('sse')



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
