import React from "react";
import SelectMulitField from "./SelectMulitField";


const LocationField = ({ formData, setFormData }) => {

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
              Address
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Adress ..." 
              value={formData.adress}
              onChange={(e) => handleInputChange("adress", e.target.value)}
            />
          </div>
        </div>
        {/* End col-12 */}
        <SelectMulitField />
      </div>

    </form>
  );
};

export default LocationField;
