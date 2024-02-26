import React, { useState } from "react";
import SearchBox from "./SearchBox";
import ListingStatus from "./ListingStatus";
import PropertyType from "./PropertyType";
import PriceSlider from "./PriceRange";
import Bedroom from "./Bedroom";
import Bathroom from "./Bathroom";
import Location from "./Location";
import SquareFeet from "./SquareFeet";
import YearBuilt from "./YearBuilt";
import OtherFeatures from "./OtherFeatures";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "@/redux/slices/searchSlice";
import { setTransactionType, setPropertyTypes, setMinPrice, setMaxPrice, setBedroomFilter, setEtatPropriete } from "@/redux/slices/propertySlice";
import Etat from "./Etat";

const ListingSidebar = () => {

  const [searchQuery, setSearchQueryLocal] = useState("");
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState([]);
  const [checkedTransactionType, setCheckedTransactionType] = useState("");
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });
  const [selectedBedroom, setSelectedBedroom] = useState(0);
  const [etat, setEtat] = useState("");
  const dispatch = useDispatch();


  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setSearchQuery(searchQuery));
    dispatch(setTransactionType(checkedTransactionType));
    dispatch(setPropertyTypes(selectedPropertyTypes));
    dispatch(setMinPrice(priceRange.min));
    dispatch(setMaxPrice(priceRange.max));
    dispatch(setBedroomFilter(selectedBedroom));
    dispatch(setEtatPropriete(etat));
    scrollToTop();
  };

  const resetFilters = () => {
    setSearchQueryLocal("");
    setSelectedPropertyTypes([]);
    setCheckedTransactionType("");
    setPriceRange({ min: 0, max: 100000 });
    setSelectedBedroom(0);
    setEtatPropriete("");
  };

  const handleReset = () => {
    resetFilters();
    dispatch(setSearchQuery(""));
    dispatch(setTransactionType(""));
    dispatch(setEtatPropriete(""))
    dispatch(setPropertyTypes([]));
    dispatch(setMinPrice(0));
    dispatch(setMaxPrice(100000));
    dispatch(setBedroomFilter(0));
    scrollToTop();
  };

  const handleEtatChange = (value) => {
    setEtat(value);
};

  const handleTogglePropertyType = (propertyType) => {
    if (selectedPropertyTypes.includes(propertyType)) {
      setSelectedPropertyTypes(selectedPropertyTypes.filter((type) => type !== propertyType));
    } else {
      setSelectedPropertyTypes([...selectedPropertyTypes, propertyType]);
    }
  };

  const handleChange = (event) => {
    setSearchQueryLocal(event.target.value);
  };

  const handleBedroomChange = (value) => {
    setSelectedBedroom(value);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="list-sidebar-style1">
      <div className="widget-wrapper">
        {/* <h6 className="list-title">Trouver votre ...</h6> */}
        <SearchBox searchQuery={searchQuery} handleChange={handleChange} handleSubmit={handleSubmit} />
      </div>
      {/* End .widget-wrapper */}

      <div className="widget-wrapper">
        <h6 className="list-title">Type de Transaction</h6>
        <div className="radio-element">
          <ListingStatus checkedTransactionType={checkedTransactionType} setCheckedTransactionType={setCheckedTransactionType} />
        </div>
      </div>

      <div className="widget-wrapper">
        <h6 className="list-title">État</h6>
        <div className="radio-element">
          <Etat checkedEtatPropriete={etat} setEtatPropriete={handleEtatChange} />
        </div>
      </div>


      {/* End .widget-wrapper */}

      <div className="widget-wrapper">
        <h6 className="list-title">Type de Propriété</h6>
        <div className="checkbox-style1">
          <PropertyType selectedPropertyTypes={selectedPropertyTypes} handleTogglePropertyType={handleTogglePropertyType} />
        </div>
      </div>

      {/* End .widget-wrapper */}

      <div className="widget-wrapper">
        <h6 className="list-title">Prix</h6>
        {/* Range Slider Desktop Version */}
        <div className="range-slider-style1">
          <PriceSlider priceRange={priceRange} setPriceRange={setPriceRange} />
        </div>
      </div>
      {/* End .widget-wrapper */}

      <div className="widget-wrapper">
        <h6 className="list-title">Chambre(s)</h6>
        <div className="d-flex">
          <Bedroom onChange={handleBedroomChange} />
        </div>
      </div>
      {/* End .widget-wrapper */}

      {/* <div className="widget-wrapper">
        <h6 className="list-title">Bathrooms</h6>
        <div className="d-flex">
          <Bathroom />
        </div>
      </div> */}
      {/* End .widget-wrapper */}

      {/* <div className="widget-wrapper advance-feature-modal">
        <h6 className="list-title">Location</h6>
        <div className="form-style2 input-group">
          <Location />
        </div>
      </div> */}
      {/* End .widget-wrapper */}

      {/* <div className="widget-wrapper">
        <h6 className="list-title">Square Feet</h6>
        <SquareFeet />
      </div> */}
      {/* End .widget-wrapper */}

      {/* <div className="widget-wrapper">
        <h6 className="list-title">Year Built</h6>
        <YearBuilt />
      </div> */}
      {/* End .widget-wrapper */}

      {/* <div className="widget-wrapper">
        <div className="feature-accordion">
          <div className="accordion" id="accordionExample">
            <div className="accordion-item border-none">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button border-none p-0 after-none feature-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <span className="flaticon-settings" /> Autres caractéristiques
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body p-0 mt15">
                  <OtherFeatures />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* End .widget-wrapper */}

      <div className="widget-wrapper mb20">
        <div className="btn-area d-grid align-items-center">
          <button className="ud-btn btn-thm" onClick={handleSubmit}>
            <span className="flaticon-search align-text-top pr10" />
            Rechercher
          </button>
        </div>
      </div>
      {/* End .widget-wrapper */}

      <div className="reset-area d-flex align-items-center justify-content-between">
        <div className="reset-button cursor" onClick={handleReset} >
          <span className="flaticon-turn-back" />
          <u>Réinitialiser tous les filtres</u>
        </div>
        {/* <a className="reset-button" href="#">
          <span className="flaticon-favourite" />
          <u>Save Search</u>
        </a> */}
      </div>
    </div>
  );
};

export default ListingSidebar;
