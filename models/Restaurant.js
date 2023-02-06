const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
  address: {
    building: {
      type: String,
    },
    street: {
      type: String,
    },
    zipcode: {
      type: String,
    },
  },
  city: {
    type: String,
  },
  cuisine: {
    type: String,
  },
  name: {
    type: String,
  },
  restaurant_id: {
    type: String,
    unique: true,
  },
});

RestaurantSchema.statics.getRestaurantById = function (eid) {
  return this.find({ _id: req.query.id }).select(
    "_id cuisine name city restaurant_id"
  );
};

RestaurantSchema.query.sortByRestaurantId = function (flag) {
  return this.sort({ restaurant_id: flag });
};

RestaurantSchema.query.ByCuisineName = function (cuisine) {
  return this.where({ cuisine: cuisine });
};

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

module.exports = Restaurant;