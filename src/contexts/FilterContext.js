// src/contexts/FilterContext.js
import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const useFilter = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
  // Filter states
  const [priceRange, setPriceRange] = useState(null);
  const [os, setOS] = useState(null);
  const [features, setFeatures] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);
  const [results, setResults] = useState([]);

  // Reset all filters
  const resetFilters = () => {
    setPriceRange(null);
    setOS(null);
    setFeatures([]);
    setResults([]);
    setIsFiltering(false);
  };

  // Toggle a feature selection
  const toggleFeature = (feature) => {
    if (features.includes(feature)) {
      setFeatures(features.filter(f => f !== feature));
    } else {
      setFeatures([...features, feature]);
    }
  };

  // Set filter results
  const setFilterResults = (phones) => {
    setResults(phones);
    setIsFiltering(false);
  };

  // Begin filtering process
  const startFiltering = () => {
    setIsFiltering(true);
  };

  // Value to be provided to consumers
  const value = {
    priceRange,
    setPriceRange,
    os,
    setOS,
    features,
    setFeatures,
    toggleFeature,
    isFiltering,
    startFiltering,
    results,
    setFilterResults,
    resetFilters
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterContext;