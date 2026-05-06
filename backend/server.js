import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// ✅ ROUTES MUST BE HERE
app.get("/hello123", (req, res) => {
  res.send("HELLO WORKS");
});

app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// connect DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// ❌ THIS MUST BE LAST
app.listen(7000, () => {
  console.log("Server running on port 7000");
});