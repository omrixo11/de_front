const Faq1 = () => {
  const faqItems = [
    {
      id: "headingOne",
      question: "Qu'est-ce que Dessa.tn ?",
      answer:
        "Dessa.tn est un site web qui permet à tout le monde, des agences immobilières aux particuliers, de lister leurs propriétés à vendre ou à louer. Les utilisateurs peuvent parcourir ces annonces pour trouver leur prochaine maison ou espace commercial.",
    },
    {
      id: "headingTwo",
      question: "Comment puis-je lister ma propriété sur Dessa.tn ?",
      answer:
        "Pour lister votre propriété, commencez par créer un compte sur notre site. Suivez ensuite les instructions pour ajouter les détails de votre propriété, y compris les photos et les prix. Cette option est disponible pour les professionnels ainsi que les particuliers.",
    },
    {
      id: "headingThree",
      question: "La publication d'annonces sur Dessa.tn est-elle gratuite ?",
      answer:
        "Publier une annonce sur Dessa.tn est gratuit avec notre offre de base, qui permet de publier un nombre limité d'annonces. Pour une plus grande visibilité et plus de fonctionnalités, vous pouvez opter pour un abonnement premium.",
    },
    {
      id: "headingFour",
      question: "Comment puis-je rechercher des propriétés sur Dessa.tn ?",
      answer:
        "Utilisez notre barre de recherche pour trouver des propriétés par lieu, type de propriété, fourchette de prix, et plus encore. Les filtres avancés vous aident à affiner votre recherche pour trouver exactement ce que vous cherchez.",
    },
    {
      id: "headingFour",
      question: "Comment contacter le vendeur ou le loueur d'une propriété sur Dessa.tn ?",
      answer:
        "Les coordonnées du vendeur ou du loueur sont fournies dans chaque annonce. Vous pouvez les contacter directement via ces informations ou en utilisant le formulaire de contact disponible sur la page de l'annonce.",
    },
    {
      id: "headingFour",
      question: "Comment Dessa.tn vérifie-t-il les annonces ?",
      answer:
        "Notre équipe examine toutes les annonces pour s'assurer qu'elles respectent nos standards de qualité et d'authenticité. Nous nous efforçons d'éliminer les annonces frauduleuses ou de faible qualité pour garantir une expérience fiable à nos utilisateurs.",
    },
  ];

  return (
    <div className="accordion" id="accordionExample">
      {faqItems.map((item, index) => (
        <div className="accordion-item" key={index}>
          <h2 className="accordion-header" id={item.id}>
            <button
              className={`accordion-button ${index === 2 ? "" : "collapsed"}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${index + 1}`}
              aria-expanded={index === 2 ? "true" : "false"}
              aria-controls={`collapse${index + 1}`}
            >
              {item.question}
            </button>
          </h2>
          <div
            id={`collapse${index + 1}`}
            className={`accordion-collapse collapse ${
              index === 2 ? "show" : ""
            }`}
            aria-labelledby={item.id}
            data-parent="#accordionExample"
          >
            <div className="accordion-body">
              <p>{item.answer}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Faq1;
