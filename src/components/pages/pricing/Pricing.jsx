import React, { useState, useEffect } from "react";
import PlanService from "@/services/plans.service";
import { useDispatch, useSelector } from 'react-redux';
import userService from "@/services/user.service";
import { useNavigate } from "react-router-dom";

const Pricing = () => {

  const [pricingPackages, setPricingPackages] = useState([]);
  const [isYearlyBilling, setIsYearlyBilling] = useState(false);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePlanPurchase = async (userId, planId) => {
    try {
      // Make the API call to purchase the plan
      const response = await userService.purchasePlan(userId, planId, isYearlyBilling, dispatch);

      // Handle the success scenario (you can customize this based on your requirements)
      console.log("Plan purchased successfully:", response);
      // You may want to redirect the user to a success page or perform other actions

    } catch (error) {
      // Handle the error scenario (you can customize this based on your requirements)
      console.error("Error purchasing plan:", error);
      // You may want to display an error message to the user or perform other actions
    }
  };
  
  useEffect(() => {
    // Fetch plans from the backend when the component mounts
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
              <span className="pricing_save1 ff-heading">Par Mois</span>
              <label className="switch">
                <input
                  type="checkbox"
                  id="checkbox"
                  checked={isYearlyBilling}
                  onChange={handleBillingToggle}
                />
                <span className="pricing_table_switch_slide round" />
              </label>
              <span className="pricing_save2 ff-heading">Par Ans</span>
              <span className="pricing_save3 ff-heading">Économisez 20%</span>
            </div>
          </div>
        </div>
      </div>
      {/* End .row */}
      <div className="row" data-aos="fade-up" data-aos-delay="300">
        {pricingPackages.map((item, index) => (

          <div className={`col-md-6 col-xl-4`} key={index}>
            <div className={`pricing_packages ${index === 1 ? "active" : ""}`}>
              <div className="heading mb60">
                <h4 className={`package_title ${item.uniqueClass || ""}`}>
                  {item.planName}
                </h4>
                <h1 className="text2">
                  {isYearlyBilling ? `${item.yearPrice.toLocaleString()} TND` : `${item.monthPrice.toLocaleString()} TND`}
                </h1>
                <p className="text">{isYearlyBilling ? "par an" : "par mois"}</p>
                {/* Assuming you have an icon URL in your plan data */}
                {/* <img className="price-icon" src="images/icon/pricing-icon-1.svg" alt="icon" /> */}
                <img className="price-icon" src={`images/icon/pricing-icon-${index + 1}.svg`} alt="icon" />
              </div>
              <div className="details">
                <p className="text mb35">{item.description}</p>
                <div className="list-style1 mb40">
                  <ul>
                    {item.planFeatures.map((feature, featureIndex) => (
                      <li key={featureIndex}>
                        <i className="far fa-check text-white bgc-dark fz15" />
                        {feature.description}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="d-grid">
                  <a
                    className="ud-btn btn-thm-border text-thm"
                    onClick={() => handlePlanPurchase(auth.user._id, item._id)}
                  >
                    Choisissez {item.planName}
                    <i className="fal fa-arrow-right-long" />
                  </a>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
      {/* End .row */}
    </>
  );
};

export default Pricing;
