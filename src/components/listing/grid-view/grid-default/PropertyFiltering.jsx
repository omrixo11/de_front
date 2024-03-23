import React, { useState, useEffect } from "react";
import ListingSidebar from "../../sidebar";
import TopFilterBar from "./TopFilterBar";
import FeaturedListings from "./FeatuerdListings";
import PaginationTwo from "../../PaginationTwo";
import { fetchProperties } from "@/redux/thunks/propertyThunks";
import { useDispatch, useSelector } from 'react-redux';

export default function PropertyFiltering() {

  const [currentSortingOption, setCurrentSortingOption] = useState("Newest");
  const [pageNumber, setPageNumber] = useState(1);
  const [colstyle, setColstyle] = useState(false);
  const dispatch = useDispatch();

  const reduxFilteredData = useSelector(state => state.property.properties);
  const searchQuery = useSelector(state => state.search.searchQuery);
  const checkedTransactionType = useSelector(state => state.property.checkedTransactionType);
  const selectedPropertyTypes = useSelector(state => state.property.selectedPropertyTypes);
  const priceRange = useSelector(state => state.property.filters);
  const selectedBedroom = useSelector(state => state.property.bedrooms);
  const checkedEtatPropriete = useSelector(state => state.property.checkedEtatPropriete);
  const [propertiesFound, setPropertiesFound] = useState(true);
  const [sortedFilteredData, setSortedFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchProperties());
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };
    fetchData();
  }, [dispatch]);

  // const filteredData = reduxFilteredData.length > 0 ? reduxFilteredData.filter(item => {
  const filteredData = reduxFilteredData && reduxFilteredData.length > 0 ? reduxFilteredData.filter(item => {

    const searchQueryMatch = searchQuery.trim() === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.quartier && item.quartier.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.ville && item.ville.name.toLowerCase().includes(searchQuery.toLowerCase()));

    const isToutSelected = checkedTransactionType === "Tout";
    const propertyTypeMatch = selectedPropertyTypes.length === 0 || selectedPropertyTypes.some(type => item.propertyType.includes(type));

    const minPrice = priceRange.minPrice ?? 0; 
    const maxPrice = priceRange.maxPrice ?? Infinity;
    
    const priceMatch = item.price >= minPrice && item.price <= maxPrice;

    const bedroomMatch = selectedBedroom === 0 || item.bedrooms >= selectedBedroom;
    const etatMatch = checkedEtatPropriete === "" || item.etatPropriete === checkedEtatPropriete;

    if (isToutSelected) {
      return searchQueryMatch && propertyTypeMatch && priceMatch && bedroomMatch && etatMatch;
    } else {
      const transactionTypeMatch = !checkedTransactionType || item.transactionType === checkedTransactionType;
      return searchQueryMatch && transactionTypeMatch && propertyTypeMatch && priceMatch && bedroomMatch && etatMatch;
    }
  }) : [];

  useEffect(() => {
    // console.log("Filtered Data:", filteredData);
    setPropertiesFound(filteredData.length > 0);
    console.log(filteredData);

  }, [filteredData]);

  function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }

  const sortData = (data, sortingOption) => {
    // Define a basic sort function for dates
    const sortByDate = (a, b, isAsc = true) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return isAsc ? dateA - dateB : dateB - dateA;
    };
  
    // Define a basic sort function for prices
    const sortByPrice = (a, b, isLowToHigh = true) => {
      return isLowToHigh ? a.price - b.price : b.price - a.price;
    };
  
    // Apply sorting based on the selected option
    switch (sortingOption) {
      case "Newest":
        return [...data].sort((a, b) => sortByDate(a, b, false));
      case "Oldest":
        return [...data].sort((a, b) => sortByDate(a, b));
      case "Price Low to High":
        return [...data].sort((a, b) => sortByPrice(a, b));
      case "Price High to Low":
        return [...data].sort((a, b) => sortByPrice(a, b, false));
      default:
        return data; // If no sorting option matches, return data as is
    }
  };
  
  const sortAndPrioritizeSponsored = (data) => {
    // Separate data into three categories
    const superSponsored = data.filter(item => item.boost && item.boost.status === "active" && item.boost.type === "super");
    const classicSponsored = data.filter(item => item.boost && item.boost.status === "active" && item.boost.type === "classic");
    const nonSponsored = data.filter(item => !item.boost || item.boost.status !== "active");
  
    const sortedSuperSponsored = sortData(superSponsored, currentSortingOption);
    const sortedClassicSponsored = sortData(classicSponsored, currentSortingOption);
    const sortedNonSponsored = sortData(nonSponsored, currentSortingOption);
  
    // Concatenate the categories in order of priority
    return [...sortedSuperSponsored, ...sortedClassicSponsored, ...sortedNonSponsored];
  };

  useEffect(() => {
    const sortedData = sortData(filteredData, currentSortingOption);
    const prioritizedData = sortAndPrioritizeSponsored(sortedData);
    if (!arraysEqual(prioritizedData, sortedFilteredData)) {
      setSortedFilteredData(prioritizedData);
    }
  }, [filteredData, currentSortingOption, sortedFilteredData]); 
  
  const pageItems = sortedFilteredData.slice((pageNumber - 1) * 8, pageNumber * 8);
  const pageContentTrac = [(pageNumber - 1) * 8 + 1, pageNumber * 8, sortedFilteredData.length];

  return (
    <section className="pt0 pb90 bgc-f7">
      <div className="container">
        <div className="row gx-xl-5">
          <div className="col-lg-4 d-none d-lg-block">
            <ListingSidebar />
          </div>
          {/* End .col-lg-4 */}

          {/* start mobile filter sidebar */}
          <div
            className="offcanvas offcanvas-start p-0"
            tabIndex="-1"
            id="listingSidebarFilter"
            aria-labelledby="listingSidebarFilterLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="listingSidebarFilterLabel">
                Filtrage des annonces
              </h5>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body p-0">
              <ListingSidebar />
            </div>
          </div>
          
          <div className="col-lg-8">
           
            {propertiesFound ? (
              <>
                <div className="row align-items-center mb20">
                  <TopFilterBar
                    pageContentTrac={pageContentTrac}
                    colstyle={colstyle}
                    setColstyle={setColstyle}
                    setCurrentSortingOption={setCurrentSortingOption}
                  />
                </div>

                <div className="row mt15">
                  <FeaturedListings colstyle={colstyle} data={pageItems} />
                </div>

                <div className="row">
                  <PaginationTwo
                    pageCapacity={8}
                    data={sortedFilteredData}
                    pageNumber={pageNumber}
                    setPageNumber={setPageNumber}
                  />
                </div>

              </>
            ) : (
              <div className="row mt15">
                <div className="col-12 text-center">
                  <h2 className="mt100">Aucune propriété trouvée!</h2>
                  <span>Réessayez avec d'autres critères de recherche</span>
                </div>
              </div>
            )}
          </div>
          {/* End .col-lg-8 */}
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}
    </section>
  );
}
