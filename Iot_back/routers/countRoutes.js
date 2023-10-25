const express = require("express");
const router = express.Router();

const {
  getCount,
} = require("../controllers/countController");

//ALL count 
router.get("/count", getCount);



module.exports = router;
