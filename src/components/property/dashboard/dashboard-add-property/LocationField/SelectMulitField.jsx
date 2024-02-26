import React from "react";
import Select from "react-select";
import adressService from "@/services/address.service";
import { useState, useEffect } from "react";

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

const SelectMultiField = ({ formData, setFormData, validation, setValidation }) => {

  const [regions, setRegions] = useState([]);
  const [optionsVillesList, setOptionsVillesList] = useState([]);
  const [optionsQuartiers, setOptionsQuartiers] = useState([]);
  const [loadingQuartiers, setLoadingQuartiers] = useState(false);

  useEffect(() => {
    fetchRegions();
    // Automatically fetch villes when a region is already selected
    if (formData.region) fetchVillesByRegion(formData.region);
    // Automatically fetch quartiers when a ville is already selected
    if (formData.ville) fetchQuartiersByVille(formData.ville);
  }, [formData.region, formData.ville]); // React to changes in formData.region and formData.ville

  const fetchRegions = async () => {
    try {
      const fetchedRegions = await adressService.getRegions();
      setRegions(fetchedRegions);
    } catch (error) {
      console.error('Error fetching regions:', error);
    }
  };

  const fetchVillesByRegion = async (regionId) => {
    try {
      const fetchedVilles = await adressService.getVillesByRegion(regionId);
      setOptionsVillesList(
        fetchedVilles.map((ville) => ({
          value: ville._id,
          label: ville.name,
        }))
      );
    } catch (error) {
      console.error('Error fetching villes:', error);
    }
  };

  const fetchQuartiersByVille = async (villeId) => {
    try {
      setLoadingQuartiers(true);
      const fetchedQuartiers = await adressService.getQuartiersByVille(villeId);

      setOptionsQuartiers(
        fetchedQuartiers.map((quartier) => ({
          value: quartier._id,
          label: quartier.name,
        }))
      );
    } catch (error) {
      console.error('Error fetching quartiers:', error);
    } finally {
      setLoadingQuartiers(false);
    }
  };

  const handleRegionChange = (selectedOption) => {
    // Directly update formData for region, ville, and quartier
    setFormData({
      ...formData,
      region: selectedOption ? selectedOption.value : '',
      ville: '',
      quartier: ''
    });
    setValidation({
      ...validation,
      region: !!selectedOption,
      ville: false, // Reset ville validation
      quartier: false // Reset quartier validation
    });
    if (selectedOption) fetchVillesByRegion(selectedOption.value);
  };

  const handleVilleChange = (selectedOption) => {
    // Set the new ville and reset the quartier in formData
    setFormData({
      ...formData,
      ville: selectedOption ? selectedOption.value : '',
      quartier: '' // Reset quartier when ville is changed
    });
    setValidation({
      ...validation,
      ville: !!selectedOption,
      quartier: false // Reset quartier validation
    });
    if (selectedOption) {
      fetchQuartiersByVille(selectedOption.value);
    } else {
      // Also clear quartiers options when no ville is selected
      setOptionsQuartiers([]);
    }
  };


  const handleQuartierChange = (selectedOption) => {
    setFormData({
      ...formData,
      quartier: selectedOption ? selectedOption.value : ''
    });
    setValidation({
      ...validation,
      quartier: !!selectedOption
    });
  };


  const optionsRegions = regions.map((region) => ({
    value: region._id,
    label: region.name,
  }));

  const optionsVilles = optionsVillesList.map((ville) => ({
    value: ville.value,
    label: ville.label,
  }));

  // Determine if Ville and Quartier selects should be disabled
  const isVilleDisabled = !formData.region; // Ville select is disabled if no region is selected
  const isQuartierDisabled = !formData.ville || loadingQuartiers; // Quartier select is disabled if no ville is selected or quartiers are loading

  return (
    <>
      <div className="col-sm-6 col-xl-4">
        <div className="mb20">
          <label className="heading-color ff-heading fw600 mb10">Sélectionner Région</label>
          <div className="location-area">
            <Select
              placeholder='Sélectionner Région'
              styles={customStyles}
              className={`select-custom ${validation.region ? "" : "error"}`}
              classNamePrefix="select"
              required
              options={optionsRegions}
              onChange={handleRegionChange}
              menuPortalTarget={document.body}
              noOptionsMessage={() => "Aucune option disponible"}
              value={optionsRegions.find(option => option.value === formData.region)}

            />
          </div>
        </div>
      </div>

      <div className="col-sm-6 col-xl-4">
        <div className="mb20">
          <label className="heading-color ff-heading fw600 mb10">Sélectionner Ville</label>
          <div className="location-area">
            <Select
              placeholder='Sélectionner Ville'
              styles={customStyles}
              className={`select-custom ${validation.ville ? "" : "error"}`}
              classNamePrefix="select"
              required
              options={optionsVilles}
              onChange={handleVilleChange}
              menuPortalTarget={document.body}
              noOptionsMessage={() => "Aucune option disponible"}
              value={optionsVillesList.find(option => option.value === formData.ville)}
              isDisabled={isVilleDisabled}

            />
          </div>
        </div>
      </div>

      <div className="col-sm-6 col-xl-4">
        <div className="mb20">
          <label className="heading-color ff-heading fw600 mb10">Sélectionner Quartier</label>
          <div className="location-area">
            <Select
              placeholder='Sélectionner Quartier'
              styles={customStyles}
              className={`select-custom ${validation.quartier ? "" : "error"}`}
              classNamePrefix="select"
              required
              options={optionsQuartiers}
              menuPortalTarget={document.body}
              onChange={handleQuartierChange}
              noOptionsMessage={() => "Aucune option disponible"}
              value={optionsQuartiers.find(option => option.value === formData.quartier)} 
              isDisabled={isQuartierDisabled}
            />

          </div>
        </div>
      </div>

    </>
  );
};

export default SelectMultiField;