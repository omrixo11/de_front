import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";

const ProSidebarContent = () => {
  const { pathname } = useLocation();
  const navigate = (path) => {
    history.push(path);
  };

  const mobileMenuItems = [
    {
      label: "Acceuil",
      path: "/",
    },
    {
      label: "Publier une annonce",
      path: "/dashboard-add-property",
    },
    {
      label: "Nos Traifs",
      path: "/pricing",
    },
    {
      label: "À Propos",
      path: "/about",
    },
    {
      label: "Contact",
      path: "/contact",
    },
    {
      label: "FAQs",
      path: "/faq",
    },
  ];

  // Function to determine if the link is active
  const isActive = (path) => pathname === path ? "menuActive" : "";

  return (
    <Sidebar width="100%" backgroundColor="#fff" className="my-custom-class">
      <Menu>
        {mobileMenuItems.map((item, index) => (
          <MenuItem key={index} className={isActive(item.path)} onClick={() => navigate(item.path)}>
            {item.label}
          </MenuItem>
        ))}
      </Menu>
    </Sidebar>
  );
};

export default ProSidebarContent;
