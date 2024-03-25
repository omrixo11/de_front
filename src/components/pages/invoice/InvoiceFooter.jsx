import React from "react";

const InvoiceFooter = () => {

  const footerData = [
    {
      text: "www.dessa.tn",
      link: "https://www.dessa.tn",
      ariaLabel: "Visit www.dessa.tn",

    },
    {
      text: "+216 94 94 10 88",
      link: "tel:+21694941088",
      ariaLabel: "Call +216 94 94 10 88", 

    },
  ];

  return (
    <>
      {footerData.map((data, index) => (
        <div className="col-auto" key={index}>
          <div className="invoice_footer_content text-center">
            <a className="ff-heading" href={data.link} aria-label={data.ariaLabel}>
              {data.text} 
            </a>
          </div>
        </div>
      ))}
    </>
  );
};

export default InvoiceFooter;
