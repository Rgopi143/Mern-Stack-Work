const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/productivity", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UsageSchema = new mongoose.Schema({
  site: String,
  timeSpent: Number,
  date: String,
});

const Usage = mongoose.model("Usage", UsageSchema);

app.post("/usage", async (req, res) => {
  const { site, timeSpent, date } = req.body;
  const usage = new Usage({ site, timeSpent, date });
  await usage.save();
  res.send({ status: "saved" });
});

app.get("/report/:date", async (req, res) => {
  const report = await Usage.find({ date: req.params.date });
  res.send(report);
});

app.listen(4000, () => {
  console.log("Backend running on http://localhost:4000");
});
