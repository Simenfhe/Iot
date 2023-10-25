const express = require("express");
const router = express.Router();

const {
  getCount, getTemp, getAir
} = require("../controllers/countController");

//ALL count 
router.get("/count", getCount);

router.get("/temp", getTemp);

router.get("/air", getAir);




module.exports = router;
