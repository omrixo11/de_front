
import React, { useState } from "react";
import Select from "react-select";
import { useEffect } from "react";

const PropertyDescription = ({ formData, setFormData, validation, setValidation }) => {

  const [filteredPropertyTypeOptions, setFilteredPropertyTypeOptions] = useState([]);
  const [isPropertyTypeDisabled, setIsPropertyTypeDisabled] = useState(true);

  useEffect(() => {
    if (formData.transactionType) {
      setIsPropertyTypeDisabled(false);
      setFilteredPropertyTypeOptions(filterPropertyOptions(formData.transactionType));
    } else {
      setIsPropertyTypeDisabled(true);
    }
  }, [formData.transactionType, formData.propertyType]);

  // const handleInputChange = (inputName, selectedOption) => {
  //   let updatedValue = selectedOption;

  //   // If the input is a Select component value, extract the value
  //   if (selectedOption && selectedOption.value !== undefined) {
  //     updatedValue = selectedOption.value;
  //   }

  //   setFormData({
  //     ...formData,
  //     [inputName]: updatedValue,
  //   });

  //   setValidation((prevValidation) => ({
  //     ...prevValidation,
  //     [inputName]: (
  //       (Array.isArray(updatedValue) && updatedValue.length > 0) ||
  //       (typeof updatedValue === 'string' && updatedValue.trim() !== '')
  //     ),
  //   }));

  // };

  const handleInputChange = (inputName, selectedOption) => {
    let updatedValue = selectedOption;

    // If the input is a Select component value, extract the value
    if (selectedOption && selectedOption.value !== undefined) {
      updatedValue = selectedOption.value;
    }

    if (inputName === 'transactionType') {
      // Determine the new property type options based on the selected transaction type
      const newPropertyTypeOptions = filterPropertyOptions(updatedValue);
      const newPropertyTypeValues = newPropertyTypeOptions.map(option => option.value);

      // Filter out any property types from formData that are not in the new filtered options
      const newPropertyTypeSelection = Array.isArray(formData.propertyType)
        ? formData.propertyType.filter(selectedProperty => newPropertyTypeValues.includes(selectedProperty.value))
        : [];

      setFormData({
        ...formData,
        [inputName]: updatedValue,
        propertyType: newPropertyTypeSelection, // Set to the filtered property types
      });

      // Adjust validation for propertyType based on the new selection
      setValidation((prevValidation) => ({
        ...prevValidation,
        [inputName]: !!updatedValue,
        propertyType: newPropertyTypeSelection.length > 0
      }));

      // Update the filtered property type options in the state
      setFilteredPropertyTypeOptions(newPropertyTypeOptions);
    } else {
      // If it's not the transactionType that's changing, proceed as normal
      setFormData({
        ...formData,
        [inputName]: updatedValue,
      });

      setValidation((prevValidation) => ({
        ...prevValidation,
        [inputName]: (
          (Array.isArray(updatedValue) && updatedValue.length > 0) ||
          (typeof updatedValue === 'string' && updatedValue.trim() !== '')
        ),
      }));
    }
  };

  const sortOptionsAlphabetically = (options) => {
    return [...options].sort((a, b) => a.label.localeCompare(b.label, 'en', { sensitivity: 'base' }));
  };
  
  const propertTypeOptions = [

    { value: "Appartement", label: "Appartement" },
    { value: "Bureau", label: "Bureau" },
    { value: "Chateau", label: "Château" },
    { value: "Duplex", label: "Duplex" },
    { value: "Triplex", label: "Triplex" },
    { value: "Maison", label: "Maison" },
    { value: "Loft", label: "Loft" },
    { value: "localCommercial", label: "Local commercial" },
    { value: "Ferme", label: "Ferme" },
    { value: "Terrain", label: "Terrain" },
    { value: "Studio", label: "Studio" },
    { value: "Villa", label: "Villa" },
    { value: "Chambre", label: "Chambre" },

  ];

  const transactionTypeOptions = [

    { value: "Location", label: "Location" },
    { value: "Vente", label: "Vente" },
    { value: "Location Vacances", label: "Location Vacances" },

  ];

  const etatProprieteOptions = [
    { value: "Neuf", label: "Neuf" },
    { value: "BonEtat", label: "Bon état" },
    { value: "ARenover", label: "À rénover" },
    { value: "EnConstruction", label: "En construction" },
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

  const filterPropertyOptions = (transactionType) => {
    switch (transactionType) {
      case "Vente":
        return propertTypeOptions.filter(option => option.value !== "Chambre");
      case "Location Vacances":
        return propertTypeOptions.filter(option => !["Ferme", "localCommercial", "Terrain", "Bureau"].includes(option.value));
      default:
        return propertTypeOptions;
    }
  };

  const propertyTypeOptionsSorted = sortOptionsAlphabetically(filteredPropertyTypeOptions);
  const transactionTypeOptionsSorted = sortOptionsAlphabetically(transactionTypeOptions);
  const etatProprieteOptionsSorted = sortOptionsAlphabetically(etatProprieteOptions);  

  return (

    <form className="form-style1">

      <div className="row">

        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Titre
            </label>
            <input
              type="text"
              className={`form-control ${validation.title ? "" : "error is-invalid"}`}
              placeholder="Titre ..."
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
            />
          </div>
        </div>


        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Description
            </label>
            <textarea
              className={`form-control textarea-control ${validation.description ? "" : "error is-invalid"}`}
              placeholder="Description ..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Type de Transaction
            </label>
            <div className="location-area">
              <Select
                placeholder="Type de Transaction"
                styles={customStyles}
                className={`select-custom ${validation.transactionType ? "" : "error"}`}
                classNamePrefix="select"
                required
                menuPortalTarget={document.body}
                options={transactionTypeOptionsSorted}
                value={transactionTypeOptions.find(option => option.value === formData.transactionType)}
                onChange={(selectedOption) => handleInputChange("transactionType", selectedOption)}
              />
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Type de bien
            </label>
            <span className="text-muted ml-2"> (Sélection multiple possible) </span>
            <div className="location-area">
              <Select
                isDisabled={isPropertyTypeDisabled} // Controlled by state
                placeholder="Type de bien"
                options={propertyTypeOptionsSorted}
                styles={customStyles}
                className={`select-custom ${validation.propertyType ? "" : "error is-invalid"}`}
                classNamePrefix="select"
                required
                isMulti
                menuPortalTarget={document.body}
                value={formData.propertyType}
                onChange={(selectedOption) => handleInputChange("propertyType", selectedOption)}
              />
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              État de bien
            </label>
            <div className="location-area">
              <Select
                placeholder="État de bien"
                options={etatProprieteOptionsSorted}
                styles={customStyles}
                className={`select-custom ${validation.etatPropriete ? "" : "error is-invalid"}`}
                classNamePrefix="select"
                required
                menuPortalTarget={document.body}
                value={etatProprieteOptions.find(option => option.value === formData.etatPropriete)}
                onChange={(selectedOption) => handleInputChange("etatPropriete", selectedOption)}
              />
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              Prix en TND
            </label>
            <span className="text-muted ml-2"> (Exemple: 1500) </span>
            <input
              type="number"
              className={`form-control ${validation.price ? "" : "error is-invalid"}`}
              placeholder="Exemple: 1500"
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
            />
          </div>
        </div>

      </div>

    </form>
  );
};

export default PropertyDescription;
