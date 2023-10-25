//adding mongoose + modules
// const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");


//Routes
const players = require("./routers/countRoutes");

//Adding settings for the CORS
app.use(
  cors({
    origin: ["http://localhost:3000","*"],
    credentials: true,
  })
);

// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() =>
//     console.log("Connected to MongoDB...", "on", process.env.MONGO_URL)
//   )
//   .catch(() =>
//     console.log("Could not connect to MongoDB...", process.env.MONGO_URL)
//   );

//running request through JSON
app.use(express.json());

//Route for players
app.use("/", players);



//Running the server on a set port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));
