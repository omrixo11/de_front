import React from "react";

const InvoiceFooter = () => {

  const footerData = [
    {
      text: "www.dessa.tn",
      link: "https://www.dessa.tn",
    },
    {
      text: "+216 92 44 71 77",
      link: "tel:+21692447177",
    },
  ];

  return (
    <>
      {footerData.map((data, index) => (
        <div className="col-auto" key={index}>
          <div className="invoice_footer_content text-center">
            <a className="ff-heading" href={data.link}>
              {data.text}
            </a>
          </div>
        </div>
      ))}
    </>
  );
};

export default InvoiceFooter;
