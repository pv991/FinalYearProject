import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "./../components/Layout/Layout";
import { CgShoppingBag } from "react-icons/cg";
const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"all categories"}>
      <div className="container mt-1">
        <div className="row justify-content-center mt-5">
          {categories.map((c) => (
            <div className="category col-md-5 mb-3 " key={c.slug}>
              <Link
                className="category-button btn  btn-lg btn-block d-flex align-items-center justify-content-center shadow-sm rounded"
                to={`/category/${c.slug}`}
              >
                <span className="mr-2">
                  <CgShoppingBag size={24} />
                </span>
                <span className="category-name text-center">{c.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
