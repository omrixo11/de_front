import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import Pricing from "@/components/pages/pricing/Pricing";

import MetaData from "@/components/common/MetaData";

const metaInformation = {
  title: "Dessa | Nos Tarifs",
};

const PricingPlan = () => {
  return (
    <>
    <MetaData meta={metaInformation} />
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Breadcrumb Sections */}
      {/* <section className="breadcumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h2 className="title">Nos Tarifs</h2>
                <div className="breadcumb-list">
                  <a href="#">Acceuil</a>
                  <a href="#">Nos Tarifs</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}
      {/* End Breadcrumb Sections */}

      {/* Pricing Section Area */}
      <section className="our-pricing pb90 pt-5">
        <div className="container">
          <div className="row" data-aos="fade-up" data-aos-delay="100">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center mb30">
                <h2>Nos Tarifs</h2>
                <p>Optez pour le plan qui transcende vos attentes et répond parfaitement à vos besoins.</p>
              </div>
            </div>
          </div>
          {/* End .row */}
          <Pricing />
        </div>
        {/* End .container */}
      </section>
      {/* End Pricing Section Area */}

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

export default PricingPlan;
