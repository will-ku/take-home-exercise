import { useState, useEffect, useRef } from "react";
import { useFiltersContext } from "../../../contexts/FiltersContext";
import DropdownOption from "./CharacteristicDropdownOption";
import "../Filter.css";

const CharacteristicDropdown = () => {
  const { characteristics, selectedCharacteristics, toggleCharacteristic } =
    useFiltersContext();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const dropdownLabel = selectedCharacteristics.length
    ? selectedCharacteristics.join(", ")
    : "Filter by characteristics";

  useEffect(() => {
    const onClickOff = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", onClickOff);
    return () => document.removeEventListener("click", onClickOff);
  }, []);

  return (
    <div className="filter__characteristics">
      <label id="characteristics-label" className="screenreader-only">
        Filter by characteristics
      </label>
      <div className="filter__dropdown" ref={dropdownRef}>
        <button
          className="filter__button"
          onClick={() => setIsOpen(!isOpen)}
          aria-labelledby="characteristics-label"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls="characteristics-menu"
        >
          <span
            className={`filter__button-text ${
              selectedCharacteristics.length === 0
                ? "filter__button-inactive"
                : ""
            }`}
            title={dropdownLabel}
          >
            {dropdownLabel}
          </span>
          <span className="filter__button-icon" aria-hidden="true">
            {isOpen ? "▲" : "▼"}
          </span>
        </button>
        {isOpen && (
          <ul
            id="characteristics-menu"
            className="filter__menu"
            role="listbox"
            aria-multiselectable="true"
          >
            {characteristics.map((characteristic) => (
              <DropdownOption
                key={characteristic}
                isSelected={selectedCharacteristics.includes(characteristic)}
                characteristic={characteristic}
                toggleCharacteristic={toggleCharacteristic}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CharacteristicDropdown;
