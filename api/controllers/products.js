import productServices from "../services/products.js";
import RequestCoalescer from "../middleware/requestCoalescer.js";
import { VALID_CHARACTERISTICS } from "../constants/productCharacteristics.js";

const requestCoalescer = new RequestCoalescer();
const requestKeys = {
  allProducts: "allProducts",
  productScores: "productScores",
};

const getProducts = async (req, res) => {
  try {
    const { characteristics } = req.query;

    const { isValid, characteristics: characteristicsArray } =
      productServices.validateCharacteristics(characteristics);
    if (!isValid) return res.status(400).send("Invalid characteristics");

    const products = await requestCoalescer.getOrExecute(
      requestKeys.allProducts,
      () => productServices.getProducts(characteristicsArray)
    );

    res.json(products);
  } catch (error) {
    res.status(500).send("Error fetching products");
  }
};

const getProductsWithScores = async (_req, res) => {
  try {
    await requestCoalescer.awaitRequest(requestKeys.allProducts);
    const productScores = await requestCoalescer.getOrExecute(
      requestKeys.productScores,
      () => productServices.getProductScores()
    );

    res.json(productScores);
  } catch (error) {
    res.status(500).send("Error fetching product scores");
  }
};

const getValidCharacteristics = async (_req, res) => {
  res.json(VALID_CHARACTERISTICS);
};

export default { getValidCharacteristics, getProducts, getProductsWithScores };
