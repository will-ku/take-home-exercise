const ClearSearchButton = ({ clearSearch }) => (
  <button
    className="clear-button"
    onClick={clearSearch}
    aria-label="Clear search"
  >
    x
  </button>
);

export default ClearSearchButton;
