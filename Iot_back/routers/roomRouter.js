const express = require("express");
const router = express.Router();

const {
    getRooms, addRoom
} = require("../controllers/roomController");

//Routes
router.get("/", getRooms);

router.post("/", addRoom);




module.exports = router;
