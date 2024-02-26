import React from "react";

const Bedroom = ({ onChange }) => {
  const options = [
    { id: "Tout", label: "Tout", value: 0, defaultChecked: true },
    { id: "oneplus", label: "1+", value: 1 },
    { id: "twoplus", label: "2+", value: 2 },
    { id: "threeplus", label: "3+", value: 3 },
    { id: "fourplus", label: "4+", value: 4 },
    { id: "fiveplus", label: "5+", value: 5 },
  ];

  const handleOnChange = (event) => {
    const value = parseInt(event.target.value);
    onChange(value);
  };

  return (
    <>
      {options.map((option) => (
        <div className="selection" key={option.id}>
          <input
            id={option.id}
            type="radio"
            onChange={handleOnChange}
            value={option.value}
            name="bedroomSelection"
            
          />
          <label htmlFor={option.id}>{option.label}</label>
        </div>
      ))}
    </>
  );
};

export default Bedroom;
