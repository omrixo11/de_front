import React from "react";
import PropertyDescription from "./property-description";
import UploadMedia from "./upload-media";
import LocationField from "./LocationField";
import DetailsFiled from "./details-field";
import Amenities from "./Amenities";
import { useState, useEffect } from "react";
import propertyService from "@/services/property.service";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddPropertyTabContent = () => {

  const [activeTab, setActiveTab] = useState(1);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const [showValidationError, setShowValidationError] = useState(false);

  const [uploadedImages, setUploadedImages] = useState([]);

  const [articleLimitReached, setArticleLimitReached] = useState(false);

  const userId = useSelector((state) => state.auth.user._id);
  const token = useSelector((state) => state.auth.user.token);
  const isEmailVerified = useSelector((state) => state.auth.user.isEmailVerified);
  const maxPosts = useSelector((state) => state.auth.user.maxPosts);



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
    images: [''],

    ville: '',
    quartier: '',

    // isClimatisation: false,
    // isChauffageCentral: false,
    // isPlaceParcking: false,
    // isGarage: false,
    // isAscenceur: false,
    // isCameraSurveillance: false,
    // isCuisineEquiper: false,
    // isFour: false,
    // isHotte: false,
    // isConcierge: false,
    // isTerrasse: false,
    // isPiscine: false,
    // isJardin: false,
    // isPorteBlinder: false,
    // isVueSurMer: false,
    // isMachineLaver: false,
    // isCheminer: false,
    // isRefrigerateur: false,
    // isMicroOndes: false,
    // isInternet: false,
    // isChambreRangement: false,
    // isAnimauxDomestiquesAutorises: false,
    // isAvailable: true,
    // isAccepted: false,

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
    images: true,

    ville: true,
    quartier: true,

  });

  useEffect(() => {
    const checkArticleLimit = async () => {
      if (userId && token) {
        try {
          // Call the service method to count the user's articles
          const count = await propertyService.countUserArticles(userId, token);
          // Check if the count is greater than or equal to the limit
          if (count >= maxPosts) {
            setArticleLimitReached(true);
          } else {
            setArticleLimitReached(false);
          }
        } catch (error) {
          console.error("Error checking article limit:", error);
        }
      }
    };

    checkArticleLimit();
  }, [userId, token, maxPosts]);


  const handleArticleCreation = async (e) => {
    e.preventDefault();

    if (articleLimitReached) {
      alert("Vous avez atteint le nombre maximum d'articles que vous pouvez publier sans abonnement. Veuillez mettre à niveau votre abonnement pour publier plus d'articles.");
      return;
    }


    setShowValidationError(false);

    // Check for empty fields and update validation flags
    setValidation((prevValidation) => {
      const updatedValidation = {};
      Object.keys(formData).forEach((key) => {
        updatedValidation[key] = Boolean(formData[key].toString().trim());
      });
      return { ...prevValidation, ...updatedValidation };
    });

    // Wait for the state to be updated
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Check if any validation fails
    if (
      !Object.values(validation).every((isValid) => isValid) ||
      !Object.values(validation.images).every((isValid) => isValid)
    ) {
      setShowValidationError(true);
      return;
    }

    try {
      // Extracting only the 'value' from the selected options
      const articleDataToSend = {
        ...formData,
        propertyType: formData.propertyType.map((option) => option.value),
      };

      // Service method call
      const createdArticle = await propertyService.createArticle(
        articleDataToSend,
        auth.token,
        auth.user?._id,
        dispatch,
      );

      // If the article was successfully created, navigate to annonce
      if (createdArticle && createdArticle._id) {
        // navigate(`/single/${createdArticle._id}`);
      }

      // Further handling if needed
    } catch (error) {
      console.error('Error creating article:', error);
      setShowValidationError(true);
    }
  };


  const renderFooterButton = () => {
    if (activeTab === 4) {
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
            uploadedImages={uploadedImages}
            setUploadedImages={setUploadedImages}
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
      {!isEmailVerified && (
        <div className="p10 overflow-hidden" >
          <div className="p10 alert alert-warning text-center">
            Votre adresse e-mail n'est pas vérifiée. Veuillez vérifier votre adresse e-mail pour publier des annonces.
          </div>
        </div>
      )}

      {isEmailVerified && (
        <>
          {articleLimitReached && (
            <div className="p10 overflow-hidden">
              <div className="p10 alert alert-warning text-center">
                Limite d'annonces atteinte. Veuillez souscrire à un abonnement pour publier davantage.
              </div>
            </div>
          )}


          {showValidationError &&
            <div className="p10 overflow-hidden">
              <div className="alert alert-danger position-relative overflow-hidden text-center">
                Veuillez remplir tous les champs obligatoires.
              </div>
            </div>}

          {!articleLimitReached && (
            <>
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
                  {/* <button
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
              </button> */}
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

                {activeTab < 4 && (
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
          )}
        </>
      )}
    </>
  );
}

export default AddPropertyTabContent;
