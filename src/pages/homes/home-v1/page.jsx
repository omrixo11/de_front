import Explore from "../../../components/common/Explore";
import Footer from "../../../components/common/default-footer";
import MobileMenu from "../../../components/common/mobile-menu";
import About from "../../../components/home/home-v1/About";
import ApartmentType from "../../../components/home/home-v1/ApartmentType";
import CallToActions from "../../../components/common/CallToActions";
import FeaturedListings from "../../../components/home/home-v1/FeatuerdListings";
import Header from "../../../components/home/home-v1/Header";
import Partner from "../../../components/common/Partner";

import PropertiesByCities from "../../../components/home/home-v1/PropertiesByCities";
import Testimonial from "../../../components/home/home-v1/Testimonial";
import Hero from "../../../components/home/home-v1/hero";

import Blog from "../../../components/common/Blog";
import { Link } from "react-router-dom";
import PopulerProperty from "../../../components/home/home-v1/PopulerProperty";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProperties } from "@/redux/thunks/propertyThunks";
import MetaData from "@/components/common/MetaData";

import { Suspense } from "react";
import AdsCarousel from "@/components/listing/grid-view/grid-default/AdsCarousel";

const metaInformation = {
  title: "Dessa - Votre chez-vous",
  description: "Recherchez et trouvez la maison de vos rêves avec Dessa. Parcourez nos annonces pour découvrir des propriétés à vendre ou à louer qui correspondent parfaitement à vos besoins et à votre style de vie."
};

const Home_V1 = () => {

  const [showHeroSection, setShowHeroSection] = useState(true);
  const [showFeaturedListings, setShowFeaturedListings] = useState(false);
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
      <Header />
      <MobileMenu />
      {showHeroSection && (
        <section className="home-banner-style1 p0">
          <div className="home-style1">
            <div className="container">
              <div className="row">
                <div className="col-xl-11 mx-auto">
                  {/* Lazy load Hero component */}
                  <Suspense fallback={<div>Chargement...</div>}>
                    <Hero />
                  </Suspense>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {/* End Home Banner Style V1 */}

      {/* Featured Listings */}
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
                  <Link className="ud-btn2" to="/grid">
                    Voir toutes les annonces
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

     
      {/* End Featured Listings */}

      {/* Explore Apartment */}
      {/* <section id="explore-property" className="pb90 pb30-md">
        <div className="container">
          <div className="row  justify-content-between align-items-center">
            <div className="col-auto">
              <div
                className="main-title"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <h2 className="title">Explorez nos propriétés</h2>
                <p className="paragraph">
                  Laissez-vous inspirer par des propriétés uniques, reflets d'un savoir-vivre exclusif.                </p>
              </div>
            </div>
             

            <div className="col-auto mb30">
              <div className="row align-items-center justify-content-center">
                <div className="col-auto">
                  <button className="prev__active swiper_button">
                    <i className="far fa-arrow-left-long" />
                  </button>
                </div>
                 

                <div className="col-auto">
                  <div className="pagination swiper--pagination pagination__active" />
                </div>
                

                <div className="col-auto">
                  <button className="next__active swiper_button">
                    <i className="far fa-arrow-right-long" />
                  </button>
                </div>
               
              </div>
            </div>
            
          </div>
         

          <div className="row">
            <div className="col-lg-12">
              <div
                className="explore-apartment-slider"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <ApartmentType />
              </div>
            </div>
          </div>
        </div>
      </section> */}


      {/* Explore Apartment */}
      <section className="pt60 pb90 pb10-md">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 m-auto"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="main-title text-center">
                <h2 className="title">Découvrez comment Dessa peut vous aider</h2>
                <p className="paragraph">
                  Découvrez une approche unique pour améliorer votre quotidien
                </p>
              </div>
            </div>
          </div>
          {/* End .row */}

          <div className="row">
            <Explore />
          </div>
        </div>
      </section>
      {/* End Explore Apartment */}


      {/* Explore property-city */}
      {/* <section className="pb40-md pb90">
        <div className="container">
          <div
            className="row align-items-center"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="col-lg-9">
              <div className="main-title2">
                <h2 className="title">Propriétés par Villes</h2>
                <p className="paragraph">
                  Explorez une sélection minutieuse de propriétés dans les villes les plus prisées
                </p>
              </div>
            </div>
         

            <div className="col-lg-3">
              <div className="text-start text-lg-end mb-3">
                <a className="ud-btn2" href="#">
                  Voir toutes les villes
                  <i className="fal fa-arrow-right-long" />
                </a>
              </div>
            </div>
            
          </div>
       

          <div className="row">
            <div className="col-lg-12" data-aos="fade-up" data-aos-delay="300">
              <div className="property-city-slider position-relative">
                <PropertiesByCities />
              </div>
            </div>
          </div>
         
        </div>
      </section> */}
      {/* End Explore property-city */}

      {/* <!-- About Us --> */}
      {/* <section className="pt0 pb40-md">
        <div className="container">
          <About />
        </div>
      </section> */}
      {/*  <!-- End About Us --> */}

      {/* Popular Property */}
      {/* <PopulerProperty /> */}
      {/* End  Popular Property */}

      {/* Our Testimonials */}
      {/* <section className="pb100 pb50-md bgc-thm-light">
        <div className="container">
          <div className="row  justify-content-between align-items-center">
            <div className="col-auto">
              <div
                className="main-title"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <h2 className="title">People Love Living with Realton</h2>
                <p className="paragraph">
                  Aliquam lacinia diam quis lacus euismod
                </p>
              </div>
            </div>
          

            <div className="col-auto mb30">
              <div className="row align-items-center justify-content-center">
                <div className="col-auto">
                  <button className="testimonila_prev__active swiper_button">
                    <i className="far fa-arrow-left-long" />
                  </button>
                </div>
          

                <div className="col-auto">
                  <div className="pagination swiper--pagination testimonila_pagination__active" />
                </div>
       

                <div className="col-auto">
                  <button className="testimonila_next__active swiper_button">
                    <i className="far fa-arrow-right-long" />
                  </button>
                </div>
      
              </div>
            </div>
        
          </div>
 

          <div className="row">
            <div className="col-lg-12">
              <div
                className="testimonial-slider"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <Testimonial />
              </div>
            </div>
          </div>
        </div>
      </section> */}



      {/* <section className="pb90 pb20-md">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 m-auto" data-aos="fade-up">
              <div className="main-title text-start text-md-center">
                <h2 className="title">From Our Blog</h2>
                <p className="paragraph">
                  Aliquam lacinia diam quis lacus euismod
                </p>
              </div>
            </div>
          </div>
  

          <div className="row" data-aos="fade-up" data-aos-delay="300">
            <Blog />
          </div>
    
        </div>
      </section> */}


      {/* Our Partners */}
      {/* <section className="our-partners pt0">
        <div className="container">
          <div className="row">
            <div className="col-lg-12" data-aos="fade-up">
              <div className="main-title text-center">
                <h6>Trusted by the world’s best</h6>
              </div>
            </div>
            <div className="col-lg-12 text-center">
              <div
                className="dots_none nav_none"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <Partner />
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* End Our Partners */}

      {/* Our CTA */}
      <CallToActions />
      {/* Our CTA */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default Home_V1;
