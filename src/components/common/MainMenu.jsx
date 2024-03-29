import {
  homeItems,
  blogItems,
  listingItems,
  propertyItems,
  pageItems,
} from "@/data/navItems";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const MainMenu = () => {
  const { pathname } = useLocation()

  const [topMenu, setTopMenu] = useState("");
  const [submenu, setSubmenu] = useState("");


  useEffect(() => {
    homeItems.forEach((elm) => {
      if (elm.href.split("/")[1] == pathname.split("/")[1]) {
        setTopMenu("home");
      }
    });
    blogItems.forEach((elm) => {
      if (elm.href.split("/")[1] == pathname.split("/")[1]) {
        setTopMenu("blog");
      }
    });
    pageItems.forEach((elm) => {
      if (elm.href.split("/")[1] == pathname.split("/")[1]) {
        setTopMenu("pages");
      }
    });
    propertyItems.forEach((item) =>
      item.subMenuItems.forEach((elm) => {
        if (elm.href.split("/")[1] == pathname.split("/")[1]) {
          setTopMenu("property");
          setSubmenu(item.label);
        }
      })
    );
    listingItems.forEach((item) =>
      item.submenu.forEach((elm) => {
        if (elm.href.split("/")[1] == pathname.split("/")[1]) {
          setTopMenu("listing");
          setSubmenu(item.title);
        }
      })
    );
    // Check if FAQ is active
    if (pathname === "/faq") {
      setTopMenu("faq");
    }
    if (pathname === "/grid") {
      setTopMenu("grid");
    }
    if (pathname === "/about") {
      setTopMenu("about");
    }
    if (pathname === "/pricing") {
      setTopMenu("pricing");
    }
    if (pathname === "/contact") {
      setTopMenu("contact");
    }
  }, [pathname]);

  const handleActive = (link) => {
    if (link.split("/")[1] == pathname.split("/")[1]) {
      return "menuActive";
    }
  };
  return (
    <ul className="ace-responsive-menu">

      {/* End homeItems */}

      {/* <li className="megamenu_style dropitem">
        <a className="list-item" href="#">
          <span className={topMenu == "listing" ? "title menuActive" : "title"}>
            Listing
          </span>
          <span className="arrow"></span>
        </a>
        <ul className="row dropdown-megamenu sub-menu">
          {listingItems.map((item, index) => (
            <li className="col mega_menu_list" key={index}>
              <h4 className="title">{item.title}</h4>
              <ul className="sub-menu">
                {item.submenu.map((submenuItem, subIndex) => (
                  <li key={subIndex}>
                    <Link
                      className={`${handleActive(submenuItem.href)}`}
                      to={submenuItem.href}
                    >
                      {submenuItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </li> */}
      {/* End listings */}

      {/* <li className="visible_list dropitem">
        <a className="list-item" href="#">
          <span
            className={topMenu == "property" ? "title menuActive" : "title"}
          >
            Property
          </span>
          <span className="arrow"></span>
        </a>
        <ul className="sub-menu">
          {propertyItems.map((item, index) => (
            <li key={index} className="dropitem">
              <a href="#">
                <span
                  className={
                    submenu == item.label ? "title menuActive" : "title"
                  }
                >
                  {item.label}
                </span>
                <span className="arrow"></span>
              </a>
              <ul className="sub-menu">
                {item.subMenuItems.map((subMenuItem, subIndex) => (
                  <li key={subIndex}>
                    <Link
                      className={`${handleActive(subMenuItem.href)}`}
                      to={subMenuItem.href}
                    >
                      {subMenuItem.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </li> */}
      {/* End property Items */}

      {/* <li className="visible_list dropitem">
        <a className="list-item" href="#">
          <span className={topMenu == "blog" ? "title menuActive" : "title"}>
            Blog
          </span>
          <span className="arrow"></span>
        </a>
        <ul className="sub-menu">
          {blogItems.map((item, index) => (
            <li key={index}>
              <Link className={`${handleActive(item.href)}`} to={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </li> */}
      {/* End blog Items */}

      {/* <li className="visible_list dropitem">
        <a className="list-item" href="#">
          <span className={topMenu == "pages" ? "title menuActive" : "title"}>
            Pages
          </span>
          <span className="arrow"></span>
        </a>
        <ul className="sub-menu">
          {pageItems.map((item, index) => (
            <li key={index}>
              <Link className={`${handleActive(item.href)}`} to={item.href}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </li> */}
      {/* End pages Items */}
      
      <li>
        <Link to="/contact" aria-label="contact">
          <span className={topMenu === "contact" ? "title menuActive" : "title"}>
            Contact
          </span>
        </Link>
      </li>

      <li>
        <Link to="/pricing" aria-label="pricing">
          <span className={topMenu === "pricing" ? "title menuActive" : "title"}>
          Abonnements
          </span>
        </Link>
      </li>

      <li>
        <Link to="/about" aria-label="about">
          <span className={topMenu === "about" ? "title menuActive" : "title"}>
            À Propos
          </span>
        </Link>
      </li>

      <li>
        <Link to="/faq" aria-label="FAQs">
          <span className={topMenu === "faq" ? "title menuActive" : "title"}>
            FAQs
          </span>
        </Link>
      </li>

    </ul>
  );
};

export default MainMenu;
