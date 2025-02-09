import { useFiltersContext } from "../../contexts/FiltersContext";

const ClearFiltersButton = () => {
  const { clearFilters } = useFiltersContext();

  return (
    <button
      title="Clears all filters"
      aria-label="Clears all filters"
      className="clear-all-filters-button"
      onClick={clearFilters}
    >
      Clear All
    </button>
  );
};

export default ClearFiltersButton;
