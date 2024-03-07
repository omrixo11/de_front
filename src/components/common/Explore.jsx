
import { Link } from "react-router-dom";

const Explore = () => {

  const iconboxData = [
    {
      id: 1,
      icon: "/images/icon/property-buy.svg",
      title: "Acheter un bien",
      text: "Découvrez des biens exceptionnels qui correspondent à vos attentes et à votre style de vie.",
      linkText: "Trouver une maison",
      linkTo: "/grid-default",
    },
    {
      id: 2,
      icon: "/images/icon/property-sell.svg",
      title: "Vendre ou louer un bien",
      text: "Maximisez votre investissement avec une visibilité optimale, que vous souhaitiez vendre ou louer votre propriété.",
      linkText: "Publier une annonce",
      linkTo: "/dashboard-add-property",
    },
    {
      id: 3,
      icon: "/images/icon/property-rent.svg",
      title: "Louer un bien",
      text: "Trouvez la location parfaite pour une expérience de vie unique, grâce à notre sélection de propriétés.",
      linkText: "Trouver une location",
      linkTo: "/grid-default",
    },
  ];

  return (
    <>
      {iconboxData.map((item) => (
        <div
          className="col-sm-6 col-lg-4"
          key={item.id}
          data-aos="fade-up"
          data-aos-delay={(item.id + 1) * 100} // Increase delay for each item
        >
          <div className="iconbox-style2 text-center">
            <div className="icon">
              <img src={item.icon} alt="icon" />
            </div>
            <div className="iconbox-content">
              <h4 className="title">{item.title}</h4>
              <p className="text">{item.text}</p>
              <Link to={item.linkTo} className="ud-btn btn-white2">
                {item.linkText}
                <i className="fal fa-arrow-right-long" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Explore;
