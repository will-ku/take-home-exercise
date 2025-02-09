import React from "react";
import CharacteristicTag from "./CharacteristicTag";
import "./ProductCard.css";
import ScoreTag from "../ScoreTag";

const ProductCard = ({ product, isLoadingScores, score }) => {
  const handleClick = () => {
    window.history.pushState({}, "", `/product/${product.id}`);
    window.dispatchEvent(new CustomEvent("navigationChange"));
  };

  return (
    <div className="product-card card" onClick={handleClick}>
      <div className="product-card-header">
        <h3>{product.name}</h3>
        <p className="score">
          {isLoadingScores ? "Loading..." : <ScoreTag score={score} />}
        </p>
      </div>
      <div className="characteristics">
        {product.characteristics.map((char, charIndex) => (
          <CharacteristicTag key={charIndex} characteristic={char} />
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
