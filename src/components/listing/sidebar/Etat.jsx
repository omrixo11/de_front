// Etat.jsx

import React, { useState } from "react";
import { useEffect } from "react";

const Etat = ({ checkedEtatPropriete, setEtatPropriete }) => {
    const [selectedType, setSelectedType] = useState(checkedEtatPropriete);

    const options = [
        { id: "flexRadioDefault4", label: "Tout", value: "", defaultChecked: true },
        { id: "flexRadioDefault5", label: "Neuf", value: "Neuf" },
        { id: "flexRadioDefault6", label: "Bon État", value: "BonEtat" },
        { id: "flexRadioDefault7", label: "À Rénover", value: "ARenover" },
        { id: "flexRadioDefault8", label: "En Construction", value: "EnConstruction" },
    ];

    const handleOptionChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedType(selectedValue);
        setEtatPropriete(selectedValue);
    };

    useEffect(() => {
        setSelectedType(checkedEtatPropriete);
      }, [checkedEtatPropriete]);
      

    return (
        <>
            {options.map((option) => (
                <div
                    className="form-check d-flex align-items-center mb10"
                    key={option.id}
                >
                    <input
                        className="form-check-input"
                        type="radio"
                        id={option.id}
                        value={option.value}
                        checked={selectedType === option.value}
                        onChange={handleOptionChange}
                    />
                    <label className="form-check-label" htmlFor={option.id}>
                        {option.label}
                    </label>
                </div>
            ))}
        </>
    );
};

export default Etat;
