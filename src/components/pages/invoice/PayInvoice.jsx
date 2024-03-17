
import React from "react";

const PayInvoice = ({handlePlanPurchase}) => {

  return (
    <button 
    className="ud-btn btn-dark invoice_down_print mt40"
    onClick={() => handlePlanPurchase()}
    >
      Payer Commande
      <i className="fal fa-arrow-right-long" />
    </button>
  );
};

export default PayInvoice;
