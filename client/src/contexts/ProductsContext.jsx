import { createContext, useState, useEffect, useContext } from "react";
import { useFiltersContext } from "./FiltersContext";
import { getProducts, getProductScores } from "../api";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const { selectedCharacteristics } = useFiltersContext();

  const [products, setProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [productsError, setProductsError] = useState(null);

  const [scores, setScores] = useState([]);
  const [isLoadingScores, setIsLoadingScores] = useState(false);
  const [scoresError, setScoresError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoadingProducts(true);
      try {
        const data = await getProducts(selectedCharacteristics);
        setProducts(data);
      } catch (err) {
        setProductsError(err);
      } finally {
        setIsLoadingProducts(false);
      }
    };

    fetchProducts();
  }, [selectedCharacteristics]);

  useEffect(() => {
    const fetchScores = async () => {
      setIsLoadingScores(true);
      try {
        const data = await getProductScores();
        setScores(data);
      } catch (err) {
        setScoresError(err);
      } finally {
        setIsLoadingScores(false);
      }
    };

    fetchScores();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        products,
        isLoadingProducts,
        productsError,
        scores,
        isLoadingScores,
        scoresError,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === null) {
    throw new Error(
      "useProductContext must be used within a ProductProvider. " +
        "Wrap a parent component in <ProductProvider> to fix this error."
    );
  }
  return context;
};
