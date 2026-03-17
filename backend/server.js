const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/timezone-demo");

const CalorieSchema = new mongoose.Schema({
  calories: Number,
  createdAt: Date
});

const Calorie = mongoose.model("Calorie", CalorieSchema);


// ADD CALORIE
app.post("/api/calories", async (req, res) => {
  const { calories, createdAt } = req.body;

  const newItem = new Calorie({
    calories,
    createdAt
  });

  await newItem.save();

  res.json(newItem);
});


// GET CALORIES
app.get("/api/calories", async (req, res) => {
  const items = await Calorie.find().sort({ createdAt: -1 });

  res.json(items);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});