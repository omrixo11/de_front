import React from "react";

const Social = () => {
  const socialLinks = [
    {
      iconClass: "fab fa-facebook-f",
      url: "https://www.facebook.com/profile.php?id=61556276108446",
      ariaLabel: "Facebook"
      
    },
   
    {
      iconClass: "fab fa-instagram",
      url: "https://www.instagram.com/dessa.tn/",
      ariaLabel: "Instagram"
    },
   
  ];

  return (
    <div className="social-style1">
      {socialLinks.map((link, index) => (
        <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.ariaLabel}>
          <i className={link.iconClass + " list-inline-item"} />
        </a>
      ))}
    </div>
  );
};

export default Social;
