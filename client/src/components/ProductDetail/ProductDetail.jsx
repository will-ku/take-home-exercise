import { useState, useEffect } from "react";
import CharacteristicTag from "../ProductCard/CharacteristicTag";
import SuggestedProductsContainer from "./SuggestedProductsContainer";
import LoadingGrid from "../LoadingGrid";
import { useProductsContext } from "../../contexts/ProductsContext";
import "./ProductDetail.css";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const { products, isLoading, error, scores, isLoadingScores } =
    useProductsContext();

  useEffect(() => {
    if (!isLoading && products.length > 0) {
      const productId = window.location.pathname.split("/").pop();
      const product = products.find((p) => p.id === productId);
      setProduct(product);
    }
  }, [products, isLoading]);

  const determineSuggestedProducts = () => {
    const matchCounter = {};
    const otherProducts = products.filter((p) => p.id !== product.id);

    // Initialize counter
    otherProducts.forEach((otherProduct) => {
      matchCounter[otherProduct.id] = 0;
    });

    // Count matches
    otherProducts.forEach((otherProduct) => {
      otherProduct.characteristics.forEach((characteristic) => {
        if (product.characteristics.includes(characteristic)) {
          matchCounter[otherProduct.id]++;
        }
      });
    });
    console.log({ matchCounter });
    const sortedMatchCounter = Object.entries(matchCounter).sort(
      (a, b) => b[1] - a[1]
    );

    console.log({ sortedMatchCounter });
    const bestProductMatches = sortedMatchCounter
      .map(([id]) => products.find((p) => p.id === id))
      .slice(0, 3);

    console.log({ bestProductMatches });
    return bestProductMatches;
  };

  const calculateRelativeScore = () => {
    const otherScores = Object.entries(scores).filter(
      ([id]) => id !== product.id
    );

    let numScoresBetterOrSame = 0;

    otherScores.forEach(([id, score]) => {
      if (score <= scores[product.id]) {
        numScoresBetterOrSame++;
      }
    });

    return ((numScoresBetterOrSame / otherScores.length) * 100).toFixed(2);
  };

  if (isLoading || product === null) {
    return <LoadingGrid />;
  }

  return (
    <main className="product-detail">
      <div className="product-detail-header">
        <h1>{product.name}</h1>
        <div className="product-characteristics">
          {product.characteristics.map((characteristic) => (
            <CharacteristicTag characteristic={characteristic} />
          ))}
        </div>
      </div>
      <div className="product-description">
        <h3>Description</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi veniam
          ullam voluptate cum architecto. Illo voluptatum corrupti aperiam nisi
          odit dignissimos. Aliquam, debitis veniam facilis ducimus sit
          explicabo sunt saepe?
        </p>
      </div>
      <div className="product-ratings">
        <h3>Score</h3>
        <div className="product-ratings-content">
          {isLoadingScores ? (
            <p>Loading product scores...</p>
          ) : (
            <>
              <div className="product-rating-score">{scores[product.id]}</div>
              <div className="product-rating-score-description">
                <span>
                  This product scored the same or higher than
                  <b> {calculateRelativeScore()}%</b> of products.
                </span>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="suggested-products">
        <h3>Suggested Products</h3>
        <SuggestedProductsContainer
          products={determineSuggestedProducts()}
          scores={scores}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </main>
  );
};

export default ProductDetail;
