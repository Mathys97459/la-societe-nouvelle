import React from 'react';

const MenuDeroulant = ({ options, selectedOption, onSelect }) => {
  if (!Array.isArray(options)) {
    return null;
  }

  return (
    <select value={selectedOption} onChange={(e) => onSelect(e.target.value)}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default MenuDeroulant;
