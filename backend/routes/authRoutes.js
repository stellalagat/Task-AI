import express from "express";
import { registerUser, login } from "../controllers/authController.js";

const router = express.Router();

// TEST ROUTE
router.get("/test", (req, res) => {
  res.send("Auth working");
});

router.post("/register", registerUser);
router.post("/login", login);

export default router;