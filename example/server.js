const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 8080;

// Use CORS middleware
app.use(cors());

app.get("/api/nearbyRestaurants", async (req, res) => {
  const { latitude, longitude, radius, apiKey } = req.query;
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=restaurant&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data from Google Maps API");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
