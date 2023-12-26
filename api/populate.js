const Team = require("./models/Team");
const User = require("./models/User");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const dummyData = async () => {
  // Create teams
  const team1 = await Team.create({ name: "Team A", team_no: 1 });
  const team2 = await Team.create({ name: "Team B", team_no: 2 });

  // Create users
  await User.create({
    name: "User 1",
    email: "user1@example.com",
    password: "password1",
    team_id: team1._id,
  });
  await User.create({
    name: "User 2",
    email: "user2@example.com",
    password: "password2",
    team_id: team1._id,
  });
  await User.create({
    name: "User 3",
    email: "user3@example.com",
    password: "password3",
    team_id: team2._id,
  });

  console.log("Dummy data created successfully");
};

// Run the dummy data function
dummyData();
