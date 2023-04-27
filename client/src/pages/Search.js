import React, { useEffect } from "react";
import { useSearch } from "../context/Search";
import Layout from "./../components/Layout/Layout";
import { toast } from "react-toastify";
import { useCart } from "../context/cart";
import { useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import SearchInput from "../components/Form/SearchInput";
const Search = () => {
  const [values, setValues] = useSearch();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    // Clear search input when returning to the home page
    if (location.pathname === "/") {
      setValues({ keyword: "", results: [] });
    }
  }, [location.pathname, setValues]);

  return (
    <Layout title={"search results"}>
      <div className="container">
        <div className="text-center">
          <h1 className="mt-3">Search results</h1>
          <SearchInput />
          <h6 className="mt-3 mb-1">
            {values?.results.length < 1
              ? "No product found"
              : `Found ${values?.results.length}`}
          </h6>
          <div className=" card-deck d-flex flex-wrap gap-3 ms-5">
            {values?.results.map((p) => (
              <div className="card" style={{ width: "10rem" }} key={p._id}>
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                  onClick={() => navigate(`/product/${p.slug}`)}
                  style={{ width: "150px", height: "150px" }}
                />
                <div
                  className="card-body d-flex flex-column"
                  style={{ marginBottom: "-10px" }}
                >
                  <div className="flex align-items-center">
                    <p className="card-title m-0">
                      <b>{p.name}</b>
                    </p>
                  </div>
                  <div className="flex">
                    <p className="card-text m-0">
                      {p.description.substring(0, 20)}...
                    </p>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="">
                      <p className="card-text ">₹ {p.price}</p>
                    </div>
                    <div className="flex">
                      <button
                        className="btn-circle btn btn-outline-success fw-bold btn-sm text-uppercase rounded-1 "
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                          toast.success("Item Added to Cart");
                        }}
                      >
                        <FaShoppingCart />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}{" "}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
