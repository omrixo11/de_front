import React from "react";
import { useSelector } from "react-redux";
import "jspdf-autotable";

const InvoicesDataTable = () => {

    let invoices = useSelector((state) => state?.auth?.user?.invoices); 
    invoices = invoices.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

    return (
        <>
        {invoices && invoices.length > 0 ? (
            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                <table className="table-style3 table at-savesearch">
                    <thead className="t-head">
                        <tr>
                            <th scope="col">Numéro de Commande</th>
                            <th scope="col">Montant</th>
                            <th scope="col">Date</th>
                            <th scope="col">Description</th>
                        </tr>
                    </thead>
                    <tbody className="t-body">
                        {invoices.map((invoice, index) => (
                            <tr key={index}>
                                <th scope="row">{invoice.invoiceNumber}</th>
                                <td>{invoice.amount} TND</td>
                                <td>{new Date(invoice.date).toLocaleDateString()}</td>
                                <td>{invoice.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ) : (
            <h3>Vous n'avez pas encore de factures.</h3>   
        )}
    </>
    );
};

export default InvoicesDataTable;
