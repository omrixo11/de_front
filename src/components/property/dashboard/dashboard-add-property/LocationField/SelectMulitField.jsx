import React from "react";
import Select from "react-select";
import adressService from "@/services/adress.service";
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

const SelectMultiField = () => {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedVille, setSelectedVille] = useState(null);
  const [selectedQuartier, setSelectedQuartier] = useState(null);
  const [optionsVillesList, setOptionsVillesList] = useState([]);
  const [optionsQuartiers, setOptionsQuartiers] = useState([]);
  const [loadingQuartiers, setLoadingQuartiers] = useState(false);

  useEffect(() => {
    fetchRegions();
  }, []);

  useEffect(() => {
    setOptionsVillesList([]);
  }, [selectedRegion]);

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
    setSelectedRegion(selectedOption);
    setSelectedVille(null);
    setSelectedQuartier(null);
    setOptionsVillesList([]);
    setOptionsQuartiers([])
    if (selectedOption) {
      fetchVillesByRegion(selectedOption.value);
    } else {
      // Reset the value when no region is selected
      setOptionsVillesList([]);
    }
  };

  const handleVilleChange = (selectedOption) => {
    setSelectedVille(selectedOption);
    setSelectedQuartier(null);
    setOptionsQuartiers([]);
    if (selectedOption) {
      fetchQuartiersByVille(selectedOption.value);
    }
  };

  const optionsRegions = regions.map((region) => ({
    value: region._id,
    label: region.name,
  }));

  const optionsVilles = optionsVillesList.map((ville) => ({
    value: ville.value,
    label: ville.label,
  }));

  return (
    <>
      <div className="col-sm-6 col-xl-4">
        <div className="mb20">
          <label className="heading-color ff-heading fw600 mb10">Sélectionner Région</label>
          <div className="location-area">
            <Select
            placeholder='Sélectionner Région'
              styles={customStyles}
              className="select-custom pl-0"
              classNamePrefix="select"
              required
              options={optionsRegions}
              onChange={handleRegionChange}
              menuPortalTarget={document.body}
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
                className="select-custom pl-0"
                classNamePrefix="select"
                required
                options={optionsVilles}
                onChange={handleVilleChange}
                menuPortalTarget={document.body}
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
                className="select-custom pl-0"
                classNamePrefix="select"
                required
                options={optionsQuartiers}
                menuPortalTarget={document.body}
                isDisabled={loadingQuartiers}
              />
            </div>
          </div>
        </div>
    
    </>
  );
};

export default SelectMultiField;