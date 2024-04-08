"use client";

import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [searchResults, setSearchResults] = useState([]);

  const setResult = (result) => {
    setSearchResults(result);
  };

  const resetSearchResults = () => {
    setSearchResults([]);
  };

  return (
    <SearchContext.Provider
      value={{ searchResults, setResult, resetSearchResults }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => {
  return useContext(SearchContext);
};
