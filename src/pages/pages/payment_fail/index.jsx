import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import Pricing from "@/components/pages/pricing/Pricing";
import { Link } from "react-router-dom"; 

import MetaData from "@/components/common/MetaData";

const metaInformation = {
  title: "Dessa | Paiement réussi",
};

const PaymentFail = () => {
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
      <section className="breadcumb-section">
       
      </section>
      {/* End Breadcrumb Sections */}

      {/* Pricing Section Area */}
      <section className="our-pricing pb90 pt-5">
        <div className="container">
          <div className="row" data-aos="fade-up" data-aos-delay="100">
            <div className="col-lg-6 offset-lg-3">
              <div className="main-title text-center mb30">
                <h2 style={{ color: '#dc3545' }}>Paiement échoué</h2>
                <p>Malheureusement, il semble qu'il y ait eu un problème avec votre paiement.</p>
                <p style={{ color: '#dc3545', fontWeight: 'bold' }}>Ne vous inquiétez pas, aucune somme n'a été débitée.</p>
              </div>
            </div>
          </div>
        </div>
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

export default PaymentFail;
