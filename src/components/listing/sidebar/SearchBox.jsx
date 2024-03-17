import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddressSuggestions } from "@/redux/thunks/addressThunk";

const SearchBox = ({ searchQuery, handleChange, handleSubmit }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const dispatch = useDispatch();
  const suggestions = useSelector((state) => state.address.suggestions);
  const loading = useSelector((state) => state.address.loading);

  const handleInputChange = (event) => {
    const { value } = event.target;
    handleChange(event);
    if (value.trim() !== "") {
      dispatch(fetchAddressSuggestions(value));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleChange({ target: { value: suggestion } });
    setShowSuggestions(false);
  };

  return (
    <>
      <div className="advance-content-style1">
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
                placeholder={`Où cherchez-vous ?`}
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
    </>
  );
};

export default SearchBox;
