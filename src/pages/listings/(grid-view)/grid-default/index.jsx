import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";

import React from "react";
import PropertyFiltering from "@/components/listing/grid-view/grid-default/PropertyFiltering";

import MetaData from "@/components/common/MetaData";
import { useSelector } from "react-redux";

const metaInformation = {
  title: "Dessa | Propriétés à Vendre ou à Louer",
};

const GridDefault = () => {


  // Access the search query state from Redux
  const searchQuery = useSelector(state => state.search.searchQuery);

  // Dynamically update the title based on the search query
  const pageTitle = searchQuery ? `Résultats pour "${searchQuery}"` : 'Explorez Plus';

  
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
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
              <h2 className="title">{pageTitle}</h2>
                <div className="breadcumb-list">
                  {/* <a href="#">Home</a>
                  <a href="#">For Rent</a> */}
                  Rejoignez le plus grand réseau immobilier tunisien en ligne.
                </div>
                <a
                  className="filter-btn-left mobile-filter-btn d-block d-lg-none mt-50"
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
      {/* End Breadcumb Sections */}

      {/* Property Filtering */}
      <PropertyFiltering/>
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
