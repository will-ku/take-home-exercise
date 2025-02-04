import axios from "axios";

const jsonServerUrl = "http://localhost:4000";

const getProducts = async () => {
  const response = await axios.get(`${jsonServerUrl}/products`);
  return response.data;
};

export default { getProducts };
