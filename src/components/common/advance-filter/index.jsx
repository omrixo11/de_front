import React, { useState } from "react";
import Select from "react-select";
import PriceRange from "./PriceRange";
import Bedroom from "./Bedroom";
import { useDispatch } from "react-redux";
import { setPropertyTypes, setMinPrice, setMaxPrice, setBedroomFilter } from "@/redux/slices/propertySlice";
import { useNavigate } from 'react-router-dom';

const AdvanceFilterModal = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: Infinity });
  const [selectedBedroom, setSelectedBedroom] = useState(0);

  const catOptions = [
    { value: "Appartement", label: "Appartement" },
    { value: "Bureau", label: "Bureau" },
    { value: "Commerce", label: "Commerce" },
    { value: "Duplex", label: "Duplex" },
    { value: "Maison", label: "Maison" },
    { value: "Ferme", label: "Ferme" },
    { value: "Loft", label: "Loft" },
  ];

  const customStyles = {
    option: (styles, { isFocused, isSelected, isHovered }) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? "#0069ff"
          : isHovered
            ? "#0069ff12"
            : isFocused
              ? "#0069ff12"
              : undefined,
      };
    },
  };

  const handleSubmit = () => {
    dispatch(setPropertyTypes(selectedPropertyTypes));
    dispatch(setMinPrice(priceRange.min));
    dispatch(setMaxPrice(priceRange.max));
    dispatch(setBedroomFilter(selectedBedroom))
    navigate('/grid');
  };

  const handleReset = () => {
    setSelectedPropertyTypes([]);
    setPriceRange({ min: 0, max: Infinity });
    setSelectedBedroom(0);
  };

  const handleBedroomChange = (value) => {
    setSelectedBedroom(value);
  };

  return (
    <div className="modal-dialog modal-dialog-centered modal-lg">
      {/* Modal content */}
      <div className="modal-content">
        {/* Modal header */}
        <div className="modal-header pl30 pr30">
          <h5 className="modal-title" id="exampleModalLabel">Plus de Filtres</h5>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        {/* Modal body */}
        <div className="modal-body pb-0">
          <div className="row">
            <div className="col-lg-12">
              <div className="widget-wrapper">
                <h6 className="list-title mb20">Prix</h6>
                <div className="range-slider-style modal-version">
                  <PriceRange priceRange={priceRange} setPriceRange={setPriceRange} />
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Type</h6>
                <div className="form-style2 input-group">
                  <Select
                    defaultValue={[catOptions[1]]}
                    name="colors"
                    options={catOptions}
                    styles={customStyles}
                    className="select-custom"
                    classNamePrefix="select"
                    onChange={(selectedOptions) => {
                      // Check if selectedOptions is truthy
                      if (selectedOptions) {
                        // If it's an array, extract values
                        if (Array.isArray(selectedOptions)) {
                          const selectedValues = selectedOptions.map(option => option.value);
                          setSelectedPropertyTypes(selectedValues);
                        } else {
                          // If it's a single value, extract the value directly
                          setSelectedPropertyTypes([selectedOptions.value]);
                        }
                      } else {
                        // Handle the case where selectedOptions is falsy
                        setSelectedPropertyTypes([]);
                      }
                    }}
                  />

                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="widget-wrapper">
                <h6 className="list-title">Chambres</h6>
                <div className="d-flex">
                  <Bedroom onChange={handleBedroomChange} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Modal footer */}
        <div className="modal-footer justify-content-between">
          <button className="reset-button" onClick={handleReset}>
            <span className="flaticon-turn-back" />
            <u>Réinitialiser tous les filtres</u>
          </button>
          <div className="btn-area">
            <button data-bs-dismiss="modal" type="button" className="ud-btn btn-thm" onClick={handleSubmit}>
              <span className="flaticon-search align-text-top pr10" />
              Rechercher
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvanceFilterModal;
