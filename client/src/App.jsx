import { useState, useEffect } from "react";
import Header from "./components/Header";
import ProductGrid from "./components/ProductGrid";
import Filter from "./components/Filter";
import ProductDetailPage from "./components/ProductDetail";
import "./App.css";

const App = () => {
  const [isProductPage, setIsProductPage] = useState(false);

  useEffect(() => {
    // This is a workaround to handle navigation to the Product Detail Page, in lieu of a router library.

    // Handle initial page load
    setIsProductPage(window.location.pathname.includes("/product/"));

    // Use browser events to track navigation
    const handleNavigation = () => {
      setIsProductPage(window.location.pathname.includes("/product/"));
    };
    window.addEventListener("popstate", handleNavigation);
    window.addEventListener("navigationChange", handleNavigation);

    return () => {
      window.removeEventListener("popstate", handleNavigation);
      window.removeEventListener("navigationChange", handleNavigation);
    };
  }, []);

  return (
    <div className="App">
      <Header />
      <main className="App-content">
        {isProductPage ? (
          <ProductDetailPage />
        ) : (
          <>
            <Filter />
            <ProductGrid />
          </>
        )}
      </main>
    </div>
  );
};

export default App;
