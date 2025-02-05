import NodeCache from "node-cache";
import productModels from "../models/products.js";
import {
  VALID_CHARACTERISTICS,
  CHARCTERISTIC_SCORES,
} from "../constants/productCharacteristics.js";

const cache = new NodeCache({ stdTTL: 300 });
const PRODUCTS_CACHE_KEY = "products"; // Array of all products
const CHARACTERISTICS_INDEX_KEY = "index"; // Index of products by characteristics
const SCORES_CACHE_KEY = "scores"; // An object with productId's and scores

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
  let products = cache.get(PRODUCTS_CACHE_KEY);
  let index = cache.get(CHARACTERISTICS_INDEX_KEY);

  if (!products || !index) {
    products = await productModels.getProducts();
    index = createIndexWithCharacteristics(products);
    cache.mset([
      { key: PRODUCTS_CACHE_KEY, val: products },
      { key: CHARACTERISTICS_INDEX_KEY, val: index },
      { key: SCORES_CACHE_KEY, val: {} },
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

const calculateScores = (product) => {
  let score = 0;

  product.characteristics.forEach((characteristic) => {
    score += CHARCTERISTIC_SCORES[characteristic];
  });

  return score;
};

const getProductScores = async () => {
  let productScores = cache.get(SCORES_CACHE_KEY) || {};

  if (Object.keys(productScores).length) return productScores;

  const products = await getProducts();

  products.forEach((product) => {
    const score = calculateScores(product);
    productScores[product.id] = score;
  });

  cache.set(SCORES_CACHE_KEY, productScores);

  return productScores;
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
  getProductScores,
  validateCharacteristics,
};
