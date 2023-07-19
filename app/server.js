const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.connect(
  "mongodb+srv://teodoradejanu:teo@cluster0.axnegl0.mongodb.net/fav",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const CitySchema = new mongoose.Schema({
  name: String,
  country: String,
  temperature: Number,
  weather: String,
});

const City = mongoose.models.City || mongoose.model("City", CitySchema);
const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

app.get("/", (req, res) => {
  res.send("Hello, World!");
});
// Rest of your routes and server logic...
app.post("/addFavorite", async (req, res) => {
  console.log("Received addFavorite request!");
  try {
    const cityData = req.body;
    const city = new City(cityData);
    await city.save();
    res.status(200).end();
    console.log("City Data:", cityData);
  } catch (error) {
    console.error("Error saving city details:", error);
    res.status(500).end();
  }
});

app.delete("/removeFavorite", async (req, res) => {
  try {
    const cityName = req.query.city;
    await City.deleteOne({ name: cityName });
    res.status(200).end();
  } catch (error) {
    console.error("Error removing city from favorites:", error);
    res.status(500).end();
  }
});

app.get("/checkFavorite", async (req, res) => {
  try {
    const cityName = req.query.city;
    const city = await City.findOne({ name: cityName });
    res.status(200).json(!!city);
  } catch (error) {
    console.error("Error checking favorite status:", error);
    res.status(500).end();
  }
});

app.get("/getFavorites", async (req, res) => {
  try {
    const cities = await City.find();
    res.status(200).json(cities);
  } catch (error) {
    console.error("Error fetching favorite cities:", error);
    res.status(500).end();
  }
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
