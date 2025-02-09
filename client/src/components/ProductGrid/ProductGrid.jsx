import { useProductsContext } from "../../contexts/ProductsContext";
import ProductCard from "../ProductCard";
import LoadingGrid from "../LoadingGrid";
import "./ProductGrid.css";

const EmptyProductGrid = () => (
  <div className="grid-container empty-grid">
    <p>No products found. Try adjusting your filters.</p>
  </div>
);

const ProductGrid = () => {
  const { products, scores, isLoadingProducts, isLoadingScores } =
    useProductsContext();

  if (isLoadingProducts) {
    return <LoadingGrid />;
  }

  if (products.length === 0) {
    return <EmptyProductGrid />;
  }

  return (
    <div className="grid-container">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isLoadingScores={isLoadingScores}
          score={scores[product.id]}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
