
//get count 
const getCount = async (req, res) => {
  console.log("teller")
    const amount = "7"
    res.send(amount);
};

const addToCount = async (req, res) => {
  let
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
  getCount, getTemp, getAir
};
