import express from "express";
import axios from "axios";

const router = express.Router();
const jsonServerUrl = "http://localhost:4000"; // Adjust if necessary

// Route to get all posts from JSON Server
router.get("/", async (req, res) => {
  try {
    const response = await axios.get(`${jsonServerUrl}/products`);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).send("Error fetching posts");
  }
});

export default router;
