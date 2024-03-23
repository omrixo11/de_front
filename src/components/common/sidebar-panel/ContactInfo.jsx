import React from "react";

const ContactInfo = () => {
  const contactInfo = [
    {
      id: 1,
      title: "Total Free Customer Care",
      phone: "+216 94 94 10 88",
      phoneHref: "tel:+21694941088",
      phoneAriaLabel: "Call Total Free Customer Care",
    },
    {
      id: 2,
      title: "Need Live Support?",
      email: "support@dessa.tn",
      emailHref: "mailto:support@dessa.tn",
      emailAriaLabel: "Email Need Live Support",
    },
    
  ];

  return (
    <>
      {contactInfo.map((info) => (
        <div className="col-auto" key={info.id}>
          <div className="contact-info">
            <p className="info-title dark-color">{info.title}</p>
            {info.phone && (
              <h6 className="info-phone dark-color">
                <a href={info.phoneHref} aria-label={info.phoneAriaLabel}>{info.phone}</a>
              </h6>
            )}
            {info.email && (
              <h6 className="info-mail dark-color">
                <a href={info.emailHref} aria-label={info.emailAriaLabel}>{info.email}</a>
              </h6>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default ContactInfo;
