import React, { useState } from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

const PriceRange = ({ priceRange, setPriceRange }) => {

  const MAX_PRICE = 10000;

  const handleOnChange = (value) => {
    // If the user selects the max value, we consider it as 'no maximum'
    if (value.max === MAX_PRICE) {
      setPriceRange({ min: value.min, max: Infinity });
    } else {
      setPriceRange(value);
    }
  };


  return (
    <>
      <div className="range-wrapper">
        <InputRange
          formatLabel={() => ``}
          maxValue={10000}
          minValue={0}
          value={priceRange}
          onChange={(value) => handleOnChange(value)}
          id="slider"
        />
        <div className="d-flex align-items-center">
          <span id="slider-range-value1">{priceRange.min} DT</span>
          <i className="fa-sharp fa-solid fa-minus mx-2 dark-color icon" />
          <span id="slider-range-value2">
            {priceRange.max === Infinity ? 'Pas de limite' : `${priceRange.max} DT`}
          </span>
        </div>
      </div>
    </>
  );
};

export default PriceRange;
