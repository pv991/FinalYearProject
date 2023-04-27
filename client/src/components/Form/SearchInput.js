import React, { useEffect } from "react";
import { useSearch } from "../../context/Search";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `/api/v1/product/search/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Clear search input when returning to the home page
    if (location.pathname === "/") {
      setValues({ keyword: "", results: [] });
    }
  }, [location.pathname, setValues]);

  return (
    <div className="search-form">
      <form className="d-flex" role="search" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            className="form-control search-input"
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          />
          <button className="btn search-button" type="submit">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchInput;
