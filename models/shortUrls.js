const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const shortid = require("shortid"); // This is deprecated, use nanoid instead.

const shortUrlShema = new Schema({
  fullUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    default: shortid.generate,
  },
  clicks: {
    type: Number,
    required: true,
    default: 0,
  },
});

const ShortUrl = mongoose.model("ShortUrl", shortUrlShema);

module.exports = ShortUrl;
