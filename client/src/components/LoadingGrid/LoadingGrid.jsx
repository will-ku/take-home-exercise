import "./LoadingGrid.css";

export const LoadingCardBottom = () => (
  <div className="loading-characteristics">
    <div className="loading-tag"></div>
    <div className="loading-tag"></div>
    <div className="loading-tag"></div>
  </div>
);

export const LoadingCard = () => (
  <div className="loading-card card">
    <div className="loading-title"></div>
    <div className="loading-score"></div>
    <LoadingCardBottom />
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
