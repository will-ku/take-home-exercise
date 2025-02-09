import { LoadingCardBottom } from "../LoadingGrid/LoadingGrid";
import ScoreTag from "../ScoreTag";

const SuggestedProductsContainer = ({ products, isLoading, error, scores }) => {
  if (isLoading) {
    return <LoadingCardBottom />;
  }

  if (error) {
    return <div role="alert">Error loading suggested products</div>;
  }

  if (products.length === 0) {
    return <div role="alert">No suggested products found</div>;
  }

  return (
    <div className="suggested-products-container">
      {products.map((product) => (
        <div
          className="suggested-product-card"
          title={`Navigate to product page for ${product.name}`}
          onClick={() => {
            alert(`Navigate to product page for ${product.name}`);
          }}
        >
          <h3 className="suggested-product-name">{product.name}</h3>
          <div className="suggested-product-score">
            <ScoreTag score={scores[product.id]} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SuggestedProductsContainer;
