const mongoose = require("mongoose");

async function connectDB() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/book_store";

  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(uri, {
      autoIndex: true,
    });

    console.log("MongoDB connected");
    return true;
  } catch (err) {
    console.warn("MongoDB connection failed, starting without database:", err.message);
    return false;
  }
}

module.exports = connectDB;
