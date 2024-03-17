import InvoiceFooter from "@/components/pages/invoice/InvoiceFooter";
import InvoiceTable from "@/components/pages/invoice/InvoiceTable";
import InvoiceTopData from "@/components/pages/invoice/InvoiceTopData";
import PrintInvoice from "@/components/pages/invoice/PrintInvoice";

import { Link, useLocation, useNavigate } from "react-router-dom";
import React from "react";
import PayInvoice from "@/components/pages/invoice/PayInvoice";
import { useDispatch, useSelector } from "react-redux";
import userService from "@/services/user.service";

const Invoice = () => {

  const auth = useSelector((state) => state?.auth);
  const token = useSelector((state) => state?.auth?.user?.token)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const { planId, plan, isYearlyBilling } = location.state;

  // Calculate the price based on yearly or monthly billing
  const price = isYearlyBilling ? plan.yearPrice : plan.monthPrice;

  // Calculate TVA (taxe sur la valeur ajoutée)
  const tva = 0.19 * price;

  // Calculate TTC (toutes taxes comprises)
  const ttc = price + tva;

  const handlePlanPurchase = async () => {
    try {
      if (auth.user) {

        const response = await userService.purchasePlan(auth.user._id, planId, isYearlyBilling, token, dispatch);
        console.log("success");
        navigate('/dashboard-home')
      } else {
        navigate('/login');
      }
    } catch (error) {

      console.error("Error purchasing plan:", error);
    }
  };


  return (
    <>
      {/* Our Invoice Page */}
      <section className="our-invoice bgc-gmart-gray pb200">
        <div className="container" data-aos-delay="300">
          {/* End .row */}
          <div className="row">
            <div className="col-lg-12">
              <div className="invoice_table">
                <div className="wrapper">
                  <div className="row mb20 align-items-center">
                    <div className="col-lg-7">
                      <div className="main_logo mb30-md">
                        <Link to="/">
                          <img

                            src="/images/header-logo2.svg"
                            alt="header-logo2"

                          />
                        </Link>
                      </div>
                    </div>
                    {/* End .col-lg-7 */}

                    <div className="col-lg-5">
                      <div className="invoice_deails">
                        <h4 className="float-start">Récapitulatif de Commande</h4>
                        <h6 className="float-end"></h6>
                      </div>
                    </div>
                    {/* End .col-lg-5 */}
                  </div>
                  {/* End row */}

                  <div className="row mt55">
                    <InvoiceTopData />
                  </div>
                  {/* End .row */}

                  <div className="row mt50">
                    <div className="col-lg-12">
                      <div className="table-responsive invoice_table_list">
                        <InvoiceTable
                          price={price.toFixed(3)}
                          tva={tva.toFixed(3)}
                          ttc={ttc.toFixed(3)}
                          plan={plan}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row mb30">
                    <div className="col-lg-12">
                      <div className="float-end">
                        {/* <PrintInvoice /> */}
                        <PayInvoice
                        handlePlanPurchase = {handlePlanPurchase} 
                        />
                      </div>
                    </div>
                  </div>
                  {/* End .row */}
                </div>
                {/* End wrapper */}

                <div className="invoice_footer">
                  <div className="row justify-content-center">
                    <InvoiceFooter />
                  </div>
                </div>

                {/* invoice_footer */}
              </div>
              {/* invoice_table */}
            </div>
            {/* End col-12 */}
          </div>
          {/* End .row */}
        </div>
        {/* End container */}
      </section>
      {/* End  Our Invoice Page */}
    </>
  );
};

export default Invoice;
