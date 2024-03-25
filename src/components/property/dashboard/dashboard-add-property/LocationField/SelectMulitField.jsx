import React, { useState, useEffect } from "react";
import Select from "react-select";
import addressService from "@/services/address.service"; // Ensure the path matches your project structure

const customStyles = {
  option: (styles, { isFocused, isSelected, isHovered }) => ({
    ...styles,
    backgroundColor: isSelected
      ? "#0069ff"
      : isHovered
        ? "#0069ff12"
        : isFocused
          ? "#0069ff12"
          : undefined,
  }),
};

const SelectMultiField = ({ formData, setFormData, validation, setValidation }) => {
  const [optionsVillesList, setOptionsVillesList] = useState([]);
  const [optionsQuartiers, setOptionsQuartiers] = useState([]);
  const [loadingQuartiers, setLoadingQuartiers] = useState(false);

  useEffect(() => {
    const fetchVilles = async () => {
      try {
        const villes = await addressService.getVilles();
        const mappedVilles = villes.map((ville) => ({
          value: ville._id,
          label: ville.name,
        }));
        setOptionsVillesList(mappedVilles);
      } catch (error) {
        console.error('Error fetching villes:', error);
        // Implement user feedback for the error here (e.g., a toast notification)
      }
    };
    fetchVilles();
  }, []);

  useEffect(() => {
    if (formData.ville) {
      fetchQuartiersByVille(formData.ville);
    } else {
      setOptionsQuartiers([]);
    }
  }, [formData.ville]);

  const fetchQuartiersByVille = async (villeId) => {
    try {
      setLoadingQuartiers(true);
      const fetchedQuartiers = await addressService.getQuartiersByVille(villeId);
      setOptionsQuartiers(
        fetchedQuartiers.map((quartier) => ({
          value: quartier._id,
          label: quartier.name,
        }))
      );
    } catch (error) {
      console.error('Error fetching quartiers:', error);
      // Implement user feedback for the error here
    } finally {
      setLoadingQuartiers(false);
    }
  };

  const handleVilleChange = (selectedOption) => {
    setFormData({
      ...formData,
      ville: selectedOption ? selectedOption.value : '',
      quartier: ''
    });
    setValidation({
      ...validation,
      ville: !!selectedOption,
      quartier: false
    });
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

  return (
    <>
      <div className="col-sm-6 col-xl-4">
        <div className="mb20">
          <label className="heading-color ff-heading fw600 mb10">Sélectionnez une ville</label>
          <div className="location-area">
            <Select
              placeholder="Sélectionnez une ville"
              styles={customStyles}
              className={`select-custom ${validation.ville ? "" : "error"}`}
              classNamePrefix="select"
              options={optionsVillesList}
              onChange={handleVilleChange}
              menuPortalTarget={document.body}
              noOptionsMessage={() => "Aucune option disponible"}
              value={optionsVillesList.find(option => option.value === formData.ville)}
              isDisabled={false}
            />
          </div>
        </div>
      </div>

      <div className="col-sm-6 col-xl-4">
        <div className="mb20">
          <label className="heading-color ff-heading fw600 mb10">Sélectionnez un quartier</label>
          <div className="location-area">
            <Select
              placeholder="Sélectionnez un quartier"
              styles={customStyles}
              className={`select-custom ${validation.quartier ? "" : "error"}`}
              classNamePrefix="select"
              options={optionsQuartiers}
              onChange={handleQuartierChange}
              menuPortalTarget={document.body}
              noOptionsMessage={() => "Aucune option disponible"}
              value={optionsQuartiers.find(option => option.value === formData.quartier)}
              isDisabled={!formData.ville || loadingQuartiers}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectMultiField;
