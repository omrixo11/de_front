
import { Link } from "react-router-dom";
import React from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const SidebarDashboard = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const sidebarItems = [
    {
      title: "Principale",
      items: [
        {
          href: "/dashboard-home",
          icon: "flaticon-discovery",
          text: "Dashboard",
        },
      ],
    },
    {
      title: "Gérer les annonces",
      items: [
        {
          href: "/dashboard-add-property",
          icon: "flaticon-new-tab",
          text: "Publier une annonce",
        },
        {
          href: "/dashboard-my-properties",
          icon: "flaticon-home",
          text: "Mes annonces",
        },
        {
          href: "/dashboard-sponsoring",
          icon: "flaticon-electricity me-2",
          text: "Dessa Boost",
        },
        {
          href: "/dashboard-banners",
          icon: "flaticon-images me-2",
          text: "Espace Publicitaire",
        },
        {
          href: "/dashboard-my-favourites",
          icon: "flaticon-like-empty",
          text: "Mes favoris",
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
          href: "/dashboard-my-profile",
          icon: "flaticon-user",
          text: "Mon compte",
        },
      ],
    },
  ];

  return (
    <div className="dashboard__sidebar d-none d-lg-block">
      <div className="dashboard_sidebar_list">
        {sidebarItems.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <p
              className={`fz15 fw400 ff-heading ${sectionIndex === 0 ? "mt-0" : "mt30"
                }`}
            >
              {section.title}
            </p>
            {section.items.map((item, itemIndex) => (
              <div key={itemIndex} className="sidebar_list_item">
                <Link
                  to={item.href}
                  className={`items-center   ${pathname == item.href ? "-is-active" : ""
                    } `}
                >
                  <i className={`${item.icon} mr15`} />
                  {item.text}
                </Link>
              </div>
            ))}
          </div>
        ))}
        <div className="sidebar_list_item">
          <Link onClick={handleLogout} className="logout-button">
            <i className="flaticon-logout mr15" />
            Se déconnecter
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SidebarDashboard;
