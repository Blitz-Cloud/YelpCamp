const mongoose = require("mongoose");
const express = require("express");
const morgan = require("morgan");
const method_override = require("method-override");
const ejs_mate = require("ejs-mate");
const path = require("path");
const Campground = require("./models/campground");

const app = express();
const PORT = 8080;
const db = "yelp-camp";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist")));
app.use(express.urlencoded({ extended: true }));
app.use(method_override("_method"));
app.use(morgan("dev"));

// more setup
app.engine("ejs", ejs_mate);

// db connection and server starting
mongoose.connect(`mongodb://localhost:27017/${db}`);

const dbStatus = mongoose.connection;
dbStatus.on("error", console.error.bind(console, "Connection error:"));
dbStatus.once("open", () => {
  console.log("Database connected");
});

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
// routes
// #get
app.get("/campgrounds", async (req, res) => {
  const foundData = await Campground.find({});
  res.render("campgrounds/home", { foundData });
});
app.get("/campgrounds/new", (req, res) => {
  res.render("campgrounds/new.ejs");
});
app.get("/campgrounds/:id/details", async (req, res) => {
  const foundData = await Campground.findById(req.params.id);
  res.render("campgrounds/details", { foundData });
});
app.get("/campgrounds/:id/edit", async (req, res) => {
  const foundData = await Campground.findById(req.params.id);
  res.render("campgrounds/edit", { foundData });
});

// #post
app.post("/campgrounds", async (req, res) => {
  const data = req.body;
  const newData = new Campground(data);
  await newData.save();
  res.redirect(`/campgrounds/${newData.id}/details`);
});

// #patch
app.patch("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  const formData = req.body;
  await Campground.findByIdAndUpdate(id, formData, { runValidators: true });
  res.redirect(`/campgrounds/${id}/details`);
});

// #delete
app.delete("/campgrounds/:id", async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect("/campgrounds");
});

// #404

app.use((req, res) => {
  res.status(404).send("Not Found");
});

// test route for db used with postman
// app.post("/test-db", async (req, res) => {
//   const camp = new Campground({ title: "test" });
//   await camp.save();
//   console.log("Done saving");
//   res.redirect("/");
// });
