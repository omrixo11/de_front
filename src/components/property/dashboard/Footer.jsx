import React from "react";



const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="dashboard_footer pt30 pb10">
      <div className="container">
        <div className="row items-center justify-content-center justify-content-md-between">
          <div className="col-auto">
            <div className="copyright-widget">
              <p className="text">
                © {currentYear}{" "}
                - Tous droits réservés. 
              </p>
            </div>
          </div>

          <div className="col-auto">
            <div className="footer_bottom_right_widgets text-center text-lg-end">
              <p>
              OTS - Omri Tech Solutions
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
