const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.port || 5000;

// Models
const ShortUrl = require("./models/shortUrls");

// Mongoose / mongodDB
mongoose
  .connect("mongodb://localhost:27017/URLshrtrDB")
  .then(() => console.log("Database Connected"))
  .catch((e) => console.log(e, "Error connecting to Database"));

// MIDDLEWARE
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

// ROUTES
// Home
app.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  let latestUrl = shortUrls[shortUrls.length - 1].shortUrl;
  res.render("index", { latestUrl });
});

// Home POST
app.post("/shortUrls", async (req, res) => {
  const { fullUrl } = req.body;
  const createShortUrl = await ShortUrl.create({ fullUrl });
  res.redirect("/");
});

app.get("/:shortUrl", async (req, res) => {
  const { shortUrl } = req.params;
  const newShortUrl = await ShortUrl.findOne({ shortUrl });
  if (newShortUrl == null) return res.sendStatus(404);
  newShortUrl.clicks++;
  newShortUrl.save();
  res.redirect(newShortUrl.fullUrl);
});

// PORT LISTENING
app.listen(PORT, () => {
  console.log(`Running on Port:${PORT}`);
});
