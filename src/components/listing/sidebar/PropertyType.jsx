import React from "react";

const PropertyType = ({ selectedPropertyTypes, handleTogglePropertyType }) => {

  const onChangeHandler = (optionLabel) => {
    handleTogglePropertyType(optionLabel);
  };

  const options = [
    { label: "Appartement" },
    { label: "Bureau" },
    { label: "Commerce" },
    { label: "Duplex" },
    { label: "Maison" },
    { label: "Ferme" },
    { label: "Loft" },
  ];

  return (
   <>
      {options.map((option, index) => (
        <label className="custom_checkbox" key={index}>
          {option.label}
          <input
            type="checkbox"
            checked={selectedPropertyTypes.includes(option.label)}
            onChange={() => onChangeHandler(option.label)}
          />
          <span className="checkmark" />
        </label>
      ))}
    </>
  );
};

export default PropertyType;
