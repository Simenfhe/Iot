const express = require("express");
const router = express.Router();

const {
  getCount, getTemp, getAir, getHistory
} = require("../controllers/countController");


//router.put("/add", addToCount)
//router.put("/subtract", subtractToCount)

//get history of a room 
router.get("/history/:campusId/:buildingId/:roomId", getHistory);

//ALL count 
router.get("/", getCount);

router.get("/temp", getTemp);

router.get("/air", getAir);




module.exports = router;
