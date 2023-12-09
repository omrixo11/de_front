

import MainMenu from "@/components/common/MainMenu";
import SidebarPanel from "@/components/common/sidebar-panel";
import { Link, Navigate, useLocation } from "react-router-dom";
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

  const auth = useSelector((state) => state.auth);
  // console.log("Redux auth state:", auth);
  // console.log("auth.user.isEmailVerified:", auth.user.isPremium);

  useEffect(() => {
    // console.log('Component re-rendered with auth:', auth);
    // Check if user is authenticated and email is not verified
    if (auth.isLoggedIn && auth.user && auth.user.isPremium == false) {

    } else {

    }
  }, [auth]);

  const menuItems = [
    {
      title: "MAIN",
      items: [
        {
          icon: "flaticon-discovery",
          text: "Dashboard",
          href: "/dashboard-home",
        },
        {
          icon: "flaticon-chat-1",
          text: "Message",
          href: "/dashboard-message",
        },
      ],
    },
    {
      title: "MANAGE LISTINGS",
      items: [
        {
          icon: "flaticon-new-tab",
          text: "Add New Property",
          href: "/dashboard-add-property",
        },
        {
          icon: "flaticon-home",
          text: "My Properties",
          href: "/dashboard-my-properties",
        },
        {
          icon: "flaticon-like",
          text: "My Favorites",
          href: "/dashboard-my-favourites",
        },
        {
          icon: "flaticon-search-2",
          text: "Saved Search",
          href: "/dashboard-saved-search",
        },
        { icon: "flaticon-review", text: "Reviews", href: "/dashboard-review" },
      ],
    },
    {
      title: "MANAGE ACCOUNT",
      items: [
        {
          icon: "flaticon-protection",
          text: "My Package",
          href: "/dashboard-my-package",
        },
        {
          icon: "flaticon-user",
          text: "My Profile",
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

                  <a
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
                  </a>
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

                    <li className="d-none d-sm-block">
                      <Link className="text-center mr15" to="/login">
                        <span className="flaticon-email" />
                      </Link>
                    </li>

                    {/* End email box */}

                    <li className="d-none d-sm-block">
                      <a className="text-center mr20 notif" href="#">
                        <span className="flaticon-bell" />
                      </a>
                    </li>
                    {/* End notification icon */}



                    <li className=" user_setting">
                      <div className="dropdown">
                        <a className="btn" href="#" data-bs-toggle="dropdown">
                          <img

                            src="/images/resource/user.png"
                            alt="user.png"
                          />
                        </a>

                        <div className="dropdown-menu">


                          {/* Conditional rendering based on auth.user.isPremium */}
                          {!auth.user.isOnPlan && (
                            <div>
                              <Link className="dropdown-item" to={'/pricing'}
                                style={{ color: 'red' }}
                              >
                                <i className="flaticon-exit mr10" />
                                Passer à la version Pro
                              </Link>
                            </div>
                          )}

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
                                <i className="flaticon-exit mr10" />
                                Logout
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
