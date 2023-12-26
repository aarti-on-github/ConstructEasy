const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    team_id: {
      type: mongoose.Types.ObjectId,
      ref: "Team",
      required: [true, "Team is required"],
    },
    isadmin: {
      type: Boolean,
      default: false,
    },
    food: {
      lunch1: {
        type: Boolean,
        default: false,
      },
      // snacks: {
      //   type: Boolean,
      //   default: false,
      // },
      dinner: {
        type: Boolean,
        default: false,
      },
      midnight: {
        type: Boolean,
        default: false,
      },
      breakfast: {
        type: Boolean,
        default: false,
      },
      lunch2: {
        type: Boolean,
        default: false,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
