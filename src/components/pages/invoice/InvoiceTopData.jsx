import React from "react";
import { useSelector } from "react-redux";

const InvoiceTopData = () => {
  const auth = useSelector((state) => state.auth);
  console.log("auth in invoice:", auth);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const today = formatDate(new Date());

  const invoiceData = {
    fournisseur: {
      name: "Omri Tech Solutions",
      address: "27 Avenue Habib Bourguiba, Ariana 2080 Tunisie",
    },
    client: {
      name: auth.isLoggedIn ? `${auth.user.firstName} ${auth.user.lastName}` : "Inconnu",
      date: today,
    },
  };

  return (
    <>
      <div className="col-lg-7 mt-60">
        <div className="invoice_address">
          <h6 className="mb20 mt60">Fournisseur</h6>
          <h6 className="fw400">{invoiceData.fournisseur.name}</h6>
          <p className="body-light-color ff-heading">
            {invoiceData.fournisseur.address.split(', ').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>
      <div className="col-sm-3 col-lg-2">
        <div className="invoice_date mb60">
          <div className="title mb5 ff-heading">Date d'échéance</div>
          <h6 className="fw400 mb0">{invoiceData.client.date}</h6>
        </div>
        <div className="invoice_address mt0">
          <h6 className="mb10">Client</h6>
          <h6 className="fw400">{invoiceData.client.name}</h6>
        </div>
      </div>
    </>
  );
};

export default InvoiceTopData;
