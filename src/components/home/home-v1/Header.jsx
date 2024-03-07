

import MainMenu from "@/components/common/MainMenu";
import SidebarPanel from "@/components/common/sidebar-panel";
import LoginSignupModal from "@/components/common/login-signup-modal";


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useSelector } from 'react-redux';


const Header = () => {

  const auth = useSelector((state) => state.auth);
  // console.log("Redux auth state:", auth);

  const lastName = auth.user ? auth.user?.lastName : '';

  const [navbar, setNavbar] = useState(false);

  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeBackground);
    return () => {
      window.removeEventListener("scroll", changeBackground);
    };
  }, []);

  return (
    <>
      <header
        className={`header-nav nav-homepage-style main-menu  ${navbar ? "sticky slideInDown animated" : ""
          }`}
      >
        <nav className="posr">
          <div className="container posr menu_bdrt1">
            <div className="row align-items-center justify-content-between">
              <div className="col-auto">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="logos mr40">
                    <Link className="header-logo logo1" to="/">
                      <img

                        src="/images/header-logo.svg"
                        alt="Header Logo"
                      />
                    </Link>
                    <Link className="header-logo logo2" to="/">
                      <img

                        src="/images/header-logo2.svg"
                        alt="Header Logo"
                      />
                    </Link>
                  </div>
                  {/* End Logo */}

                  <MainMenu />
                  {/* End Main Menu */}
                </div>
              </div>
              {/* End .col-auto */}

              <div className="col-auto">
                <div className="d-flex align-items-center">
                  {auth.isLoggedIn ? (
                    
                    <Link
                      href="#"
                      className="login-info d-flex align-items-center"
                      data-bs-target="#loginSignupModal"
                      role="button"
                      to="/dashboard-home"
                    >
                      
                      <i className="far fa-user-circle fz16 me-2" />{" "}
                      <span className="d-none d-xl-block">Salut, {lastName}</span>
                    </Link>
                  ) : (
                    <a
                      href="#"
                      className="login-info d-flex align-items-center"
                      data-bs-toggle="modal"
                      data-bs-target="#loginSignupModal"
                      role="button"
                    >
                      <i className="far fa-user-circle fz16 me-2" />{" "}
                      <span className="d-none d-xl-block">Connexion / Inscription</span>
                    </a>
                  )}

                  <Link
                    className="ud-btn add-property menu-btn bdrs60 mx-2 mx-xl-4"
                    to="/dashboard-add-property"
                  >
                    Ajouter une propriété
                    <i className="fal fa-arrow-right-long" />
                  </Link>
                  {/* <a
                    className="sidemenu-btn filter-btn-right"
                    href="#"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#SidebarPanel"
                    aria-controls="SidebarPanelLabel"
                  >
                    <img

                      className="img-1"
                      src="/images/icon/nav-icon-white.svg"
                      alt="humberger menu"
                    />

                    <img

                      className="img-2"
                      src="/images/icon/nav-icon-dark.svg"
                      alt="humberger menu"
                    />
                  </a> */}
                </div>
              </div>
              {/* End .col-auto */}
            </div>
            {/* End .row */}
          </div>
        </nav>
      </header>
      {/* End Header */}

      {/* Signup Modal */}
      <div className="signup-modal">
        <div
          className="modal fade"
          id="loginSignupModal"
          tabIndex={-1}
          aria-labelledby="loginSignupModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog  modal-dialog-scrollable modal-dialog-centered">
            <LoginSignupModal />
          </div>
        </div>
      </div>
      {/* End Signup Modal */}

      {/* DesktopSidebarMenu */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="SidebarPanel"
        aria-labelledby="SidebarPanelLabel"
      >
        <SidebarPanel />
      </div>
      {/* Sidebar Panel End */}
    </>
  );
};

export default Header;
