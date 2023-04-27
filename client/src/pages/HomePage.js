import React, { useEffect, useState } from "react";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import { Checkbox, Radio, ConfigProvider } from "antd";
import { Prices } from "../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import Box from "../components/Layout/box/box";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FaShoppingCart } from "react-icons/fa";
import ProductSlider from "./productslider";
import { toast } from "react-toastify";
// import { useWish } from "../context/favorite";
const HomePage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  // const [wish, setWish] = useWish();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState("");
  const [, setTotal] = useState(0);
  const [page] = useState(1);
  const [loading, setLoading] = useState(false);

  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data?.success) {
        setCategories(data?.category); //using ?optional chaning its stop giving error if data is not recevied and give undifined object
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCategory();
    getTotal();
    // eslint-disable-next-line
  }, []);

  //get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/product-count");
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  // pagination
  // useEffect(() => {
  //   if (page === 1) return;
  //   loadMore();
  // }, [page]);
  // //load more
  // const loadMore = async () => {
  //   try {
  //     setLoading(true);
  //     const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
  //     setLoading(false);
  //     setProducts([...products, ...data?.products]);
  //   } catch (error) {
  //     setLoading(false);
  //     console.log(error);
  //   }
  // };

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data?.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  //filter by  category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };
  //get the all products
  useEffect(() => {
    if (!checked.length || !radio.length) {
      getAllProducts();
    } // eslint-disable-next-line
  }, [checked.length, radio.length]);
  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    }
    // eslint-disable-next-line
  }, [checked, radio]);

  //get filtered product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post("/api/v1/product/product-filters", {
        checked,
        radio,
      });
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

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
    <Layout title={"Everything You Need In One Place"}>
      <Box />
      <ProductSlider />
      {/* products and filter */}
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8 col-sm-6">
            <div className="category-checkbox ">
              <h4 className="filter-head text-center  mb-5 w-50 mx-auto">
                Filter By Category
              </h4>
              <div className="row text-left">
                {categories?.map((c) => (
                  <div
                    className="checkbox-container col-md-4  mb-3"
                    key={c._id}
                  >
                    <ConfigProvider
                      theme={{
                        components: {
                          Checkbox: {
                            colorPrimary: "  #2ecc71 ",
                          },
                        },
                      }}
                    >
                      <Checkbox
                        className="ant-checkbox my-checkbox"
                        onChange={(e) => handleFilter(e.target.checked, c._id)}
                      >
                        <span className="filtercheckbox">{c.name}</span>
                      </Checkbox>
                    </ConfigProvider>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="col-md-4 col-sm-6">
            <div className="d-flex flex-column">
              <h4 className="filter-head text-center mb-5 w-75 mx-auto">
                Filter By Price
              </h4>

              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div className="radiobutton" key={p._id}>
                    <ConfigProvider
                      theme={{
                        components: {
                          Radio: {
                            colorPrimary: "#00b96b",
                          },
                        },
                      }}
                    >
                      <Radio value={p.array}>
                        <span className="filtercheckbox">{p.name}</span>
                      </Radio>
                    </ConfigProvider>
                  </div>
                ))}
              </Radio.Group>
              <div className="d-flex justify-content-end">
                <button
                  className="resetbutton btn btn-outline-danger ml-5 mt-5 btn-sm w-25 "
                  onClick={() => window.location.reload()}
                >
                  Reset Filter
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="home container">
        <p className="text-center fw-bold fs-3">Filter Products</p>
        {loading && <p>Loading...</p>}
        <Carousel
          responsive={responsive}
          swipeable={true}
          draggable={false}
          showDots={true}
          ssr={true} // means to render carousel on server-side.
          infinite={false}
          // autoPlay={this.props.deviceType !== "mobile" ? true : false}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          // deviceType={this.props.deviceType}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          {products?.map((p) => (
            <div
              className="card container mt-3 mb-4"
              style={{ width: "12rem" }}
              key={p._id}
            >
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
                    {p.description.substring(0, 25)}...
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
        </Carousel>

        {/* <div className="m-2 p-3">
          {products && products.length < total && (
            <button
              className="btn btn-warning"
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
            >
              {loading ? "Loading..." : "Loadmore"}
            </button>
          )}
        </div> */}
      </div>
    </Layout>
  );
};

export default HomePage;
