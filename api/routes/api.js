const router = require("express").Router();
const User = require("../models/User");
const Team = require("../models/Team");
const jwt = require("jsonwebtoken");
const { authUser, authAdmin } = require("../middlewares/authUser");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User doesn't exists" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid Credationals" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    // console.log(user);
    const team = await Team.findById(user.team_id);
    // console.log(user, team);
    res.status(200).json({
      message: "Login success",
      jwt_token: token,
      user_name: user.name,
      team_name: team.name,
      isadmin: user.isadmin,
      user_id: user._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/protected", authUser, (req, res, next) => {
  try {
    res.status(200).json({ ok: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ ok: false });
  }
});

router.get("/admin", authAdmin, (req, res, next) => {
  try {
    res.status(200).json({ ok: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ ok: false });
  }
});

router.get("/get_user/:id", authUser, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);

    delete user._doc.password;
    delete user._doc.team_id;

    res
      .status(200)
      .json({ message: "Fetched successfully", user: { ...user._doc } });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.put("/scanqr", authAdmin, async (req, res) => {
  try {
    const { id, food } = req.body;

    const user = await User.findById(id);

    let user_food = user.food;

    if (!food in user_food)
      return res.status(505).json({ message: "No such key" });

    if (user_food[food])
      return res.status(403).json({ message: "Kitna khayega bhukad....." });
    user_food[food] = true;

    const update = await User.findByIdAndUpdate(id, {
      food: user_food,
    });
    console.log(update);
    res
      .status(200)
      .json({ message: `${user.name} has been delivered with ${food}` });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
