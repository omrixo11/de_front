import CallToActions from "@/components/common/CallToActions";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import MetaData from "@/components/common/MetaData";
import { useSelector } from "react-redux";
import { FaRegCheckCircle } from "react-icons/fa"; // Import a check icon

const metaInformation = {
  title: "Dessa - Félicitations",
  description: `Toutes nos félicitations! Votre plan a été activé avec succès grâce à votre carte cadeau! Vous pouvez maintenant profiter de tous les avantages de votre plan sans coût additionnel. 🎉`,

};

const GiftCardSuccess= () => {

    const firstName = useSelector((state) => state?.auth?.user?.firstName)

    console.log(firstName);

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
                                <h2 style={{ color: '#28a745' }}>Toutes nos félicitations, {firstName}!</h2>
                                <p>Votre plan a été <strong>activé avec succès grâce à votre carte cadeau</strong>! Vous pouvez maintenant profiter de tous les avantages de votre plan sans coût additionnel. 🎉</p>
                                <div style={{ fontSize: '4rem', color: '#28a745' }}>
                                    <FaRegCheckCircle />
                                </div>
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

export default GiftCardSuccess;
