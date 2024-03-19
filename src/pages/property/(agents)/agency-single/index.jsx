import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import FormContact from "@/components/property/FormContact";

import ProfessionalInfo from "@/components/property/ProfessionalInfo";
import ReviewBoxForm from "@/components/property/ReviewBoxForm";
import AvailableAgent from "@/components/property/agency-single/AvailableAgent";
import ListingItemsContainer from "@/components/property/agency-single/ListingItems";
import SingleAgencyCta from "@/components/property/agency-single/SingleAgencyCta";
import AllReviews from "@/components/property/reviews";

import { Link, useParams } from "react-router-dom";
import React from "react";

import MetaData from "@/components/common/MetaData";
import propertyService from "@/services/property.service";
import { useEffect, useState } from "react";
import FeaturedListings from "@/components/home/home-v1/FeatuerdListings";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchProperties } from "@/redux/thunks/propertyThunks";

const metaInformation = {
  title: "Agency Single || Homez - Real Estate ReactJS Template",
};

const AgencySingle = () => {

  let params = useParams();
  const [agency, setAgency] = useState([]);

  useEffect(() => {
    const fetchAgencyProperties = async () => {
      try {
        const response = await propertyService.getUserArticlesById(params.id);
        setAgency(response);
        console.log("response:", response);
      } catch (error) {
        console.error('Failed to fetch agency properties:', error);
      }
    };

    fetchAgencyProperties();
  }, [params.id]);

  //sponsored
  const [showHeroSection, setShowHeroSection] = useState(true);
  const [showFeaturedListings, setShowFeaturedListings] = useState(false); // Initially set to false
  const dispatch = useDispatch();
  const { properties, loading, error } = useSelector((state) => state.property);


  useEffect(() => {
    dispatch(fetchProperties());
  }, [dispatch]);

  useEffect(() => {
    const sponsoredProperties = properties.filter(property =>
      property.boost && property.boost.status === "active"
    );
    setShowFeaturedListings(sponsoredProperties.length > 0);
  }, [properties]);

  return (
    <>
      <MetaData meta={metaInformation} />
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Agent Single Section Area */}
      <section className="agent-single pt60">
        <div className="cta-agent bgc-dark mx-auto maxw1600 pt60 pb60 bdrs12 position-relative mx20-lg">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xl-7">
                <SingleAgencyCta agency={agency} />
                <div className="img-box-12 position-relative d-none d-xl-block">
                  <img
                    className="img-1 spin-right"
                    src="/images/about/element-12.png"
                    alt="agents"
                  />
                  <img

                    className="img-2 bounce-x"
                    src="/images/about/element-13.png"
                    alt="agents"
                  />
                  <img

                    className="img-3 bounce-y"
                    src="/images/about/element-11.png"
                    alt="agents"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End cta-agent */}

        <div className="container">
          <div className="row wow fadeInUp" data-aos-delay="300">
            <div
            // className="col-lg-8 pr40 pr20-lg"
            >
              <div className="row">
                {agency?.aboutMe && (
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="agent-single-details mt30 pb30 bdrb1">
                        <h6 className="fz17 mb30">À Propos</h6>
                        <p className="text">{agency?.aboutMe}</p>
                      </div>
                      
                    </div>
                  </div>
                )}
              </div>
              {/* End .row */}

              <ListingItemsContainer articles={agency?.articles} />
              {/* End .row */}

              {/* <div className="row pt30 bdrb1">
                <div className="col-lg-12">
                  <h6 className="fz17">Agents</h6>
                </div>
                <AvailableAgent />
              </div> */}
              {/* End .row */}
              {/* 
              <div className="row">
                <div className="col-lg-12">
                  <AllReviews />
               

                  <div className="bsp_reveiw_wrt">
                    <h6 className="fz17">Leave A Review</h6>
                    <ReviewBoxForm />
                  </div>
               
                </div>
              </div> */}
            </div>
            {/* End .col-lg-8 */}

            {/* <div className="col-lg-4">
              <div className="agent-single-form home8-contact-form default-box-shadow1 bdrs12 bdr1 p30 mb30-md bgc-white position-relative">
                <h4 className="form-title mb25">Contact Form</h4>
                <FormContact />
              </div>
              <div className="agen-personal-info position-relative bgc-white default-box-shadow1 bdrs12 p30 mt30">
                <ProfessionalInfo />
              </div>
            </div> */}
            {/* End .col-lg-4 */}
          </div>
        </div>
      </section>
      {/* End Agent Single Section Area */}
      {showFeaturedListings && (
        <section className="bgc-f7">
          <div className="container">
            <div className="row align-items-center" data-aos="fade-up">
              <div className="col-lg-9">
                <div className="main-title2">
                  <h2 className="title">Découvrez nos annonces</h2>
                  <p className="paragraph">
                    Trouvez votre prochaine propriété parmi notre sélection exclusive.
                  </p>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="text-start text-lg-end mb-3">
                  <Link className="ud-btn2" to="/grid-default">
                    Voir toutes les propriétés
                    <i className="fal fa-arrow-right-long" />
                  </Link>
                </div>
              </div>
            </div>
            {/* End header */}

            <div className="row">
              <div className="col-lg-12" data-aos="fade-up" data-aos-delay="200">
                <div className="feature-listing-slider">
                  <FeaturedListings />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default AgencySingle;
