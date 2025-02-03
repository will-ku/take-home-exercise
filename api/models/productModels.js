import axios from "axios";

const jsonServerUrl = "http://localhost:4000";

const getAllProducts = async () => {
  const response = await axios.get(`${jsonServerUrl}/products`);
  return response.data;
};

export default { getAllProducts };
