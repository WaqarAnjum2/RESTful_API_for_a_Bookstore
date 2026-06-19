const path = require("path");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const booksRoutes = require("./routes/books.routes");
const itemsRoutes = require("./routes/items.routes");
const notesRoutes = require("./routes/notes.routes");
const messagesRoutes = require("./routes/messages.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/books", booksRoutes);
app.use("/api/books", booksRoutes);
app.use("/api/items", itemsRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/messages", messagesRoutes);

// Basic UI
app.use(express.static(path.join(__dirname, "..", "public")));

const PORT = process.env.PORT || 4000;

async function start() {
  const connected = await connectDB();

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
    if (!connected) {
      console.log("Database is offline; API routes that require MongoDB will fail until the connection is fixed.");
    }
  });
}

start().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
