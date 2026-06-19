const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
    isbn: { type: String, required: true, trim: true, unique: true, index: true },
    publishedDate: { type: Date, required: true },
  },
  { timestamps: true, collection: "api_testing" }
);

module.exports = mongoose.model("Book", bookSchema);