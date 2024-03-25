import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchQuery } from '@/redux/slices/searchSlice';
import { setTransactionType } from '@/redux/slices/propertySlice';
import { useSelector } from 'react-redux';
import { fetchAddressSuggestions } from '@/redux/thunks/addressThunk';
import { useEffect } from 'react';

const HeroContent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("Tout");
  const [searchQuery, setSearchQueryLocal] = useState("");

  const suggestions = useSelector(state => state.address.suggestions);
  const loading = useSelector(state => state.address.loading);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const state = useSelector(state => state);
  console.log("Redux Store State:", state);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "Achat") {
      dispatch(setTransactionType("Vente"));
    } else if (tab === "Location") {
      dispatch(setTransactionType("Location"));
    } else if (tab === "Vacances"){
      dispatch(setTransactionType("Location Vacances"));
    } else {
      dispatch(setTransactionType("Tout"));
    }
  };

  useEffect(() => {
    console.log("suggestions:", suggestions);
  }, [suggestions]);


  const handleInputChange = (event) => {
    const { value } = event.target;
    setSearchQueryLocal(value);
    dispatch(setSearchQuery(value));
    if (value.trim() !== "") {
      dispatch(fetchAddressSuggestions(value));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQueryLocal(suggestion);
    dispatch(setSearchQuery(suggestion));
    setShowSuggestions(false);
  };

  const tabs = [
    { id: "Tout", label: "Tout" },
    { id: "Achat", label: "Achat" },
    { id: "Location", label: "Location" },
    { id: "Vacances", label: "Vacances" },
  ];

  return (
    <>
      <div className="advance-search-tab mt70 mt30-md mx-auto animate-up-3">
        <ul className="nav nav-tabs p-0 m-0">
          {tabs.map((tab) => (
            <li className="nav-item" key={tab.id}>
              <button
                className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => handleTabClick(tab.id)}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>

        <div className="tab-content">
          {tabs.map((tab) => (
            <div
              className={`${activeTab === tab.id ? "active" : ""} tab-pane`}
              key={tab.id}
            >
              <div className="advance-content-style1">
                <div className="row">
                  <div className="col-md-8 col-lg-9">
                    <div className="advance-search-field position-relative text-start">
                      <form className="form-search position-relative">
                        <div className="box-search">
                          <span className="icon flaticon-discovery" />
                          <input
                            className="form-control bgc-f7 bdrs12"
                            type="text"
                            name="search"
                            value={searchQuery}
                            onChange={handleInputChange}
                            placeholder={`Entrez une région, une ville, un quartier ...`}
                          />

                        </div>
                        
                      </form>
                      {showSuggestions && suggestions && suggestions.length > 0 && (
                          <ul className="box-suggestions">
                            {loading ? (
                              <li>Chargement...</li>
                            ) : (
                              suggestions.map((suggestion, index) => (
                                <li key={index} onClick={() => handleSuggestionClick(suggestion.name)}>
                                  {suggestion.name}
                                </li>
                              ))
                            )}
                          </ul>
                        )}
                    </div>
                  </div>
                  <div className="col-md-4 col-lg-3">
                    <div className="d-flex align-items-center justify-content-start justify-content-md-center mt-3 mt-md-0">
                      <button
                        className="advance-search-btn"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#advanceSeachModal"
                      >
                        <span className="flaticon-settings" />Avancée
                      </button>
                      <button
                        className="advance-search-icon ud-btn btn-thm ms-4"
                        onClick={() => navigate("/grid")}
                        type="button"
                        aria-label="Advance Search"
                      >
                        <span className="flaticon-search" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          ))}
        </div>
      </div>

    </>
  );
};

export default HeroContent;
