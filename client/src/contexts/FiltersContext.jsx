import { createContext, useState, useEffect, useContext } from "react";
import { getCharacteristics } from "../api";

const FiltersContext = createContext(null);

const initialCharacteristics = () => {
  const params = new URLSearchParams(window.location.search);
  const characteristicsParam = params.get("characteristics");
  return characteristicsParam ? characteristicsParam.split(",") : [];
};

const initialSearch = () => {
  const params = new URLSearchParams(window.location.search);
  const searchParam = params.get("productName");
  return searchParam ? searchParam : "";
};

export const FiltersProvider = ({ children }) => {
  const [characteristics, setCharacteristics] = useState([]);
  const [selectedCharacteristics, setSelectedCharacteristics] = useState(
    initialCharacteristics()
  );
  const [search, setSearch] = useState(initialSearch());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacteristics = async () => {
      setIsLoading(true);
      try {
        const data = await getCharacteristics();
        setCharacteristics(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCharacteristics();
  }, []);

  const updateUrlParams = () => {
    const params = new URLSearchParams(window.location.search);

    if (selectedCharacteristics.length > 0) {
      params.set("characteristics", selectedCharacteristics.join(","));
    } else {
      params.delete("characteristics");
    }

    if (search) {
      params.set("productName", search);
    } else {
      params.delete("productName");
    }

    window.history.pushState(
      {},
      "",
      `${window.location.pathname}${params.toString() ? "?" + params : ""}`
    );
  };

  useEffect(() => {
    updateUrlParams();
  }, [selectedCharacteristics, search]);

  const toggleCharacteristic = (characteristic) => {
    const isSelected = selectedCharacteristics.includes(characteristic);

    if (isSelected) {
      const updatedCharacteristics = selectedCharacteristics.filter(
        (c) => c !== characteristic
      );
      setSelectedCharacteristics([...updatedCharacteristics]);
    } else {
      setSelectedCharacteristics([...selectedCharacteristics, characteristic]);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const clearFilters = () => {
    setSelectedCharacteristics([]);
    setSearch("");
  };

  return (
    <FiltersContext.Provider
      value={{
        characteristics,
        selectedCharacteristics,
        isLoading,
        error,
        toggleCharacteristic,
        search,
        handleSearch,
        clearFilters,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export const useFiltersContext = () => {
  const context = useContext(FiltersContext);
  if (context === null) {
    throw new Error("useFiltersContext must be used within a FiltersProvider");
  }
  return context;
};
