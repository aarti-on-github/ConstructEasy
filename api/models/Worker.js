const mongoose = require("mongoose");

const WorkerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  profile_pic: {
    type: String,
    required: true,
  },
  work_location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "WorkLocation",
  },
});

module.exports = mongoose.model("Worker", WorkerSchema);

