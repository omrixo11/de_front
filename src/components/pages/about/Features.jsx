const Features = () => {
  // Define an array of feature objects
  const features = [
    {
      icon: "flaticon-security",
      title: "Sécurité des données",
      description:
      "Nous prenons la sécurité au sérieux en utilisant les dernières technologies pour protéger vos informations et garantir votre confidentialité.",
    },
    {
      icon: "flaticon-keywording",
      title: "Fluidité et facilité d'utilisation",
      description:
      "Conçu pour une expérience utilisateur sans faille, notre plateforme assure une navigation intuitive et des interactions fluides.",
    },
    {
      icon: "flaticon-investment",
      title: "Paiement sécurisé et méthodes diversifiées",
      description:
      "Offrant une variété de méthodes de paiement, notre système garantit des transactions sécurisées pour une tranquillité d'esprit totale.",
    },
  ];

  return (
    <>
      {features.map((feature, index) => (
        <div className="list-one d-flex align-items-start mb30" key={index}>
          <span className={`list-icon flex-shrink-0 ${feature.icon}`} />
          <div className="list-content flex-grow-1 ml20">
            <h6 className="mb-1">{feature.title}</h6>
            <p className="text mb-0 fz15">{feature.description}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Features;
