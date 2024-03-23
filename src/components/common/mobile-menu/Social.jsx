const Social = () => {
  const socialLinks = [
    {
      id: 1,
      iconClass: "fab fa-instagram",
      url: "https://www.instagram.com/dessa.tn/",
      ariaLabel: "Instagram"
    },
    {
      id: 2,
      iconClass: "fab fa-facebook-f",
      url: "https://www.facebook.com/profile.php?id=61556276108446",
      ariaLabel: "Facebook"
    },
  ];

  return (
    <>
      {socialLinks.map((link) => (
        <a className="me-3" href={link.url} key={link.id} aria-label={link.ariaLabel}>
          <i className={link.iconClass}></i>
        </a>
      ))}
    </>
  );
};

export default Social;
