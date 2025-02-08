import axios from "axios";

const BASE_API_URL = "http://localhost:3005";

export const getProducts = async (characteristics) => {
  const query = characteristics?.length
    ? `?characteristics=${characteristics.join(",")}`
    : "";
  const response = await axios.get(`${BASE_API_URL}/products${query}`);
  return response.data;
};

export const getProductScores = async () => {
  const response = await axios.get(`${BASE_API_URL}/products/scores`);
  return response.data;
};

export const getCharacteristics = async () => {
  const response = await axios.get(`${BASE_API_URL}/products/characteristics`);
  return response.data;
};
