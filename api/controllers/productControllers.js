import productServices from "../services/productServices.js";
import { VALID_CHARACTERISTICS } from "../constants/productConstants.js";

const getProducts = async (req, res) => {
  try {
    const { characteristics } = req.query;
    const areCharacteristicsValid =
      productServices.validateCharacteristics(characteristics);

    if (!areCharacteristicsValid) {
      return res.status(400).send("Invalid characteristics");
    }

    const products = await productServices.getProducts(characteristics);
    console.log("products", products);
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
