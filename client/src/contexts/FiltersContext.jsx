import { createContext, useState, useEffect, useContext } from "react";
import { getCharacteristics } from "../api";

const FilterContext = createContext(null);

export const FilterProvider = ({ children }) => {
  const initialCharacteristics = () => {
    const params = new URLSearchParams(window.location.search);
    const characteristicsParam = params.get("characteristics");
    return characteristicsParam ? characteristicsParam.split(",") : [];
  };
  const [characteristics, setCharacteristics] = useState([]);
  const [selectedCharacteristics, setSelectedCharacteristics] = useState(
    initialCharacteristics()
  );
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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const updateUrl = (params) => {
      if (selectedCharacteristics.length > 0) {
        params.set("characteristics", selectedCharacteristics.join(","));
      } else {
        params.delete("characteristics");
      }
      window.history.pushState({}, "", `${window.location.pathname}?${params}`);
    };
    updateUrl(params);
  }, [selectedCharacteristics]);

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

  return (
    <FilterContext.Provider
      value={{
        characteristics,
        selectedCharacteristics,
        isLoading,
        error,
        toggleCharacteristic,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export const useFiltersContext = () => {
  const context = useContext(FilterContext);
  if (context === null) {
    throw new Error("useFiltersContext must be used within a FilterProvider");
  }
  return context;
};
