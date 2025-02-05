import express from "express";
import productControllers from "../controllers/products.js";

const router = express.Router();

// Route to get all products from JSON Server
router.get("/", productControllers.getProducts);

// Route to get products with their calculated scores
router.get("/scores", productControllers.getProductsWithScores);

// Route to get valid characteristics
router.get("/characteristics", productControllers.getValidCharacteristics);

export default router;
