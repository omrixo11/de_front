
import Home_V1 from "./homes/home-v1/page";
import Wrapper from "./layout-wrapper/wrapper";

import MetaData from "@/components/common/MetaData";

const metaInformation = {
  title: "Dessa - Acceuil",
  description: "Découvrez des propriétés exceptionnelles avec Dessa, votre partenaire immobilier de confiance. Explorez des annonces, trouvez des conseils et réalisez le meilleur choix pour votre chez-vous."

};

export default function Mainpage() {
  return (
    <Wrapper>
      <MetaData meta={metaInformation} />
      <Home_V1 />
    </Wrapper>
  );
}
