

import MainMenu from "@/components/common/MainMenu";
import SidebarPanel from "@/components/common/sidebar-panel";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const DashboardHeader = () => {
  const { pathname } = useLocation()

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {

    dispatch(logout());
    navigate('/');

  };

  const auth = useSelector((state) => state?.auth);
  const isUserOnPlan = auth.user && auth.user.isOnPlan;
  const isUserImgAvailable = auth?.user && auth?.user?.profileImg !== null;


  const menuItems = [
    {
      title: "Principale",
      items: [
        {
          icon: "flaticon-discovery",
          text: "Dashboard",
          href: "/dashboard-home",
        },
      ],
    },
    {
      title: "Gérer les annonces",
      items: [
        {
          icon: "flaticon-new-tab",
          text: "Publier une annonce",
          href: "/dashboard-add-property",
        },
        {
          icon: "flaticon-home",
          text: "Mes annonces",
          href: "/dashboard-my-properties",
        },
        {
          icon: "flaticon-electricity me-2",
          text: "Dessa Boost",
          href: "/dashboard-sponsoring",
        },
        {
          href: "/dashboard-banners",
          icon: "flaticon-images me-2",
          text: "Espace Publicitaire",
        },
        {
          icon: "flaticon-like-empty",
          text: "Mes favoris",
          href: "/dashboard-my-favourites",
        },
        {
          href: "/dashboard-invoices",
          icon: "flaticon-investment me-2",
          text: "Historique d'achats",
        },


      ],
    },
    {
      title: "Gérer mon compte",
      items: [

        {
          icon: "flaticon-user",
          text: "Mon compte",
          href: "/dashboard-my-profile",
        },

      ],
    },
  ];

  return (
    <>
      <header className="header-nav nav-homepage-style light-header position-fixed menu-home4 main-menu">
        <nav className="posr">
          <div className="container-fluid pr30 pr15-xs pl30 posr menu_bdrt1">
            <div className="row align-items-center justify-content-between">
              <div className="col-6 col-lg-auto">
                <div className="text-center text-lg-start d-flex align-items-center">
                  <div className="dashboard_header_logo position-relative me-2 me-xl-5">
                    <Link className="logo" to="/">
                      <img

                        src="/images/header-logo2.svg"
                        alt="Header Logo"
                      />
                    </Link>
                  </div>
                  {/* End Logo */}

                  {/* <a
                    className="dashboard_sidebar_toggle_icon text-thm1 vam"
                    href="#"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#SidebarPanel"
                    aria-controls="SidebarPanelLabel"
                  >
                    <img

                      className="img-1"
                      src="/images/dark-nav-icon.svg"
                      alt="humberger menu"
                    />
                  </a> */}
                </div>
              </div>
              {/* End .col-auto */}

              <div className="d-none d-lg-block col-lg-auto">
                <MainMenu />
                {/* End Main Menu */}
              </div>
              {/* End d-none d-lg-block */}

              <div className="col-6 col-lg-auto">
                <div className="text-center text-lg-end header_right_widgets">
                  <ul className="mb0 d-flex justify-content-center justify-content-sm-end p-0">

                    {/* <li className="d-none d-sm-block">
                      <Link className="text-center mr15" to="/login">
                        <span className="flaticon-email" />
                      </Link>
                    </li> */}

                    {/* End email box */}

                    {/* <li className="d-none d-sm-block">
                      <a className="text-center mr5 mt10" >
                      <h6 className="d-none d-xl-block">{auth.user.lastName}</h6>
                      </a>
                    </li> */}
                    {/* End notification icon */}



                    <li className=" user_setting">
                      <div className="dropdown">
                        <Link className="btn" data-bs-toggle="dropdown">
                          {isUserImgAvailable ? (
                            <img
                              src={auth?.user?.profileImg}
                              style={{ maxWidth: '54px', maxHeight: '54px'}} 
                              alt="User Profile"
                            />
                          ) : (
                            <img
                              src="/images/user-icon.jpg"
                              style={{ width: '44px', height: '44px' }} 
                              // alt="Default User Profile"
                            />
                          )}
                        </Link>

                        <div className="dropdown-menu">


                          {/* Conditional rendering based on auth.user.isPremium
                          {isUserOnPlan === false && (
                            <div>
                              <Link className="dropdown-item" to={'/pricing'}
                                style={{ color: 'red' }}
                              >
                                <i className="flaticon-exit mr10" />
                                Découvrir nos abonnements
                              </Link>
                            </div>
                          )} */}

                          <div className="user_setting_content">
                            {menuItems.map((section, sectionIndex) => (
                              <div key={sectionIndex}>
                                <p
                                  className={`fz15 fw400 ff-heading ${sectionIndex === 0 ? "mb20" : "mt30"
                                    }`}
                                >
                                  {section.title}
                                </p>
                                {section.items.map((item, itemIndex) => (
                                  <Link
                                    key={itemIndex}
                                    className={`dropdown-item ${pathname == item.href ? "-is-active" : ""
                                      } `}
                                    to={item.href}
                                  >
                                    <i className={`${item.icon} mr10`} />
                                    {item.text}
                                  </Link>
                                ))}
                              </div>
                            ))}


                            <div>
                              <button className="dropdown-item" onClick={handleLogout}>
                                <i className="flaticon-logout mr10" />
                                Se déconnecter
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                    {/* End avatar dropdown */}
                  </ul>
                </div>
              </div>
              {/* End .col-6 */}
            </div>
            {/* End .row */}
          </div>
        </nav>
      </header>
      {/* End Header */}

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

export default DashboardHeader;
