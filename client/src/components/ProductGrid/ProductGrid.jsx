import React from "react";
import ProductCard from "../ProductCard";
import { useProductContext } from "../../contexts/ProductsContext";

const ProductGrid = () => {
  const { products, scores } = useProductContext();

  return (
    <div className="grid-container">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          score={scores[product.id]}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
