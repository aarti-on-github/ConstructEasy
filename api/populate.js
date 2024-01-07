const Worker = require("./models/Worker");
const WorkLocation = require("./models/WorkLocation");
const Attendance = require("./models/Attendance");
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createDummyData = async () => {
  try {
    // Delete all existing data
    await Worker.deleteMany({});
    await WorkLocation.deleteMany({});
    await Attendance.deleteMany({});
    // Dummy WorkLocations
    const workLocationsData = [
      {
        name: "Office A",
        address: "123 Main St",
        longitude: -73.987456,
        latitude: 40.748817,
      },
      {
        name: "Office B",
        address: "456 Oak St",
        longitude: -74.012345,
        latitude: 40.712345,
      },
      // Add more WorkLocations as needed
    ];

    let workLocations = [];
    for (let i = 0; i < workLocationsData.length; i++) {
      const workLocation = new WorkLocation(workLocationsData[i]);
      await workLocation.save();
      workLocations.push(workLocation);
    }

    // Dummy Workers
    const workersData = [
      {
        name: "John Doe",
        age: 30,
        gender: "Male",
        address: "789 Elm St",
        contact: 1234567890,
        salary: 50000,
        profile_pic: "image.jpg",
        work_location: workLocations[0]._id,
      },
      {
        name: "Jane Smith",
        age: 25,
        gender: "Female",
        address: "101 Pine St",
        contact: 9876543210,
        salary: 60000,
        profile_pic: "image.jpg",
        work_location: workLocations[1]._id,
      },
      // Add more Workers as needed
    ];

    for (let i = 0; i < workersData.length; i++) {
      const worker = new Worker(workersData[i]);
      await worker.save();
    }

    console.log("Dummy data added successfully.");
  } catch (error) {
    console.error("Error adding dummy data:", error);
  } finally {
    mongoose.disconnect();
  }
};

// Call the function to add dummy data
createDummyData();
