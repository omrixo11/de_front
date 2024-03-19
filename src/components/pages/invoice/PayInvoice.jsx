import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaCreditCard, FaUniversity } from 'react-icons/fa'; // Import specific icons


const PayInvoice = ({ handlePlanPurchase }) => {

  const [paymentMethod, setPaymentMethod] = useState('virement'); // Added state for payment method
  const navigate = useNavigate(); // Hook for navigation

  const handleCancel = () => {
    navigate('/'); // Navigate to /home when cancel is clicked
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value); // Set the selected payment method
  };

  const onContinueClick = () => {
    handlePlanPurchase(paymentMethod);
  };

  return (
    <>
      <input
        className="form-control bgc-f7 bdrs12 mt30 mr50"
        placeholder="Code coupon">
      </input>

      <div className="payment-method-container">
        <div className="payment-method-option">
          <input
            id="creditCard"
            className="payment-method-input"
            type="radio"
            name="paymentMethod"
            value="creditCard"
            checked={paymentMethod === 'creditCard'}
            onChange={handlePaymentMethodChange}
            disabled
          />
          <label className="payment-method-label payment-method-disabled" htmlFor="creditCard">
            <FaCreditCard className="payment-method-icon payment-method-disabled" />
            <span className="payment-method-text">Carte bancaire</span>
          </label>
        </div>

        <div className="payment-method-option">
          <input
            id="virement"
            className="payment-method-input"
            type="radio"
            name="paymentMethod"
            value="virement"
            checked={paymentMethod === 'virement'}
            onChange={handlePaymentMethodChange}
          />
          <label className="payment-method-label" htmlFor="virement">
            <FaUniversity className="payment-method-icon" /> {/* Bank transfer icon */}
            <span className="payment-method-text">Virement</span>
          </label>
        </div>
      </div>

      <div className="d-flex align-center">

        <button
          className="ud-btn btn-dark invoice_down_print mt20 mr20"
          onClick={onContinueClick}
        >
          Continuer
          {/* <i className="fal fa-arrow-right-long" /> */}
        </button>
        <button
          className="ud-btn btn-white2 invoice_down_print mt20"
          onClick={handleCancel}
        >
          Annuler
          {/* <i className="fal fa-arrow-right-long" /> */}
        </button>
      </div>
    </>
  );
};

export default PayInvoice;
