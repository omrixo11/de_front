import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaCreditCard, FaUniversity } from 'react-icons/fa'; // Import specific icons
import paymentService from "@/services/payment.service";
import { useDispatch, useSelector } from "react-redux"; // Import useSelector hook


const PayInvoice = ({ handlePlanPurchase }) => {

  const [paymentMethod, setPaymentMethod] = useState('virement');
  const [giftCardCode, setGiftCardCode] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleCancel = () => {
    navigate('/');
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const onContinueClick = async () => {
    // Check if the gift card code length is exactly 9 characters
    if (giftCardCode.trim() && giftCardCode.trim().length === 9) {
      try {
        await paymentService.payWithGiftCard(auth.user._id, giftCardCode, dispatch);
        navigate('/gift-card-success');
      } catch (error) {
        setError("Carte non valide ou expirée.");
      }
    } else if (giftCardCode.trim()) {
      setError(`Le code de la carte cadeau doit contenir 9 caractères.`);
    } else {
      handlePlanPurchase(paymentMethod);
    }
  };


  return (
    <>
      <input
        className={`form-control bgc-f7 bdrs12 mt30 mr50 ${error ? 'is-invalid' : ''}`}
        placeholder="Code carte cadeau"
        value={giftCardCode}
        onChange={(e) => {
          setGiftCardCode(e.target.value);
          setError('');
        }}
      />
      {error && <div style={{ color: 'red', marginTop: '5px' }}>{error}</div>}

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
