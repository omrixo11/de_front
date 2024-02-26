
import { Link } from "react-router-dom";

const CallToActions = () => {
  return (
    <section className="our-cta pt0">
      <div className="cta-banner bgc-f7 mx-auto maxw1600 pt120 pt60-md pb120 pb60-md bdrs12 position-relative mx20-lg">
        <div className="img-box-5">
          <img
           
            className="img-1 spin-right"
            src="/images/about/element-1.png"
            alt="spinner"
          />
        </div>
        <div className="img-box-6">
          <img
           
            className="img-1 spin-left"
            src="/images/about/element-1.png"
            alt="spinner"
          />
        </div>
        {/* End image spinner */}

        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 col-xl-6 " data-aos="fade-right">
              <div className="cta-style1">
                <h2 className="cta-title">Besoin d'aide ? Parlez à notre expert.</h2>
                <p className="cta-text mb-0">
                Disponible du lundi au vendredi de 9h à 18h.</p>
              </div>
            </div>
            {/* End .col-lg-7 */}

            <div className="col-lg-5 col-xl-6 " data-aos="fade-left">
              <div className="cta-btns-style1 d-block d-sm-flex align-items-center justify-content-lg-end">
                <Link
                  to="/contact"
                  className="ud-btn btn-transparent mr30 mr0-xs"
                >
                  Contactez-nous
                  <i className="fal fa-arrow-right-long" />
                </Link>
                <a href="tel:+21692447177" className="ud-btn btn-dark">
                  <span className="flaticon-call vam pe-2" />
                 +216 92 447 177
                </a>
              </div>
            </div>
            {/* End col-lg-5 */}
          </div>
          {/* End .row */}
        </div>
      </div>
    </section>
  );
};

export default CallToActions;
