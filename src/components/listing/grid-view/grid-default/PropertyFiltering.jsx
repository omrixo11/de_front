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
  const myState = useSelector(state => state.property)
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

  const filteredData = reduxFilteredData.length > 0 ? reduxFilteredData.filter(item => {

    const searchQueryMatch =
      (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.quartier && item.quartier.name && item.quartier.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.ville && item.ville.name && item.ville.name.toLowerCase().includes(searchQuery.toLowerCase()))
      
    const isToutSelected = checkedTransactionType === "Tout";
    const propertyTypeMatch = selectedPropertyTypes.length === 0 || selectedPropertyTypes.some(type => item.propertyType.includes(type));
    const priceMatch = priceRange && item.price >= priceRange.minPrice && item.price <= priceRange.maxPrice;
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

  }, [filteredData]);

  useEffect(() => {
    // console.log("Sorting Data...");
    const sortedData = sortData(filteredData, currentSortingOption);
    if (!arraysEqual(sortedData, sortedFilteredData)) {
      setSortedFilteredData(sortedData);
    }
  }, [filteredData, currentSortingOption, sortedFilteredData]);

  function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  }

  const sortData = (data, sortingOption) => {
    switch (sortingOption) {
      case "Newest":
        return sortAndPrioritizeSponsored(data, (a, b) => {
          if (!a.createdAt && !b.createdAt) return 0;
          if (!a.createdAt) return 1;
          if (!b.createdAt) return -1;
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
      case "Oldest":
        return sortAndPrioritizeSponsored(data, (a, b) => {
          if (!a.createdAt && !b.createdAt) return 0;
          if (!a.createdAt) return 1;
          if (!b.createdAt) return -1;
          return new Date(a.createdAt) - new Date(b.createdAt);
        });
      case "Price Low to High":
        return sortAndPrioritizeSponsored(data, (a, b) => a.price - b.price);
      case "Price High to Low":
        return sortAndPrioritizeSponsored(data, (a, b) => b.price - a.price);
      default:
        return data;
    }
  };

  const sortAndPrioritizeSponsored = (data) => {
    // Separate listings into different categories based on boost status and type
    const superBoosted = data.filter(item => item.boost && item.boost.status === "active" && item.boost.type === "super");
    const classicBoosted = data.filter(item => item.boost && item.boost.status === "active" && item.boost.type === "classic");
    const nonBoosted = data.filter(item => !item.boost || item.boost.status !== "active");

    // Sort each category if needed (e.g., by createdAt or price)
    // For demonstration, sorting by createdAt as an example
    const sortByCreatedAtDesc = (a, b) => new Date(b.createdAt) - new Date(a.createdAt);
    superBoosted.sort(sortByCreatedAtDesc);
    classicBoosted.sort(sortByCreatedAtDesc);
    nonBoosted.sort(sortByCreatedAtDesc);

    // Concatenate the arrays, prioritizing super boosted, then classic boosted, then non-boosted listings
    return [...superBoosted, ...classicBoosted, ...nonBoosted];
  };

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
            {/* End mobile filter sidebar */}
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
