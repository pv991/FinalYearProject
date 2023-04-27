import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import { FaShoppingCart } from "react-icons/fa";
import { toast } from "react-toastify";
const ProductSlider = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage] = useState(6);

  useEffect(() => {
    getAllProducts();
    // eslint-disable-next-line
  }, [page, perPage]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/product-list/${page + 1}?perPage=${perPage}`
      );
      setLoading(false);
      setProducts([...products, ...data?.products]);
      setPage(page + 1);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `/api/v1/product/product-list/${page}?perPage=${perPage}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // const addToCart = (product) => {
  //   setCart([...cart, product]);
  //   localStorage.setItem("cart", JSON.stringify([...cart, product]));
  //   toast.success("Item added to cart");
  // };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
      slidesToSlide: 4,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div className="container">
      <h1 className="mb-1 mt-4 text-center">All Products</h1>
      {loading && <p onClick={loadMore}>Loading...</p>}
      <Carousel
        responsive={responsive}
        swipeable={true}
        draggable={true}
        showDots={true}
        ssr={true} // means to render carousel on server-side.
        infinite={false}
        // autoPlay={this.props.deviceType !== "mobile" ? true : false}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        // containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        // deviceType={this.props.deviceType}
        // dotListClass="custom-dot-list-style"
        // itemClass="carousel-item-padding-40-px"
      >
        {/* <div className="m-2 p-3">
            {loading && <p>Loading...</p>}
            {!loading && (
              <button className="btn btn-primary mt-5" onClick={loadMore}>
                Load More
              </button>
            )}
          </div> */}
        {products?.map((p) => (
          <div
            className="card container mt-4 mb-5"
            style={{ width: "11.5rem" }}
            key={p._id}
          >
            <img
              src={`/api/v1/product/product-photo/${p._id}`}
              className="card-img-top "
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
                <p className="card-text  m-0">
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
        ))}
      </Carousel>{" "}
    </div>
  );
};

export default ProductSlider;
