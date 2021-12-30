const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const db = "yelp-camp";

mongoose.connect(`mongodb://localhost:27017/${db}`);

const dbStatus = mongoose.connection;
dbStatus.on("error", console.error.bind(console, "Connection error:"));
dbStatus.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async function () {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const rando = Math.floor(Math.random() * 1000);
    await new Campground({
      name: `${sample(descriptors)},${sample(places)}`,
      location: `${cities[rando].city},${cities[rando].state}`,
    }).save();
  }
};
seedDB().then(() => {
  mongoose.connection.close();
  console.log("Connection close");
});
