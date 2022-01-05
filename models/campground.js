const mongoose = require("mongoose");
// i still dont now for what it is 3 >>>
const Schema = mongoose.Schema;

const campgroundSchema = new Schema({
  name: String,
  price: Number,
  description: String,
  location: String,
  image: String,
});

const Camp = mongoose.model("Camp", campgroundSchema);

module.exports = Camp;
