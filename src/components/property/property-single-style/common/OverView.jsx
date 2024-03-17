import listings from "@/data/listings";
import React from "react";

const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);
  
  return formattedDate;
};

const OverView = ({ articleData }) => {
  
  const overviewData = articleData ? [
    {
      icon: "flaticon-home-1",
      label: "Type de bien",
      value: articleData.propertyType,
    },
    {
      icon: "flaticon-bed",
      label: "Chambre(s)",
      value: articleData.bedrooms,
    },
    {
      icon: "flaticon-shower",
      label: "Salle(s) d'eau",
      value: articleData.bathrooms,
    },
    {
      icon: "flaticon-expand",
      label: "Surface en m²",
      value: articleData.surface,
      xs: true,
    },
    
    {
      icon: "flaticon-home-1",
      label: "Type de transaction",
      value: `${articleData.transactionType}`,
    },
    {
      icon: "flaticon-investment",
      label: "Prix",
      value: `${articleData.price} DT`,
    },
    {
      icon: "flaticon-event",
      label: "Valable à partir de",
      value: formatDate(articleData.availableFrom),
    },
    
  ] : [];


  return (
    <>
      {overviewData.map((item, index) => (
        <div
          key={index}
          className={`col-sm-6 col-lg-4 ${item.xs ? "mb25-xs" : "mb25"}`}
        >
          <div className="overview-element d-flex align-items-center">
            <span className={`icon ${item.icon}`} />
            <div className="ml15">
              <h6 className="mb-0">{item.label}</h6>
              <p className="text mb-0 fz15">{item.value}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default OverView;
