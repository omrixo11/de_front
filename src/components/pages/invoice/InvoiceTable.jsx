import React from "react";

const InvoiceTable = ({ ttc, price, tva, plan }) => {


  return (
    <table className="table table-borderless">
      <thead className="thead-light">
        <tr className="tblh_row">

          <th>
            Description
          </th>
          <th>
            Unité
          </th>
          <th >
            Prix H.T.V.A
          </th>
          <th >
            TVA (19%)
          </th>
          <th>
            Prix T.T.C
          </th>
        </tr>

      </thead>
      <tbody>

        <tr>
          <td>Abonnement {plan.planName}</td>
          <td>1</td>
          <td>{price} DT</td>
          <td>{tva} DT</td>
          <td>{ttc} DT</td>
        </tr>

      </tbody>
    </table>
  );
};

export default InvoiceTable;
