import { useState, useContext, createContext } from "react";
// whenever need to createcontext usecontext help in to achiven it

const SearchContext = createContext();
const SearchProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    keyword: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={[auth, setAuth]}>
      {children}
    </SearchContext.Provider>
  );
};

//custom hook
const useSearch = () => useContext(SearchContext);
export { useSearch, SearchProvider };
