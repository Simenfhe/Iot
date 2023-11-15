const express = require("express");
const router = express.Router();

const {
    getRooms, addRoom, getRoom
} = require("../controllers/roomController");

//Routes


router.post("/", addRoom);

router.get("/:campusId/:buildingId/:roomId", getRoom);

router.get("/", getRooms);



module.exports = router;
