import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { toast } from "react-toastify";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

const CartPage = () => {
  const [cart, setCart] = useCart();
  const [auth] = useAuth(); //setAuth
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  //total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        let itemprice = parseFloat(item.price);
        total = total + itemprice;
        return itemprice;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //delete cart item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //get payment gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/braintree/token");
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  //handle payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      toast.success("payment completed successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center   mb-1">
              {`Hello, ${auth?.token && auth?.user?.name}!`}
            </h1>
            <h4 className="text-center mb-4">
              {cart?.length
                ? `You have ${cart.length} item${
                    cart.length > 1 ? "s" : ""
                  } in your cart ${
                    auth?.token ? "" : "- please login to checkout"
                  }`
                : "Your cart is currently empty."}
            </h4>
          </div>

          <div className="row">
            <div className="col-md-8">
              <h2>Shopping Cart</h2>
              {cart?.map((p) => (
                <div
                  className="row mb-2 card flex-row align-items-center"
                  key={p._id}
                >
                  <div className="col-md-2">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="card-img-top"
                      onClick={() => navigate(`/product/${p.slug}`)}
                      alt={p.name}
                      style={{
                        height: "80px",
                        width: "auto",
                        maxWidth: "100%",
                      }}
                    />
                  </div>
                  <div className="col-md-6">
                    <p className="fw-bold mb-1">{p.name}</p>
                    <p className="mb-1">{p.description.substring(0, 30)}...</p>
                  </div>
                  <div className="col-md-2">
                    <p className="fw-bold">Rs. {p.price}</p>
                  </div>
                  <div className="col-md-2">
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => removeCartItem(p._id)}
                    >
                      <MdOutlineRemoveShoppingCart />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-md-4">
              <h2 className="">Order Summary</h2>

              <div className="card">
                <div className="card-body">
                  <h5 className="card-title fw-semibold">Subtotal</h5>
                  <p className="card-text">Rs. {totalPrice()}</p>
                </div>
              </div>

              {auth?.user?.address ? (
                <>
                  <div className="d-flex align-items-center mb-3">
                    <div className="flex-grow-1">
                      <b className="fs-3">Shipping Address</b>
                      <p className="w-50 h-50 ms-3 ">{auth?.user?.address}</p>
                    </div>
                    <button
                      className="btn btn-outline-warning text-dark border-black  ml-3"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      <FiEdit className="mr-2" />
                      address
                    </button>
                  </div>
                </>
              ) : (
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => navigate("/dashboard/user/profile")}
                    >
                      Add Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => navigate("/login", { state: "/cart" })}
                    >
                      Login to Check Out
                    </button>
                  )}
                </div>
              )}

              {!clientToken || !auth?.token || !cart?.length ? (
                ""
              ) : (
                <div>
                  <h5>Payment Method</h5>
                  <div id="payment-section">
                    <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: {
                          flow: "vault",
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <div className="mt-2">
                      <button
                        className="btn btn-primary"
                        onClick={handlePayment}
                        disabled={
                          loading ||
                          !instance ||
                          !auth?.user?.address ||
                          auth?.user?.role !== 0
                        }
                      >
                        {loading ? "Processing..." : "Pay Now"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
