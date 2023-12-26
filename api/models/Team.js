const mongoose = require("mongoose");

const TeamSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Enter the Team name"],
    },
    team_no: {
      type: Number,
      required: [true, "Enter the team no"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Team", TeamSchema);
