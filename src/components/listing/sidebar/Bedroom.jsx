import { useSelector } from "react-redux";
import React, { useEffect } from "react";


const Bedroom = ({ selectedBedroom, onChange }) => {
  const options = [
    { id: "0", label: "Tout", value: 0 },
    { id: "1", label: "1+", value: 1 },
    { id: "2", label: "2+", value: 2 },
    { id: "3", label: "3+", value: 3 },
    { id: "4", label: "4+", value: 4 },
    { id: "5", label: "5+", value: 5 },
  ];

  return (
    <>
    {options.map((option) => (
      <div className="selection" key={option.id}>
        <input
          id={option.id}
          type="radio"
          onChange={() => onChange(option.value)}
          value={option.value}
          name="beds"
          checked={selectedBedroom === option.value}
        />
        <label htmlFor={option.id}>{option.label}</label>
      </div>
    ))}
  </>
  );
};

export default Bedroom;
