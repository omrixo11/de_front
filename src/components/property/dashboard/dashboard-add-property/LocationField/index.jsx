import React from "react";
import SelectMulitField from "./SelectMulitField";


const LocationField = ({ formData, setFormData, handleArticleCreation, validation, setValidation }) => {

  const handleInputChange = (inputName, value) => {
    setFormData({
      ...formData,
      [inputName]: value,
    });

  };

  return (
    <form className="form-style1">
      <div className="row">
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Adresse Exacte
            </label>
            <span className="text-muted ml-2"> (Cette adresse ne sera pas visible pour les clients) </span>
            <input
              type="text"
              className="form-control"
              placeholder="Adresse ..."
              value={formData.adressExact}
              onChange={(e) => handleInputChange("adressExact", e.target.value)}
            />
          </div>
        </div>
        {/* End col-12 */}
        <SelectMulitField
          formData={formData}
          setFormData={setFormData}
          handleArticleCreation={handleArticleCreation}
          validation={validation}
          setValidation={setValidation}

        />
      </div>

    </form>
  );
};

export default LocationField;
