import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../context/cart";
import { FaShoppingCart } from "react-icons/fa";

const ProductDetails = () => {
  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  //initial details
  useEffect(() => {
    if (params?.slug) getProduct();
    // eslint-disable-next-line
  }, [params?.slug]);

  //get single product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      const product = data?.product;
      if (product) {
        setProduct(product);
        getSimilarProdcut(product._id, product.category._id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //get similiar products
  const getSimilarProdcut = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`,
        window.scrollTo(500, 0)
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-6 mb-5">
            <h1 className="text-center">Product details</h1>
          </div>
          <div className="col-md-6">
            <h1 className="text-center">Similar Products</h1>
            {relatedProducts.length < 1 && (
              <p className="text-center .text-info">
                No similar product available for now
              </p>
            )}
          </div>
        </div>
        <div className="row">
          <div className=" col-md-6 card">
            {product._id ? (
              <img
                src={`/api/v1/product/product-photo/${product._id}`}
                className="card-img-top"
                alt={product.name}
                style={{ height: "150px", objectFit: "contain" }}
              />
            ) : (
              <div>No image available</div>
            )}

            <div className="text-center">
              <h2>Name: {product.name}</h2>
              <h6>
                <b>Category:</b> {product.category?.name}
              </h6>
              <h6>
                <b>Description:</b> {product.description}
              </h6>
              <h6>
                <b>Price:</b> ₹ {product.price}
              </h6>
            </div>

            <button
              className="btn btn-outline-success ms-auto"
              onClick={() => {
                setCart([...cart, product]);
                localStorage.setItem(
                  "cart",
                  JSON.stringify([...cart, product])
                );
                toast.success("Item Added to Card");
              }}
              style={{ width: "5rem" }}
            >
              <FaShoppingCart />
            </button>
          </div>

          {/* <div className="col-md-3">
            <h1 className="text-center">Similar Products</h1>
            {relatedProducts.length < 1 && (
              <p className="text-center .text-info">
                No similar product available for now
              </p>
            )}
          </div> */}
          <div className="col-md-6">
            <div className="d-flex flex-wrap ms-5">
              {relatedProducts?.map((p) => (
                <div
                  className="card m-2 "
                  style={{ width: "10rem" }}
                  key={p._id}
                >
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    onClick={() => navigate(`/product/${p.slug}`)}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text">
                      {p.description.substring(0, 10)}...
                    </p>
                    <div className="d-flex justify-content-between">
                      <p className="card-text">₹ {p.price}</p>
                      <button
                        className="btn btn-outline-success btn-sm"
                        onClick={() => {
                          setCart([...cart, p]);
                          localStorage.setItem(
                            "cart",
                            JSON.stringify([...cart, p])
                          );
                          toast.success("Item Added to Card");
                        }}
                      >
                        <FaShoppingCart size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}{" "}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
