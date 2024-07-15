const mongoose = require("mongoose");
const Call = require("../models/Call");

// User is looking in mongo db for incoming calls
const FetchVideoCalls = async (req, res) => {
  try {
    console.log("Je suis ici")
    const receiverId = req.query.receiver_id
    console.log(receiverId)
    const call = await Call.findOne({receiver_id: receiverId})
    console.log(call)
    res.status(200).send(call)
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}; 

//
const InitiateVideoCall = async (req, res) => {
    try {
        const call = new Call(req.body);
        await call.save();
        res.status(200).json(call);
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
};

const HangUp = async (req, res) => {
    try {
      const filter = { 
        _id: new mongoose.Types.ObjectId(req.params.call_id) 
      }
      const call = await Call.findOne(filter)
      call.status = 1
      const result = call.save();
      return res.status(200).json(result)
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
};

const DeleteAll = async (req, res) => {
    try {
      await Call.deleteMany({})
      res.status(200).send({message: "Success"})
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
};
  
/* Exporter le module */
module.exports = { FetchVideoCalls , InitiateVideoCall, HangUp , DeleteAll};
