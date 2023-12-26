const User = require("../models/User");
const Team = require("../models/Team");
const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    // console.log(token);
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const user_data = await User.findById(user.userId);

      req.user = user_data._doc;
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const authAdmin = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    jwt.verify(token, process.env.SECRET_KEY, async (err, user) => {
      if (err) {
        return res.status(403).json({ message: "Forbidden" });
      }
      const user_data = await User.findById(user.userId);
      if (!user_data.isadmin)
        return res.status(401).json({ message: "You are not admin" });
      req.user = user_data;
      next();
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports = { authUser, authAdmin };
