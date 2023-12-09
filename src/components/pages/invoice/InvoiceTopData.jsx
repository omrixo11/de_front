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

  
  const invoiceData = [
    {
      title: "Date de la facture:",
      date: today,
      heading: "Fournisseur",
      name: "DESSA TN",
      address: (
        <>
          2301 Ravenswood Rd Madison, <br /> WI 53711
        </>
      ),
      columns: "col-sm-6 col-lg-7",
    },
    {
      title: "Date d'échéance",
      date: today,
      heading: "Client",
      name: auth.isLoggedIn ? `${auth.user.firstName} ${auth.user.lastName}` : "Inconnu",
      address: (
        <>
          329 Queensberry Street, North Melbourne VIC <br /> 3051, Australia.
        </>
      ),
      columns: "col-sm-6 col-lg-5",
    },
  ];

  return (
    <>
      {invoiceData.map((data, index) => (
        <div className={data.columns} key={index}>
          <div className="invoice_date mb60">
            <div className="title mb5 ff-heading">{data.title}</div>
            <h6 className="fw400 mb0">{data.date}</h6>
          </div>
          <div className="invoice_address">
            <h6 className="mb20">{data.heading}</h6>
            <h6 className="fw400">{data.name}</h6>
            <p className="body-light-color ff-heading">{data.address}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default InvoiceTopData;
