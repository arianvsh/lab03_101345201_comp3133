const express = require("express");
const restaurantModel = require("../models/Restaurant");
const app = express();


app.get("/restaurants/cuisine/:cuisine", async (req, res) => {
  const cuisine = req.params.cuisine;
  const restaurants = await restaurantModel.findOne().ByCuisineName(cuisine);

  try {
    if (restaurants.length != 0) {
      res.send(restaurants);
    } else {
      res.send(JSON.stringify({ status: false, message: "No data found" }));
    }
  } catch (err) {
    res.status(500).send(err);
  }
});


app.get("/restaurants", async (req, res) => {
  const sortBy = req.query.sortBy;
  if (sortBy === "ASC") {
    restaurants = await restaurantModel
      .find({})
      .select("id cuisine name city restaurant_id")
      .sort({ restaurant_id: "ASC" });
  } else if (sortBy === "DESC") {
    restaurants = await restaurantModel
      .find({})
      .select("id cuisine name city restaurant_id")
      .sort({ restaurant_id: "desc" });
  } else {
    restaurants = await restaurantModel.find({});
  }
  try {
    res.send(restaurants);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/restaurants/Delicatessen", async (req, res) => {
  const restaurants = await restaurantModel
    .find({ city: { $ne: "Brooklyn" } })
    .where("cuisine")
    .equals("Delicatessen")
    .select("cuisine name city")
    .sort("name");
  try {
    res.send(restaurants);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post("/restaurant", async (req, res) => {
  console.log(req.body);
  const restaurant = new restaurantModel(req.body);

  try {
    await restaurant.save((err) => {
      if (err) {
        res.send(err);
      } else {
        res.send(restaurant);
      }
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = app;