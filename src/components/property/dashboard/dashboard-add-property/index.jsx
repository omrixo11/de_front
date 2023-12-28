import React from "react";
import PropertyDescription from "./property-description";
import UploadMedia from "./upload-media";
import LocationField from "./LocationField";
import DetailsFiled from "./details-field";
import Amenities from "./Amenities";
import { useState } from "react";
import propertyService from "@/services/property.service";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import LoadingSpinner from "@/components/loading/loading";

const AddPropertyTabContent = () => {

  const [activeTab, setActiveTab] = useState(1);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const isLoading = useSelector((state) => state.auth.loading);

  const handleTabChange = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  const handleNextTab = () => {
    if (activeTab < 5) {
      setActiveTab(activeTab + 1);
    }
  };

  const handlePrevTab = () => {
    if (activeTab > 1) {
      setActiveTab(activeTab - 1);
    }
  };

  const [formData, setFormData] = useState({

    title: '',
    description: '',
    adressExact: '',
    notes: '',
    costumId: '',
    availableFrom: '',

    bathrooms: '',
    bedrooms: '',
    surface: '',
    price: '',

    etatPropriete: '',
    transactionType: '',

    propertyType: [''],
    naturePropriete: [''],
    images: [''],

    //adress
    region: '',
    ville: '',
    quartier: '',

    isClimatisation: false,
    isChauffageCentral: false,
    isPlaceParcking: false,
    isGarage: false,
    isAscenceur: false,
    isCameraSurveillance: false,
    isCuisineEquiper: false,
    isFour: false,
    isHotte: false,
    isConcierge: false,
    isTerrasse: false,
    isPiscine: false,
    isJardin: false,
    isPorteBlinder: false,
    isVueSurMer: false,
    isMachineLaver: false,
    isCheminer: false,
    isRefrigerateur: false,
    isMicroOndes: false,
    isInternet: false,
    isChambreRangement: false,
    isAnimauxDomestiquesAutorises: false,
    isAvailable: true,
    isAccepted: false,

  });

  //Validation for css
  const [validation, setValidation] = useState({

    title: true,
    description: true,
    availableFrom: true,

    bathrooms: true,
    bedrooms: true,
    surface: true,
    price: true,

    etatPropriete: true,
    transactionType: true,

    propertyType: true,
    naturePropriete: true,
    images: true,

    region: true,
    ville: true,
    quartier: true,

  });

  const handleArticleCreation = async (e) => {
    e.preventDefault(); // Prevent the default form submission
  
    // Check for empty fields and update validation flags
    setValidation((prevValidation) => {
      const updatedValidation = {};
      Object.keys(formData).forEach((key) => {
        updatedValidation[key] = Boolean(formData[key].toString().trim());
      });
      return { ...prevValidation, ...updatedValidation };
    });
    console.log("validation::",validation);
  
    // Wait for the state to be updated
    await new Promise((resolve) => setTimeout(resolve, 0));
  
    // Check if any validation fails
    if (
      !Object.values(validation).every((isValid) => isValid) ||
      !Object.values(validation.images).every((isValid) => isValid)
    ) {
      // If validation fails, you can handle it as per your application requirements.
      console.log("Validation failed. Please fill in all required fields and upload at least one photo.");
      return;
    }
  
    try {
      // Extracting only the 'value' from the selected options
      const articleDataToSend = {
        ...formData,
        naturePropriete: formData.naturePropriete.map((option) => option.value),
        propertyType: formData.propertyType.map((option) => option.value),
      };
  
      // Service method call
      const createdArticle = await propertyService.createArticle(
        articleDataToSend,
        auth.token,
        auth.user._id,
        dispatch,
      );
  
      // Further handling if needed
    } catch (error) {
      console.error('Error creating article:', error);
    }
  };

  const renderFooterButton = () => {
    if (activeTab === 5) {
      return (

        <Link
          type="submit"
          className="ud-btn btn-thm mb40 ml20"
          onClick={handleArticleCreation}
        >
          Ajouter
          <i className="fal fa-arrow-right-long" />
        </Link>

      );
    }
    return null;
  };


  // Render the content based on the activeTab
  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        return (
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Description</h4>
            <PropertyDescription
              formData={formData}
              setFormData={setFormData}
              validation={validation}
              setValidation={setValidation}
            />
          </div>
        );
      case 2:
        return (
          <UploadMedia
            formData={formData}
            setFormData={setFormData}
            validation={validation}
            setValidation={setValidation}
          />
        );
      case 3:
        return (
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Adresse</h4>
            <LocationField
              formData={formData}
              setFormData={setFormData}
              validation={validation}
              setValidation={setValidation} />
          </div>
        );
      case 4:
        return (
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Detailles</h4>
            <DetailsFiled
              formData={formData}
              setFormData={setFormData}
              validation={validation}
              setValidation={setValidation}
            />
          </div>
        );
      case 5:
        return (
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Commodités</h4>
            <div className="row">
              <Amenities
                formData={formData}
                setFormData={setFormData}
                handleArticleCreation={handleArticleCreation}
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };


  return (
    <>
    {isLoading && <LoadingSpinner />}
      <nav>
        <div className="nav nav-tabs" id="nav-tab2" role="tablist">
          <button
            className={`nav-link ${activeTab === 1 ? 'active' : ''} fw600 ms-3`}
            id="nav-item1-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item1"
            type="button"
            role="tab"
            aria-controls="nav-item1"
            aria-selected={activeTab === 1}
            onClick={() => handleTabChange(1)}
          >
            1. Description
          </button>
          <button
            className={`nav-link ${activeTab === 2 ? 'active' : ''} fw600 ms-3`}
            id="nav-item2-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item2"
            type="button"
            role="tab"
            aria-controls="nav-item2"
            aria-selected={activeTab === 2}
            onClick={() => handleTabChange(2)}
          >
            2. Photos
          </button>
          <button
            className={`nav-link ${activeTab === 3 ? 'active' : ''} fw600 ms-3`}
            id="nav-item3-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item3"
            type="button"
            role="tab"
            aria-controls="nav-item3"
            aria-selected={activeTab === 3}
            onClick={() => handleTabChange(3)}
          >
            3. Adresse
          </button>
          <button
            className={`nav-link ${activeTab === 4 ? 'active' : ''} fw600 ms-3`}
            id="nav-item4-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item4"
            type="button"
            role="tab"
            aria-controls="nav-item4"
            aria-selected={activeTab === 4}
            onClick={() => handleTabChange(4)}
          >
            4. Detailles
          </button>
          <button
            className={`nav-link ${activeTab === 5 ? 'active' : ''} fw600 ms-3`}
            id="nav-item5-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item5"
            type="button"
            role="tab"
            aria-controls="nav-item5"
            aria-selected={activeTab === 5}
            onClick={() => handleTabChange(5)}
          >
            5. Commodités
          </button>
        </div>
      </nav>
      {/* End nav tabs */}


      <div className="tab-content" id="nav-tabContent">
        {renderTabContent()}
      </div>

      {/* Footer with navigation arrows */}
      <div className="text-center mt-4">
        {activeTab > 1 && (
          <Link
            className="ud-btn btn-white2 mb40"
            onClick={handlePrevTab}
          >Précédent
            <i className="fas fa-arrow-left"></i>
          </Link>
        )}

        {activeTab < 5 && (
          <Link
            className="ud-btn btn-white mb40 ml20"
            onClick={handleNextTab}
          >Suivant
            <i className="fas fa-arrow-right"></i>
          </Link>
        )}

        {renderFooterButton()}
      </div>

    </>
  );
};

export default AddPropertyTabContent;
