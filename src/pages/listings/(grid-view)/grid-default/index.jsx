import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";

import React from "react";
import PropertyFiltering from "@/components/listing/grid-view/grid-default/PropertyFiltering";

import MetaData from "@/components/common/MetaData";
import { useSelector } from "react-redux";
import AdsCarousel from "@/components/listing/grid-view/grid-default/AdsCarousel";


const metaInformation = {
  title: "Dessa - Biens à Vendre ou à Louer",
  description: "Parcourez notre vaste sélection de biens immobiliers à vendre ou à louer sur Dessa. Que vous recherchiez une maison, un appartement ou un bureau, commencez votre recherche avec Dessa."

};

const GridDefault = () => {

  // Access the search query state from Redux
  const searchQuery = useSelector(state => state.search.searchQuery);

  // Dynamically update the title based on the search query
  const pageTitle = searchQuery ? `Résultats pour "${searchQuery}"` : 'Explorez Plus';

  const settings = {
    dots: true, // Shows dot indicators at the bottom of the slider
    infinite: true, // Enables infinite looping
    speed: 500, // Animation speed
    slidesToShow: 1, // Number of slides to show at a time
    slidesToScroll: 1, // Number of slides to scroll at a time
    autoplay: true, // Enables autoplay mode
    arrows: false, // Disables navigation arrows
  };


  return (
    <>
      <MetaData meta={metaInformation} />
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}


      {/* Breadcumb Sections */}


      <section className="breadcumb-section bgc-f7">
        <div className="container bgc-gmart-gray">
          <div className="row">
            <AdsCarousel/>
          </div>
        </div>
      </section>

      <section className="breadcumb-section bgc-f7 pt0">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <span className="title">{pageTitle}</span>
                <h4 className="breadcumb-list">
                  Découvrez notre réseau immobilier en ligne tunisien.
                </h4>
                <a
                  className="filter-btn-left mobile-filter-btn d-block d-lg-none mt-55"
                  data-bs-toggle="offcanvas"
                  href="#listingSidebarFilter"
                  role="button"
                  aria-controls="listingSidebarFilter"
                >
                  <span className="flaticon-settings" />Avancée
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Property Filtering */}
      <PropertyFiltering />
      {/* Property Filtering */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default GridDefault;
