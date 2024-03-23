import React, { useState, useEffect } from "react";
import PlanService from "@/services/plans.service";
import { useDispatch, useSelector } from 'react-redux';
import userService from "@/services/user.service";
import { useNavigate } from "react-router-dom";

const Pricing = () => {

  const [pricingPackages, setPricingPackages] = useState([]);
  const [isYearlyBilling, setIsYearlyBilling] = useState(false);

  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const auth = useSelector((state) => state?.auth);
  const token = useSelector((state) => state?.auth?.user?.token)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const showConfirmation = (plan) => {
    setSelectedPlan(plan);
    setConfirmationVisible(true);
  };

  const hideConfirmation = () => {
    setConfirmationVisible(false);
  };

  const handlePlanChangeConfirmation = async () => {
    // Proceed with plan change
    navigate('/invoice', { state: { planId: selectedPlan.planId, plan: selectedPlan.plan, isYearlyBilling: isYearlyBilling } });
    hideConfirmation();
  };

  // const handlePlanStartPurchase = async (userId, planId, plan) => {
  //   try {
  //     if (auth.user) {
  //       console.log('Navigating to invoice...');
  //       navigate('/invoice', { state: { planId: planId, plan: plan, isYearlyBilling: isYearlyBilling } });
  //     } else {
  //       console.log('User not logged in, redirecting to login...');
  //       navigate('/login');
  //     }

  //   } catch (error) {

  //     console.error("Error purchasing plan:", error);
  //   }
  // };

  const handlePlanStartPurchase = async (userId, planId, plan) => {
    try {
      if (auth.user) {
        if (auth.user?.plan && auth.user?.plan?.planName && auth?.user?.planStatus === "active") {
          // Show confirmation if user is already on a plan
          showConfirmation({ userId, planId, plan });
        } else {
          console.log('Navigating to invoice...');
          navigate('/invoice', { state: { planId: planId, plan: plan, isYearlyBilling: isYearlyBilling } });
        }
      } else {
        console.log('User not logged in, redirecting to login...');
        navigate('/login');
      }
    } catch (error) {
      console.error("Error purchasing plan:", error);
    }
  };

  useEffect(() => {
    console.log("auth:", auth);
    const fetchPlans = async () => {

      try {
        const plans = await PlanService.getAllPlans();
        setPricingPackages(plans);
        console.log(plans);
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans();
  }, []);

  const handleBillingToggle = () => {
    setIsYearlyBilling((prevIsYearlyBilling) => !prevIsYearlyBilling);
  };

  return (
    <>
      <div className="row" data-aos="fade-up" data-aos-delay="200">
        <div className="col-lg-12">
          <div className="pricing_packages_top d-flex align-items-center justify-content-center mb60">
            <div className="toggle-btn">
              <span className="pricing_save1 ff-heading">Mensuel</span>
              <label className="switch">
                <input
                  type="checkbox"
                  id="checkbox"
                  checked={isYearlyBilling}
                  onChange={handleBillingToggle}
                />
                <span className="pricing_table_switch_slide round" />
              </label>
              <span className="pricing_save2 ff-heading">Annuel</span>
              <span className="pricing_save3 ff-heading">Économisez 20%</span>
            </div>
          </div>
        </div>
      </div>
      {/* End .row */}
      <div className="row" data-aos="fade-up" data-aos-delay="300">
        {pricingPackages && pricingPackages.length > 0 && pricingPackages.map((item, index) => (
          <div className={`col-md-6 col-xl-4`} key={index}>
            <div className={`pricing_packages ${index === 1 ? "active" : ""}`}>
              <div className="heading mb30">
                <h4 className={`package_title ${item.uniqueClass || ""}`}>
                  {item.planName}
                </h4>
                <h1 className="text2">
                  {isYearlyBilling ? `${item.yearPrice.toLocaleString()}` : `${item.monthPrice.toLocaleString()}`}
                  <span className="price-currency">DT</span>
                </h1>
                <p className="text">{isYearlyBilling ? "par an" : "par mois"}</p>
                <img className="price-icon" src={`images/icon/pricing-icon-${index + 1}.svg`} alt="icon" />
              </div>
              <div className="details" >
                <p className="text mb20">{item.description}</p>
                <div className="list-style1 mb40">
                  <ul>
                    {item.planFeatures && item.planFeatures.map((feature, featureIndex) => (
                      <li key={featureIndex}>
                        {feature.isIncluded ? (
                          <i className="far fa-check text-white bgc-dark fz15" />
                        ) : (
                          <i className="far fa-xmark text-black fz15" />
                        )}
                        {feature.description}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="d-grid">
                  <a
                    className="ud-btn btn-thm-border text-thm"
                    onClick={() => handlePlanStartPurchase(auth?.user?._id, item?._id, item)}
                  >
                    Choisissez {item?.planName}
                    <i className="fal fa-arrow-right-long" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={`modal fade ${confirmationVisible ? 'show' : ''}`} tabIndex={-1} role="dialog" style={{ display: confirmationVisible ? 'block' : 'none' }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Confirmation</h5>
              <button type="button" className="btn-close" onClick={hideConfirmation} />
            </div>
            <div className="modal-body">
              Vous êtes déjà abonné au plan {auth?.user?.plan?.planName}. Êtes-vous sûr de vouloir continuer et changer de plan ?
            </div>
            <div className="modal-footer">
              <button type="button" className="ud-btn btn-thm ml20" onClick={hideConfirmation}>
                Annuler
              </button>
              <button type="button" className="ud-btn btn-white ml20" onClick={handlePlanChangeConfirmation}>
                Continuer
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* End .row */}
    </>
  );
};

export default Pricing;
