import CharacteristicDropdown from "./CharacteristicDropdown/CharacteristicDropdown";
import SearchBar from "./NameSearchBar/SearchBar";
import ClearFiltersButton from "./ClearFiltersButton";
import "./Filter.css";

const Filter = () => {
  return (
    <div className="filter">
      <SearchBar />
      <CharacteristicDropdown />
      <ClearFiltersButton />
    </div>
  );
};

export default Filter;
