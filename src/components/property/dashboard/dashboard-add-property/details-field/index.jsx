import React from "react";
import MultiSelectField from "./MultiSelectField";
import StructureType from "./StructureType";

const DetailsFiled = ({ formData, setFormData }) => {

  const handleInputChange = (fieldName, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));
  };

  return (
    <form className="form-style1">
      <div className="row">
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Surface en m²
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Exemple: 230"
              value={formData.surface}
              onChange={(e) => handleInputChange("surface", e.target.value)}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Nombre des Chambres</label>
            <input
              type="number"
              className="form-control"
              placeholder="Exemple: 3"
              value={formData.bedrooms}
              onChange={(e) => handleInputChange("bedrooms", e.target.value)}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Nombre des toilettes
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Exemple: 2"
              value={formData.bathrooms}
              onChange={(e) => handleInputChange("bathrooms", e.target.value)}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Valable a partir de
            </label>
            <input
              type="date"
              className="form-control"
              placeholder="99.aa.yyyy"
              value={formData.availableFrom}
              onChange={(e) => handleInputChange("availableFrom", e.target.value)}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
            Identifiant Personnalisé
            </label>
            <span className="text-muted ml-2"> (optionnel) </span>
            <input
              type="text"
              className="form-control"
              placeholder="Identifiant ..."
              value={formData.costumId}
              onChange={(e) => handleInputChange("costumId", e.target.value)}
            />
          </div>
        </div>
        
      </div>


      <div className="row">
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Notes
            </label>
            <span className="text-muted ml-2"> (Ces notes ne seront pas visibles par les clients) </span>
            <textarea
              cols={30}
              rows={5}
              placeholder="Ajoutez des notes ici..."
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
            />
          </div>
        </div>

      </div>
    </form>
  );
};

export default DetailsFiled;
