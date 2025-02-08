import "./LoadingGrid.css";

const LoadingCard = () => (
  <div className="loading-card card">
    <div className="loading-title"></div>
    <div className="loading-score"></div>
    <div className="loading-characteristics">
      <div className="loading-tag"></div>
      <div className="loading-tag"></div>
      <div className="loading-tag"></div>
    </div>
  </div>
);

const LoadingGrid = () => (
  <div className="grid-container">
    {[...Array(6)].map((_, index) => (
      <LoadingCard key={index} />
    ))}
  </div>
);

export default LoadingGrid;
