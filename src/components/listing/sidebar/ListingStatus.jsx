import React, { useState, useEffect } from "react";

const ListingStatus = ({ checkedTransactionType, setCheckedTransactionType }) => {
  const [selectedType, setSelectedType] = useState(checkedTransactionType);

  const options = [
    { id: "flexRadioDefault1", label: "Tout", defaultChecked: true },
    { id: "flexRadioDefault2", label: "Location" },
    { id: "flexRadioDefault3", label: "Vente" },
  ];

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedType(selectedValue);
    setCheckedTransactionType(selectedValue);
  };

  return (
    <>
      {options.map((option) => (
        <div
          className="form-check d-flex align-items-center mb10"
          key={option.id}
        >
          <input
            className="form-check-input"
            type="radio"
            id={option.id}
            value={option.label}
            checked={selectedType === option.label}
            onChange={handleOptionChange}
          />
          <label className="form-check-label" htmlFor={option.id}>
            {option.label}
          </label>
        </div>
      ))}
    </>
  );
};

export default ListingStatus;
