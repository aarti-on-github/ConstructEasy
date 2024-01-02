const express = require("express");
const app = express();
const connectDB = require("./config/connection");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
// require("./config/cloudinary");

// cors
// cors({
//   origin: ["http://localhost:3000"],
//   methods: ["GET", "POST", "PUT", "DELETE"],
// })

app.use(cors({
  credentials: true,
}));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});
app.use(express.static(path.join(__dirname, "./public", "../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Hello World!"));
app.use("/api/", require("./routes/api"));

const start = async () => {
  try {
    const port = process.env.PORT || 5000;
    // console.log(process.env.MONGO_URI);
    connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}.........`)
    );
  } catch (err) {
    console.log(err);
  }
};

start();
module.exports = app;
