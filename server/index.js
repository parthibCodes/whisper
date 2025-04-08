require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Message = require("./models/Message");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/whispr")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.get("/api/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Error fetching messages" });
  }
});

app.post("/api/messages", async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || text.length > 200) {
      return res
        .status(400)
        .json({ message: "Message must be between 1 and 200 characters" });
    }

    const message = new Message({ text });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: "Error creating message" });
  }
});

app.patch("/api/messages/:id/vote", async (req, res) => {
  try {
    const { vote } = req.body;
    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    message.votes += vote;
    await message.save();
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: "Error updating vote" });
  }
});

app.delete("/api/messages/:id", async (req, res) => {
  try {
    const message = await Message.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    res.json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting message" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
