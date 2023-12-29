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

router.get("/getWorker/:id", async (req, res) => {
  try {
    const worker = await Worker.findById(req.params.id).populate(
      "work_location"
    );
    res.status(200).json(worker);
  } catch (err) {
    console.log(err);
    res.status(500).json(String(err));
  }
});

router.put("/updateWorker/:id", async (req, res) => {
  try {
    const updatedWorker = await Worker.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedWorker);
  } catch (err) {
    console.log(err);
    res.status(500).json(String(err));
  }
});

router.delete("/deleteWorker/:id", async (req, res) => {
  try {
    await Worker.findByIdAndDelete(req.params.id);
    res.status(200).json("Worker deleted successfully.");
  } catch (err) {
    console.log(err);
    res.status(500).json(String(err));
  }
});

module.exports = router;
