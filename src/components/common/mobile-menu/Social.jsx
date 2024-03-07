const Social = () => {
  const socialLinks = [
    {
      id: 1,
      iconClass: "fab fa-instagram",
      url: "https://www.instagram.com/dessa.tn/",
    },
    {
      id: 2,
      iconClass: "fab fa-facebook-f",
      url: "https://www.facebook.com/profile.php?id=61556276108446",
    },
  ];

  return (
    <>
      {socialLinks.map((link) => (
        <a className="me-3" href={link.href} key={link.id}>
          <i className={link.iconClass}></i>
        </a>
      ))}
    </>
  );
};

export default Social;
