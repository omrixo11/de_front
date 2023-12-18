
import React, { useState } from "react";
import Select from "react-select";

const PropertyDescription = ({ formData, setFormData }) => {

  const [validation, setValidation] = useState({
    title: true,
    description: true,
    naturePropriete: true,
    propertyType: true,
    etatPropriete: true,
    transactionType: true,
    price: true,
  });
  

  const handleInputChange = (inputName, value) => {
    setFormData({
      ...formData,
      [inputName]: value,
    });
    // Validate the input and update the validation state
    setValidation((prevValidation) => ({
      ...prevValidation,
      [inputName]: typeof value === 'string' && value.trim() !== '',
    }));
  };

  const propertTypeOptions = [
    { value: "Appartement", label: "Appartement" },
    { value: "Bureau", label: "Bureau" },
    { value: "Chateau", label: "Château" },
    { value: "Commerce", label: "Commerce" },
    { value: "Duplex", label: "Duplex" },
    { value: "Maison", label: "Maison" },
    { value: "Loft", label: "Loft" },
    { value: "Ferme", label: "Ferme" },
    { value: "Terrain", label: "Terrain" },
    { value: "Studio", label: "Studio" },
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
              Nature de la propriété
            </label>
            <span className="text-muted ml-2"> (Sélection multiple possible) </span>
            <div className="location-area">
              <Select
                placeholder="Nature de la propriété"
                name="colors"
                options={natureProprieteOptions}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                required
                isMulti
                menuPortalTarget={document.body}
                value={formData.naturePropriete}
                onChange={(selectedOption) => handleInputChange("naturePropriete", selectedOption)}

              />
            </div>
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Type de propriété
            </label>
            <span className="text-muted ml-2"> (Sélection multiple possible) </span>
            <div className="location-area">
              <Select
                placeholder="Type de propriété"
                options={propertTypeOptions}
                styles={customStyles}
                className="select-custom pl-0"
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
              État de propriété
            </label>
            <div className="location-area">
              <Select
                placeholder="État de propriété"
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                required
                menuPortalTarget={document.body}
                options={etatProprieteOptions}
                value={formData.etatPropriete}
                onChange={(selectedOption) => handleInputChange("etatPropriete", selectedOption)}

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
                placeholder="Type de Transaction"
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                required
                menuPortalTarget={document.body}
                options={transactionTypeOptions}
                value={formData.transactionType}
                onChange={(selectedOption) => handleInputChange("transactionType", selectedOption)}

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
              className="form-control"
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
