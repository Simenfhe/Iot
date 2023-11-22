const express = require("express");
const router = express.Router();

const {
    getAllRooms, addRoom, getRoom
} = require("../controllers/roomController");

//Routes


router.post("/", addRoom);

router.get("/:campusId/:buildingId/:roomId", getRoom);

router.get("/", getAllRooms);



module.exports = router;
