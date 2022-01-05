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
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus molestias iste officia nam repellendus ex porro, eaque dolorem numquam corporis, impedit rem praesentium accusantium dolor, dolorum sapiente provident? Sapiente, voluptatibus.",
      image:
        "https://images.unsplash.com/photo-1469053913977-1d2f009670d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHw0ODQzNTF8fHx8fHx8MTY0MTMyMTg4NQ&ixlib=rb-1.2.1&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080",
    }).save();
  }
};
seedDB().then(() => {
  mongoose.connection.close();
  console.log("Connection close");
});
