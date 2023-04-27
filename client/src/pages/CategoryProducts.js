import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";
import { useCart } from "../context/cart";
const CategoryProducts = () => {
  const [products, setProducts] = useState([]);
  const params = useParams();
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  useEffect(() => {
    if (params?.slug) getProductByCat();
    // eslint-disable-next-line
  }, [params?.slug]);
  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout title={"category results"}>
      <div className="container text-center mt-5">
        <h1 className="text-center">{category?.name}</h1>
        <h6 className="text-center">
          {products?.length
            ? `${products.length} results found`
            : "No results found"}
        </h6>
        <div className="row">
          <div className="col-md-9 offset-1">
            <div className="d-flex flex-wrap">
              {products?.map((p) => (
                <div
                  className="card m-2"
                  style={{ width: "14rem" }}
                  key={p._id}
                >
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    onClick={() => navigate(`/product/${p.slug}`)}
                    style={{ width: "220px", height: "200px" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      <b>{p.name}</b>
                    </h5>
                    <p className="card-text">
                      {p.description.substring(0, 30)}...
                    </p>
                    <p className="card-text"> ₹{p.price}</p>

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
                      &nbsp;Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProducts;
