import React, { useState, useEffect } from "react";

const ListingStatus = ({ checkedTransactionType, setCheckedTransactionType }) => {
  const [selectedType, setSelectedType] = useState(checkedTransactionType);

  const options = [
    { id: "flexRadioDefault1", label: "Tout", value: "", defaultChecked: true },
    { id: "flexRadioDefault2", label: "Location", value: "Location", },
    { id: "flexRadioDefault3", label: "Vente", value: "Vente", },
  ];

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedType(selectedValue);
    setCheckedTransactionType(selectedValue);
  };

  useEffect(() => {
    setSelectedType(checkedTransactionType);
  }, [checkedTransactionType]);

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
            checked={selectedType === option.value}
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
