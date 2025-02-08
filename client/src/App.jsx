import React from "react";
import { useProductContext } from "./contexts/ProductsContext";
import Header from "./components/Header";
import LoadingGrid from "./components/LoadingGrid";
import ProductGrid from "./components/ProductGrid";
import Filter from "./components/Filter";
import "./App.css";

const App = () => {
  const { isLoadingProducts } = useProductContext();

  return (
    <div className="App">
      <Header />
      <main className="App-content">
        <Filter />
        {isLoadingProducts ? <LoadingGrid /> : <ProductGrid />}
      </main>
    </div>
  );
};

export default App;
