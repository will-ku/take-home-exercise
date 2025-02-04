import NodeCache from "node-cache";
import productModels from "../models/products.js";
import { VALID_CHARACTERISTICS } from "../constants/productCharacteristics.js";

const cache = new NodeCache({ stdTTL: 300 });
const CACHE_KEY = "products"; // All products
const INDEX_KEY = "index"; // Index of products by characteristics

const createIndexWithCharacteristics = (products) => {
  const index = {};

  products.forEach((product, productIndex) => {
    product.characteristics.forEach((characteristic) => {
      if (!(characteristic in index)) {
        index[characteristic] = new Set();
      }
      index[characteristic].add(productIndex);
    });
  });

  return index;
};

/**
 * Takes a set of characteristics and returns the products that match the characteristics.
 * If no characteristics are provided, it returns all products.
 */
const getProducts = async (characteristics) => {
  let products = cache.get(CACHE_KEY);
  let index = cache.get(INDEX_KEY);

  if (!products || !index) {
    products = await productModels.getProducts();
    index = createIndexWithCharacteristics(products);
    cache.mset([
      { key: CACHE_KEY, val: products },
      { key: INDEX_KEY, val: index },
    ]);
  }

  if (!characteristics) return products;

  const filteredProducts = new Set();

  for (const characteristic of characteristics) {
    const productIndices = index[characteristic];
    productIndices.forEach((productIndex) => {
      filteredProducts.add(products[productIndex]);
    });
  }

  return Array.from(filteredProducts);
};

/**
 * Validates the characteristics and returns an object with the validation result.
 *
 * @param {string} characteristics - Comma separated string of characteristics.
 * @returns {{ isValid: boolean, characteristics: string[] }} An object containing:
 *   - `isValid`: Indicates whether the input is valid.
 *   - `characteristics`: An array of valid characteristics, sorted alphabetically.
 */
const validateCharacteristics = (characteristics) => {
  if (!characteristics) return { isValid: true, characteristics: undefined }; // No characterstics provided or empty string are valid.

  if (typeof characteristics !== "string")
    return { isValid: false, characteristics: undefined };

  const characteristicsArray = characteristics.split(",").sort();

  for (const characteristic of characteristicsArray) {
    if (!VALID_CHARACTERISTICS.includes(characteristic)) {
      return { isValid: false, characteristics: undefined };
    }
  }

  return { isValid: true, characteristics: characteristicsArray };
};

export default {
  getProducts,
  validateCharacteristics,
};
