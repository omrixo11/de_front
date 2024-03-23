import React from "react";

const MenuWidget = () => {
  const menuSections = [
    {
      title: "Villes de Recherche Populaires",
      links: [
        { label: "Ariana", href: "#" },
        { label: "Tunis", href: "#" },
        { label: "Sousse", href: "#" },
        { label: "Sfax", href: "#" },
      ],
    },
    {
      title: "Liens Rapides",
      links: [
        { label: "Abonnements", href: "pricing" },
        { label: "À Propos", href: "/about" },
        { label: "Contact", href: "/contact" },
        { label: "FAQs", href: "/faq" },
      ],
    },
    {
      title: "Découvrir",
      links: [
        { label: "Appartements", href: "#" },
        { label: "Maisons", href: "#" },
        { label: "Bureaux", href: "#" },
        { label: "Maisons d'hôtes", href: "#" },
        { label: "Terrains", href: "#" },
      ],
    },
  ];

  return (
    <>
      {menuSections.map((section, index) => (
        <div className="col-auto" key={index}>
          <div className="link-style1 mb-3">
            <span className="text-white mb25" style={{fontWeight: 800}}>{section.title}</span>
            <ul className="ps-0">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

export default MenuWidget;
