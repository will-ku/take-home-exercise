import { createContext, useState, useEffect, useContext, useMemo } from "react";
import { useFiltersContext } from "./FiltersContext";
import { getProducts, getProductScores } from "../api";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const { selectedCharacteristics, search } = useFiltersContext();

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

  const filteredProducts =
    search?.length > 0
      ? products.filter((product) =>
          product.name.toLowerCase().includes(search.toLowerCase())
        )
      : products;

  return (
    <ProductsContext.Provider
      value={{
        products: filteredProducts,
        isLoadingProducts,
        productsError,
        scores,
        isLoadingScores,
        scoresError,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (context === null) {
    throw new Error(
      "useProductsContext must be used within a ProductsProvider. " +
        "Wrap a parent component in <ProductsProvider> to fix this error."
    );
  }
  return context;
};
