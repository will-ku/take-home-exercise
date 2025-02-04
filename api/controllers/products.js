import productServices from "../services/products.js";
import RequestCoalescer from "../middleware/requestCoalescer.js";
import { VALID_CHARACTERISTICS } from "../constants/productCharacteristics.js";

const requestCoalescer = new RequestCoalescer();

const getProducts = async (req, res) => {
  try {
    const { characteristics } = req.query;

    const { isValid, characteristics: characteristicsArray } =
      productServices.validateCharacteristics(characteristics);
    if (!isValid) return res.status(400).send("Invalid characteristics");

    const requestKey = characteristics
      ? characteristicsArray.join(",")
      : "allProducts";
    const products = await requestCoalescer.getOrExecute(requestKey, () => {
      return productServices.getProducts(characteristicsArray);
    });

    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Error fetching products");
  }
};

const getValidCharacteristics = async (_req, res) => {
  res.json(VALID_CHARACTERISTICS);
};

export default { getValidCharacteristics, getProducts };
