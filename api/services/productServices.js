import productModels from "../models/productModels.js";
import { VALID_CHARACTERISTICS } from "../constants/productConstants.js";

const getProducts = async (characteristics = null) => {
  const allProducts = await productModels.getAllProducts();

  if (!characteristics) return allProducts;

  const filteredProducts = allProducts.filter((product) => {
    return product.characteristics.some((characteristic) =>
      characteristics.includes(characteristic)
    );
  });

  return filteredProducts;
};

const validateCharacteristics = (characteristics) => {
  if (!characteristics) return true; // No characterstics provided or empty string are valid.

  if (typeof characteristics !== "string") return false;

  const characteristicsArray = new Set(characteristics.split(","));

  for (const characteristic of characteristicsArray) {
    if (!VALID_CHARACTERISTICS.includes(characteristic)) {
      return false;
    }
  }

  return true;
};

export default {
  getProducts,
  validateCharacteristics,
};
