const express = require("express");
const router = express.Router();

const {
  getCount, getTemp, getAir
} = require("../controllers/countController");

//ALL count 
router.get("/", getCount);
//router.put("/add", addToCount)
//router.put("/subtract", subtractToCount)

router.get("/temp", getTemp);

router.get("/air", getAir);




module.exports = router;
