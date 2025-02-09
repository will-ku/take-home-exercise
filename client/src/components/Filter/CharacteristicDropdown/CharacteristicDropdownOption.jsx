import "../Filter.css";

const DropdownOption = ({
  characteristic,
  toggleCharacteristic,
  isSelected,
}) => (
  <li
    key={characteristic}
    className="filter__option"
    role="option"
    aria-selected={isSelected}
  >
    <label className="filter__checkbox-label">
      <input
        type="checkbox"
        className="filter__checkbox"
        checked={isSelected}
        onChange={() => toggleCharacteristic(characteristic)}
      />
      <span className="filter__checkbox-text">{characteristic}</span>
    </label>
  </li>
);

export default DropdownOption;
