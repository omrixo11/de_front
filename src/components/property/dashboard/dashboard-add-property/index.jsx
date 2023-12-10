import React from "react";
import PropertyDescription from "./property-description";
import UploadMedia from "./upload-media";
import LocationField from "./LocationField";
import DetailsFiled from "./details-field";
import Amenities from "./Amenities";
import { useState } from "react";
import propertyService from "@/services/property.service";

const AddPropertyTabContent = () => {

  const [formData, setFormData] = useState({

    title: '',
    description: '',
    adress: '',
    neighborhood: '',
    notes:'',

    bathrooms: 0,
    bedrooms: 0,
    surface: 0,
    price: 0,

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

  const [createdArticle, setCreatedArticle] = useState(false);

  const handleArticleCreation = async () => {
    try {

      // Extracting only the 'value' from the selected options
      const articleDataToSend = {
        ...formData,
        naturePropriete: formData.naturePropriete.map(option => option.value),
        propertyType: formData.propertyType.map(option => option.value),
        // ... other properties with ame pattern (select multi)
      };
      console.log('Response from API:', formData);
      // Call the createArticle function from PropertyService with formData
      const createdArticle = await propertyService.createArticle(articleDataToSend);
    } catch (error) {
      console.error('Error creating article:', error);
      // Optionally, handle error states or display an error message
    }
  };

  return (
    <>
      <nav>
        <div className="nav nav-tabs" id="nav-tab2" role="tablist">
          <button
            className="nav-link active fw600 ms-3"
            id="nav-item1-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item1"
            type="button"
            role="tab"
            aria-controls="nav-item1"
            aria-selected="true"
          >
            1. Description
          </button>
          <button
            className="nav-link fw600"
            id="nav-item2-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item2"
            type="button"
            role="tab"
            aria-controls="nav-item2"
            aria-selected="false"
          >
            2. Photos
          </button>
          <button
            className="nav-link fw600"
            id="nav-item3-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item3"
            type="button"
            role="tab"
            aria-controls="nav-item3"
            aria-selected="false"
          >
            3. Adresse
          </button>
          <button
            className="nav-link fw600"
            id="nav-item4-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item4"
            type="button"
            role="tab"
            aria-controls="nav-item4"
            aria-selected="false"
          >
            4. Detailles
          </button>
          <button
            className="nav-link fw600"
            id="nav-item5-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item5"
            type="button"
            role="tab"
            aria-controls="nav-item5"
            aria-selected="false"
          >
            5. Commodités
          </button>
        </div>
      </nav>
      {/* End nav tabs */}

      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-item1"
          role="tabpanel"
          aria-labelledby="nav-item1-tab"
        >
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Description</h4>
            <PropertyDescription formData={formData} setFormData={setFormData} />
          </div>
        </div>
        {/* End tab for Property Description */}

        <div
          className="tab-pane fade"
          id="nav-item2"
          role="tabpanel"
          aria-labelledby="nav-item2-tab"
        >
          <UploadMedia formData={formData} setFormData={setFormData} />
        </div>
        {/* End tab for Upload photos of your property */}

        <div
          className="tab-pane fade"
          id="nav-item3"
          role="tabpanel"
          aria-labelledby="nav-item3-tab"
        >
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Adresse</h4>
            <LocationField formData={formData} setFormData={setFormData} />
          </div>
        </div>
        {/* End tab for Listing Location */}

        <div
          className="tab-pane fade"
          id="nav-item4"
          role="tabpanel"
          aria-labelledby="nav-item4-tab"
        >
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Detailles</h4>
            <DetailsFiled formData={formData} setFormData={setFormData} />
          </div>
        </div>
        {/* End tab for Listing Details */}

        <div
          className="tab-pane fade"
          id="nav-item5"
          role="tabpanel"
          aria-labelledby="nav-item5-tab"
        >
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
        </div>


        {/* End tab for Select Amenities */}
      </div>
    </>
  );
};

export default AddPropertyTabContent;
