import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const BASE_API_URL = "http://localhost:3005";

const App = () => {
  const [products, setProducts] = useState([]);

  // This initial data fetch is just to verify your setup is working.
  // Feel free to modify or remove it as you build your solution.
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/products`);
        setProducts(response.data);
        console.log('Products loaded:', response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="App">
      <header className="header">
        <h1>Product Compass</h1>
      </header>
      <div className="setup-message">
        ✅ If you're seeing the list of products below, everything is up and running!
      </div>
      <div>
        {products.map((product, index) => (
          <div key={index} className="product-item">
            <h3>{product.name}</h3>
            {product.characteristics.map((char, charIndex) => (
              <span key={charIndex} className="characteristic-tag">
                {char}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
