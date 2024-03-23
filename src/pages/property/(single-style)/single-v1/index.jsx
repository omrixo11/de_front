
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import EnergyClass from "@/components/property/property-single-style/common/EnergyClass";
import FloorPlans from "@/components/property/property-single-style/common/FloorPlans";
import HomeValueChart from "@/components/property/property-single-style/common/HomeValueChart";
import InfoWithForm from "@/components/property/property-single-style/common/more-info";
import NearbySimilarProperty from "@/components/property/property-single-style/common/NearbySimilarProperty";
import OverView from "@/components/property/property-single-style/common/OverView";
import PropertyAddress from "@/components/property/property-single-style/common/PropertyAddress";
import PropertyDetails from "@/components/property/property-single-style/common/PropertyDetails";
import PropertyFeaturesAminites from "@/components/property/property-single-style/common/PropertyFeaturesAminites";
import PropertyHeader from "@/components/property/property-single-style/common/PropertyHeader";
import PropertyNearby from "@/components/property/property-single-style/common/PropertyNearby";
import PropertyVideo from "@/components/property/property-single-style/common/PropertyVideo";
import PropertyViews from "@/components/property/property-single-style/common/property-view";
import ProperytyDescriptions from "@/components/property/property-single-style/common/ProperytyDescriptions";
import ReviewBoxForm from "@/components/property/property-single-style/common/ReviewBoxForm";
import VirtualTour360 from "@/components/property/property-single-style/common/VirtualTour360";
import AllReviews from "@/components/property/property-single-style/common/reviews";
import ContactWithAgent from "@/components/property/property-single-style/sidebar/ContactWithAgent";
import ScheduleTour from "@/components/property/property-single-style/sidebar/ScheduleTour";
import PropertyGallery from "@/components/property/property-single-style/single-v1/PropertyGallery";
import React from "react";
import MortgageCalculator from "@/components/property/property-single-style/common/MortgageCalculator";
import WalkScore from "@/components/property/property-single-style/common/WalkScore";

import { useSelector } from "react-redux";
import MetaData from "@/components/common/MetaData";
import { useParams } from "react-router-dom";
import propertyService from "@/services/property.service";
import { Suspense } from "react";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { fetchProperties } from "@/redux/thunks/propertyThunks";
import FeaturedListings from "@/components/home/home-v1/FeatuerdListings";
import { Link } from "react-router-dom";

const SingleV1 = () => {
  let params = useParams();

  const [articleData, setArticleData] = useState(null);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [metaInformation, setMetaInformation] = useState({
    title: "Dessa | Chargement ...",
  });

  const currentUser = useSelector((state) => state?.auth?.user); 

  useEffect(() => {
    if (articleData) {
      const metaDesc = `Découvrez cette propriété exceptionnelle située à ${articleData.address}, offrant ${articleData.features}. Avec ${articleData.bedrooms} chambres et ${articleData.bathrooms} salles de bain, cet espace de ${articleData.area} mètres carrés est parfait pour ceux qui recherchent ${articleData.description}. Contactez-nous pour plus d'informations et planifier une visite.`;
      setMetaInformation({
        title: `Dessa - ${articleData?.title}`,
        description: metaDesc,
      });
    }
  }, [articleData]);

  useEffect(() => {
    // Fetch article data based on the ID
    const fetchArticleData = async () => {
      try {
        const data = await propertyService.getArticleById(params._id);
        setArticleData(data);
        // Update metaInformation with the article's title
        setMetaInformation({
          title: `Dessa - ${data.title}`,
        });

        // await propertyService.incrementArticleViews(params._id);

        if (!currentUser || (currentUser && data?.user._id !== currentUser._id)) {
          await propertyService.incrementArticleViews(params._id);
        }

      } catch (error) {
        console.error("Error fetching article data:", error);
      }
    };

    fetchArticleData(); // Call the fetch function when the component mounts
  }, [params._id]); // Dependency array to re-run useEffect when params._id changes

  useEffect(() => {
    if (!articleData?._id) return;

    const fetchSimilarProperties = async () => {
      try {
        const data = await propertyService.getSimilarArticles(articleData?._id);
        setSimilarProperties(data);
      } catch (error) {
        console.error('Error fetching similar properties:', error);
      }
    };
    fetchSimilarProperties();
  }, [articleData]);

//Sponsored
  // const [showHeroSection, setShowHeroSection] = useState(true);
  // const [showFeaturedListings, setShowFeaturedListings] = useState(false); 
  // const dispatch = useDispatch();
  // const { properties, loading, error } = useSelector((state) => state.property);

  // useEffect(() => {
  //   dispatch(fetchProperties());
  // }, [dispatch]);

  // useEffect(() => {
  //   const sponsoredProperties = properties.filter(property => 
  //     property.boost && property.boost.status === "active"
  //   );
  //   setShowFeaturedListings(sponsoredProperties.length > 0);
  // }, [properties]);

  return (
    <>
    <MetaData meta={metaInformation} />
    {/* Main Header Nav */}
    <DefaultHeader />
    {/* End Main Header Nav */}

    {/* Mobile Nav  */}
    <MobileMenu />
    {/* End Mobile Nav  */}

    {/* Property All Single V1 */}
    <section className="pt60 pb90 bgc-f7">
      <div className="container">
        <div className="row">
          <Suspense fallback={<div>chargement ...</div>}>
            <PropertyHeader articleData={articleData} />
          </Suspense>
        </div>
        {/* End .row */}

        <div className="row mb30 mt30">
          <Suspense fallback={<div>chargement ...</div>}>
            <PropertyGallery articleData={articleData} />
          </Suspense>
        </div>
        {/* End .row */}

        <div className="row wrap">

          <div className="col-lg-12">
            <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
              <h4 className="title fz17 mb30"></h4>
              <div className="row">
                <OverView articleData={articleData} />
              </div>
            </div>
            {/* End .ps-widget */}


            <div className="column">
              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                <div className="widget-wrapper mb-0">
                  <h6 className="title fz17 mb30">Obtenir plus d'informations</h6>
                  <ContactWithAgent articleData={articleData} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End .row */}
  
          <>
        <div className="row mt30 align-items-center justify-content-between">
          <div className="col-auto">
            <div className="main-title">
              <h2 className="title"></h2>
              <p className="paragraph">

              </p>
            </div>
          </div>
          <div className="col-auto mb30">
            <div className="row align-items-center justify-content-center">
              <div className="col-auto">
                <button className="featured-prev__active swiper_button">
                  <i className="far fa-arrow-left-long" />
                </button>
              </div>
              <div className="col-auto">
                <div className="pagination swiper--pagination featured-pagination__active" />
              </div>
              <div className="col-auto">
                <button className="featured-next__active swiper_button">
                  <i className="far fa-arrow-right-long" />
                </button>
              </div>
            </div>
          </div>
        </div>
          <div className="row">
            <div className="col-lg-12">

              <div className="property-city-slider">
                <Suspense fallback={<div>chargement ...</div>}>
                  <NearbySimilarProperty similarProperties={similarProperties} />
                </Suspense>
              </div>

            </div>
          </div>
          </>
      </div>

      {/* {showFeaturedListings && (
       
          <div className="container">
            <div className="row">
              <div className="col-lg-12" data-aos="fade-up" data-aos-delay="200">
                <div className="feature-listing-slider">
                  <FeaturedListings />
                </div>
              </div>
            </div>
          </div>
       
      )} */}
     
    </section>
    {/* End Property All Single V1  */}

    {/* Start Our Footer */}
    <section className="footer-style1 pt60 pb-0">
      <Footer />
    </section>
    {/* End Our Footer */}
  </>
);
};


export default SingleV1;