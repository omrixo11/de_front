import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import Form from "@/components/pages/contact/Form";
import Office from "@/components/pages/contact/Office";

import MetaData from "@/components/common/MetaData";

const metaInformation = {
  title: "Dessa - Contact",
  description: "Contactez Dessa pour toutes vos questions immobilières. Que vous cherchiez à acheter, vendre, ou simplement obtenir des renseignements, notre équipe est là pour vous aider. Visitez notre page de contact pour plus d'informations."

};

const Contact = () => {
  return (
    <>
      <MetaData meta={metaInformation} />
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Our Contact With Map */}
      <section className="p-0">
        <iframe
          className="home8-map contact-page"
          loading="lazy"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.3166465315708!2d10.187033676344072!3d36.85883887223044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd34b4d4702d37%3A0x8d0fb13a03ad2907!2s27%20Av.%20Habib%20Bourguiba%2C%20Ariana%202080!5e0!3m2!1sen!2stn!4v1708530652024!5m2!1sen!2stnhttps://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.3166465315708!2d10.187033676344072!3d36.85883887223044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd34b4d4702d37%3A0x8d0fb13a03ad2907!2s27%20Av.%20Habib%20Bourguiba%2C%20Ariana%202080!5e0!3m2!1sen!2stn!4v1708530652024!5m2!1sen!2stn"
          title="London Eye, London, United Kingdom"
          aria-label="London Eye, London, United Kingdom"
        />
      </section>
      {/* End Our Contact With Map */}

      {/* Start Our Contact Form */}
      <section>
        <div className="container">
          <div className="row d-flex align-items-end">
            <div className="col-lg-5 position-relative">
              <div className="home8-contact-form default-box-shadow1 bdrs12 bdr1 p30 mb30-md bgc-white">
                <h4 className="form-title mb25">
                  Vous avez des questions ? Contactez-nous !
                </h4>
                <Form />
              </div>
            </div>
            {/* End .col */}

            <div className="col-lg-5 offset-lg-2">
              <h2 className="mb30 text-capitalize">
                Nous serions ravi
                de vous entendre.
              </h2>
              <p className="text">
                Nous sommes ici pour répondre à toutes les questions que vous pourriez avoir.
              </p>
            </div>
            {/* End .col */}
          </div>
        </div>
      </section>
      {/* End Our Contact Form */}

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

export default Contact;
