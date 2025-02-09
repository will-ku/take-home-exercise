import { useFiltersContext } from "../../../contexts/FiltersContext";
import ClearSearchButton from "./ClearSearchButton";

const SearchBar = () => {
  const { handleSearch, search } = useFiltersContext();

  const clearSearch = () => {
    handleSearch({ target: { value: "" } });
  };

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search by product name..."
          onChange={(e) => handleSearch(e)}
          value={search}
        />
        {search && <ClearSearchButton clearSearch={clearSearch} />}
      </div>
    </div>
  );
};

export default SearchBar;
