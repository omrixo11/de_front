import React from "react";
import MultiSelectField from "./MultiSelectField";
import StructureType from "./StructureType";

const DetailsFiled = ({ formData, setFormData, validation, setValidation }) => {

  const handleInputChange = (fieldName, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: value,
    }));
    setValidation((prevValidation) => ({
      ...prevValidation,
      [fieldName]: value.trim() !== "",
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
              className={`form-control ${validation.surface ? '' : 'error is-invalid'}`}
              placeholder="Exemple: 230"
              value={formData.surface}
              onChange={(e) => handleInputChange("surface", e.target.value)}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Nombre de Chambre(s)</label>
            <input
              type="number"
              className={`form-control ${validation.bedrooms ? '' : 'error is-invalid'}`}
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
              Nombre de salle(s) de bain
            </label>
            <input
              type="number"
              className={`form-control ${validation.bathrooms ? '' : 'error is-invalid'}`}
              placeholder="Exemple: 2"
              value={formData.bathrooms}
              onChange={(e) => handleInputChange("bathrooms", e.target.value)}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Valable à partir de
            </label>
            <input
              type="date"
              className={`form-control ${validation.availableFrom ? '' : 'error is-invalid'}`}
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
