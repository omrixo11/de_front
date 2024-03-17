import React from "react";
import { Link } from "react-router-dom"
import propertyService from "@/services/property.service";

const Amenities = ({ formData, setFormData }) => {

  const handleCheckboxChange = (key) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [key]: !prevFormData[key],
    }));
  };

  return (
    <>
      {/* <h6>Select Amenities</h6> */}

      <div className="row">


        <div className="col-sm-6 col-lg-3 col-xxl-2">
          <div className="checkbox-style1">
            <label className="custom_checkbox">
              <input
                type="checkbox"
                value={formData.isClimatisation}
                onChange={() => handleCheckboxChange("isClimatisation")}
              />
              Climatisation
              <span className="checkmark" />
            </label>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3 col-xxl-2">
          <div className="checkbox-style1">
            <label className="custom_checkbox">
              <input
                type="checkbox"
                value={formData.isChauffageCentral}
                onChange={() => handleCheckboxChange("isChauffageCentral")}

              />
                            
              Chauffage Centrale
              <span className="checkmark" />
            </label>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3 col-xxl-2">
          <div className="checkbox-style1">
            <label className="custom_checkbox">
              <input
                type="checkbox"
                value={formData.isPlaceParcking}
                onChange={() => handleCheckboxChange("isPlaceParcking")}

              />
              Place parcking
              <span className="checkmark" />
            </label>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3 col-xxl-2">
          <div className="checkbox-style1">
            <label className="custom_checkbox">
              <input
                type="checkbox"
                value={formData.isGarage}
                onChange={() => handleCheckboxChange("isGarage")}

              />
              Garage
              <span className="checkmark" />
            </label>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3 col-xxl-2">
          <div className="checkbox-style1">
            <label className="custom_checkbox">
              <input
                type="checkbox"
                value={formData.isAscenceur}
                onChange={() => handleCheckboxChange("isAscenceur")}

              />
              Ascenceur
              <span className="checkmark" />
            </label>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3 col-xxl-2">
          <div className="checkbox-style1">
            <label className="custom_checkbox">
              <input
                type="checkbox"
                value={formData.isCameraSurveillance}
                onChange={() => handleCheckboxChange("isCameraSurveillance")}

              />
              Caméra surveillance
              <span className="checkmark" />
            </label>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3 col-xxl-2">
          <div className="checkbox-style1">
            <label className="custom_checkbox">
              <input
                type="checkbox"
                value={formData.isCuisineEquiper}
                onChange={() => handleCheckboxChange("isCuisineEquiper")}

              />
              Cuisine Equiper
              <span className="checkmark" />
            </label>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3 col-xxl-2">
          <div className="checkbox-style1">
            <label className="custom_checkbox">
              <input
                type="checkbox"
                value={formData.isFour}
                onChange={() => handleCheckboxChange("isFour")}

              />
              Four
              <span className="checkmark" />
            </label>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3 col-xxl-2">
          <div className="checkbox-style1">
            <label className="custom_checkbox">
              <input
                type="checkbox"
                value={formData.isHotte}
                onChange={() => handleCheckboxChange("isHotte")}

              />
              Hotte
              <span className="checkmark" />
            </label>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3 col-xxl-2">
          <div className="checkbox-style1">
            <label className="custom_checkbox">
              <input
                type="checkbox"
                value={formData.isConcierge}
                onChange={() => handleCheckboxChange("isConcierge")}

              />
              Concierge
              <span className="checkmark" />
            </label>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3 col-xxl-2">
          <div className="checkbox-style1">
            <label className="custom_checkbox">
              <input
                type="checkbox"
                value={formData.isTerrasse}
                onChange={() => handleCheckboxChange("isTerrasse")}

              />
              Terrasse
              <span className="checkmark" />
            </label>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3 col-xxl-2">
          <div className="checkbox-style1">
            <label className="custom_checkbox">
              <input
                type="checkbox"
                value={formData.isPiscine}
                onChange={() => handleCheckboxChange("isPiscine")}

              />
              Piscine
              <span className="checkmark" />
            </label>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3 col-xxl-2">
          <div className="checkbox-style1">
            <label className="custom_checkbox">
              <input
                type="checkbox"
                value={formData.isJardin}
                onChange={() => handleCheckboxChange("isJardin")}

              />
              Jardin
              <span className="checkmark" />
            </label>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3 col-xxl-2">
          <div className="checkbox-style1">
            <label className="custom_checkbox">
              <input
                type="checkbox"
                value={formData.isPorteBlinder}
                onChange={() => handleCheckboxChange("isPorteBlinder")}

              />
              Porte blinder
              <span className="checkmark" />
            </label>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3 col-xxl-2">
          <div className="checkbox-style1">
            <label className="custom_checkbox">
              <input
                type="checkbox"
                value={formData.isVueSurMer}
                onChange={() => handleCheckboxChange("isVueSurMer")}

              />
              Vue sur mer
              <span className="checkmark" />
            </label>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3 col-xxl-2">
          <div className="checkbox-style1">
            <label className="custom_checkbox">
              <input
                type="checkbox"
                value={formData.isMachineLaver}
                onChange={() => handleCheckboxChange("isMachineLaver")}

              />
              Machine à laver
              <span className="checkmark" />
            </label>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3 col-xxl-2">
          <div className="checkbox-style1">
            <label className="custom_checkbox">
              <input
                type="checkbox"
                value={formData.isCheminer}
                onChange={() => handleCheckboxChange("isCheminer")}

              />
              Cheminer
              <span className="checkmark" />
            </label>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3 col-xxl-2">
          <div className="checkbox-style1">
            <label className="custom_checkbox">
              <input
                type="checkbox"
                value={formData.isRefrigerateur}
                onChange={() => handleCheckboxChange("isRefrigerateur")}

              />
              Refrigerateur
              <span className="checkmark" />
            </label>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3 col-xxl-2">
          <div className="checkbox-style1">
            <label className="custom_checkbox">
              <input
                type="checkbox"
                value={formData.isMicroOndes}
                onChange={() => handleCheckboxChange("isMicroOndes")}

              />
              Micro Ondes
              <span className="checkmark" />
            </label>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3 col-xxl-2">
          <div className="checkbox-style1">
            <label className="custom_checkbox">
              <input
                type="checkbox"
                value={formData.isInternet}
                onChange={() => handleCheckboxChange("isInternet")}

              />
              Cable internet
              <span className="checkmark" />
            </label>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3 col-xxl-2">
          <div className="checkbox-style1">
            <label className="custom_checkbox">
              <input
                type="checkbox"
                value={formData.isChambreRangement}
                onChange={() => handleCheckboxChange("isChambreRangement")}

              />
              Chambre rangement
              <span className="checkmark" />
            </label>
          </div>
        </div>

        <div className="col-sm-6 col-lg-3 col-xxl-2">
          <div className="checkbox-style1">
            <label className="custom_checkbox">
              <input
                type="checkbox"
                value={formData.isAnimauxDomestiquesAutorises}
                onChange={() => handleCheckboxChange("isAnimauxDomestiquesAutorises")}

              />
              Animaux autorises
              <span className="checkmark" />
            </label>
          </div>
        </div>

      </div>
    </>


  );
};

export default Amenities;
