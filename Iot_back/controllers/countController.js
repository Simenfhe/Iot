//model and validation
const {Room, validateRoom} = require('../models/room');
const Campus = require('../models/campus');



const addToCount = async (payload) => {
  console.log(`wayho- : ${payload} }`);
  let data = payload.split("gjøvik/bygg118/203/");
  let campus = data[0];
  let building = data[1];
  let room = data[2];
  let operation = data[3];

  console.log(`campus: ${campus} }`);
  console.log(`building: ${building} }`);
  console.log(`room: ${room} }`);
  console.log(`operation: ${operation} }`);
  // const data = JSON.parse(payload.toString());
    // console.log('ID:', data.id);
    // console.log('Amount:', data.amount);
    // let room = await Room.findOne({name: data.id});
    // if(room) {
    //   console.log(room);
    //   room.available = data.amount;
    //   room.save();
    //   redis.set(data.id, data.amount, 'EX', 10).catch((error) => {
    //   console.error('Error setting key-value pair in Redis:', error);
    // });
    // }



}

const getCount = async (req,res) => {
  console.log("count")
}
const getTemp = async (req,res) => {
  console.log("temp")
  const temp = "22"
    res.send(temp);
}

const getAir = async (req,res) => {
  console.log("Air")
  const air = "84"
    res.send(air);
}

module.exports = {
  getCount, getTemp, getAir, addToCount
};
