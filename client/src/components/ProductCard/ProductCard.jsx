import React from "react";
import "./ProductCard.css";

const ProductCard = ({ product, score }) => (
  <div className="product-card card">
    <h3>{product.name}</h3>
    <p className="score">Score: {score ? score.toFixed(1) : "N/A"}</p>
    <div className="characteristics">
      {product.characteristics.map((char, charIndex) => (
        <span key={charIndex} className="characteristic-tag">
          {char}
        </span>
      ))}
    </div>
  </div>
);

export default ProductCard;
