
import React, { useState } from "react";
import Select from "react-select";

const PropertyDescription = ({ formData, setFormData }) => {

  const handleInputChange = (inputName, value) => {
    setFormData({
      ...formData,
      [inputName]: value,
    });
  };

  const propertTypeOptions = [
    { value: "Apartments", label: "Apartments" },
    { value: "Bungalow", label: "Bungalow" },
    { value: "Houses", label: "Houses" },
    { value: "Loft", label: "Loft" },
    { value: "Bureau", label: "Bureau" },
    { value: "Townhome", label: "Townhome" },
    { value: "Villa", label: "Villa" },
  ];

  const transactionTypeOptions = [

    { value: "location", label: "Location" },
    { value: "vente", label: "Vente" },

  ];

  const natureProprieteOptions = [
    { value: "Habitation", label: "Habitation" },
    { value: "Profesionnels", label: "Profesionnels" },
    { value: "Vacances", label: "Vacances" },
    { value: "Terrain", label: "Terrain" },
    { value: "Industrielle", label: "Industrielle" },
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

  return (

    <form className="form-style1">
      <div className="row">
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Titre</label>
            <input
              type="text"
              className="form-control"
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
              cols={30}
              rows={5}
              placeholder="Description ..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Type de propriété
            </label>
            <div className="location-area">
              <Select
                defaultValue={[propertTypeOptions[1]]}
                name="colors"
                options={propertTypeOptions}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                required
                isMulti
                menuPortalTarget={document.body}
              />
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Type de Transaction
            </label>
            <div className="location-area">
              <Select
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                required
                menuPortalTarget={document.body}
                options={transactionTypeOptions}

              />
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Nature de la propriété
            </label>
            <div className="location-area">
              <Select
                defaultValue={[natureProprieteOptions[1]]}
                name="colors"
                options={natureProprieteOptions}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                required
                isMulti
                menuPortalTarget={document.body}
              />
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              État de propriété
            </label>
            <div className="location-area">
              <Select
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                required
                menuPortalTarget={document.body}
                options={etatProprieteOptions}
              />
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              Prix en TND
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Exemple: 1500"
            />
          </div>
        </div>

      </div>

    </form>
  );
};

export default PropertyDescription;
