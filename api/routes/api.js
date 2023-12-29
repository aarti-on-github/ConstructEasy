const router = require("express").Router();
const Worker = require("../models/Worker");
const WorkLocation = require("../models/WorkLocation");

router.get("/getAllWorkLocation", async (req, res) => {
  try {
    const workLocations = await WorkLocation.find();
    res.status(200).json(workLocations);
  } catch (err) {
    console.log(err);
    res.status(500).json(String(err));
  }
});

router.post("/addWorkLocation", async (req, res) => {
  try {
    const newWorkLocation = new WorkLocation(req.body);
    const savedWorkLocation = await newWorkLocation.save();
    res.status(200).json(savedWorkLocation);
  } catch (err) {
    console.log(err);
    res.status(500).json(String(err));
  }
});

router.get("/getAllWorker", async (req, res) => {
  try {
    const workers = await Worker.find().populate("work_location");
    res.status(200).json(workers);
  } catch (err) {
    console.log(err);
    res.status(500).json(String(err));
  }
});

router.post("/addWorker", async (req, res) => {
  try {
    const newWorker = new Worker(req.body);
    const savedWorker = await newWorker.save();
    res.status(200).json(savedWorker);
  } catch (err) {
    console.log(err);
    res.status(500).json(String(err));
  }
});

module.exports = router;
