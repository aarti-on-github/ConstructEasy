const mongoose = require("mongoose");

const WorkLocationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("WorkLocation", WorkLocationSchema);
