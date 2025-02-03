import express from "express";
import productControllers from "../controllers/productControllers.js";

const router = express.Router();

// Route to get all products from JSON Server
router.get("/", productControllers.getProducts);

// Route to get valid characteristics
router.get("/characteristics", productControllers.getValidCharacteristics);

export default router;
