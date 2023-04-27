import React, { useState } from "react";
import Layout from "../components/Layout/Layout";
import Footer from "../components/Layout/Footer";
// import styles from "../static/data";
const Policy = () => {
  const [activeTab, setActiveTab] = useState(0);

  const toggleTab = (tab) => {
    if (activeTab === tab) {
      setActiveTab(0);
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <Layout title={"faq"}>
      <>
        <h1 className="text-center mb-2">Faq</h1>
        <div className={" d-flex flex-wrap mt-2 bg-light-subtle "}>
          <div className="mx-auto row container text-center">
            {/* single Faq */}

            <div className="pb-3 ">
              <button
                className="flex bg-danger-subtle border-opacity-25 items-center justify-between w-100  border-0"
                onClick={() => toggleTab(1)}
              >
                <span className="fs-5   ">What is your return policy?</span>
                {activeTab === 1 ? (
                  <svg
                    // className="h-25 w-25 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{
                      height: "0px",
                      width: "0px",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    // className="w-25 h-25 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{
                      height: "0px",
                      width: "0px",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </button>
              {activeTab === 1 && (
                <div className="mt-1">
                  <p className="fs-5  bg-success-subtle">
                    If you're not satisfied with your purchase, we accept
                    returns within 7 days of delivery. To initiate a return,
                    <br /> please email us at support@GreenGrocer.com with your
                    order number and a brief explanation of why you're returning
                    the item.
                    <br /> We do not accept return of vegetables and fuits so
                    before picking check its condition
                  </p>
                </div>
              )}
            </div>

            <div className=" pb-3 ">
              <button
                className="flex bg-danger-subtle border-opacity-25 items-center justify-between w-100  border-0"
                onClick={() => toggleTab(3)}
              >
                <span className=" fs-5 ">How do I track my order?</span>
                {activeTab === 3 ? (
                  <svg
                    // className="h-100 w-25 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{
                      height: "0px",
                      width: "0px",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    // className="h-100 w-25 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{
                      height: "0px",
                      width: "0px",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </button>
              {activeTab === 3 && (
                <div className="mt-1">
                  <p className="fs-5  bg-success-subtle">
                    You can track your order by clicking the tracking link in
                    your shipping confirmation email, or
                    <br /> by logging into your account on our website and
                    viewing the order details.
                  </p>
                </div>
              )}
            </div>

            <div className=" pb-3">
              <button
                className="flex bg-danger-subtle border-opacity-25 items-center justify-between w-100  border-0"
                onClick={() => toggleTab(4)}
              >
                <span className=" fs-5 ">
                  How do I contact customer support?
                </span>
                {activeTab === 4 ? (
                  <svg
                    // className="h-100 w-25 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{
                      height: "0px",
                      width: "0px",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    // className="h-100 w-25 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{
                      height: "0px",
                      width: "0px",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </button>
              {activeTab === 4 && (
                <div className="mt-1">
                  <p className="fs-5  bg-success-subtle">
                    You can contact our customer support team by emailing us at
                    support@myGreenGrocer.com, or <br />
                    by calling us at (108) 991 168 between the hours of 9am and
                    3pm IST, Monday through Friday.
                  </p>
                </div>
              )}
            </div>

            <div className=" pb-3">
              <button
                className="flex bg-danger-subtle border-opacity-25 items-center justify-between w-100  border-0"
                onClick={() => toggleTab(5)}
              >
                <span className=" fs-5 ">Can I change or cancel my order?</span>
                {activeTab === 5 ? (
                  <svg
                    // className="h-100 w-25 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{
                      height: "0px",
                      width: "0px",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    // className="h-100 w-25 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{
                      height: "0px",
                      width: "0px",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </button>
              {activeTab === 5 && (
                <div className="mt-1">
                  <p className="fs-5  bg-success-subtle">
                    Unfortunately, once an order has been placed, we are not
                    able to make changes or cancellations.
                    <br /> If you no longer want the items you've ordered, you
                    can return them for a refund within 1 days of delivery.
                    <br /> YOU CAN REFUSE TO TAKE THE DELIVERY.
                  </p>
                </div>
              )}
            </div>

            <div className=" pb-3">
              <button
                className="flex bg-danger-subtle border-opacity-25 items-center justify-between w-100  border-0"
                onClick={() => toggleTab(6)}
              >
                <span className=" fs-5 ">
                  Do you offer international shipping?
                </span>
                {activeTab === 6 ? (
                  <svg
                    // className="h-100 w-25 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{
                      height: "0px",
                      width: "0px",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    // className="h-100 w-25 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{
                      height: "0px",
                      width: "0px",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </button>
              {activeTab === 6 && (
                <div className="mt-1">
                  <p className="fs-5  bg-success-subtle">
                    Currently, we only offer shipping within the Local State of
                    India.
                    <br />
                    Like Ahmedabad,Mumbai,Surat Only
                    <br />
                    Selected Areas Only Please Check if your order is available
                    before checkout
                  </p>
                </div>
              )}
            </div>

            <div className=" pb-3">
              <button
                className="flex bg-danger-subtle border-opacity-25 items-center justify-between w-100  border-0"
                onClick={() => toggleTab(7)}
              >
                <span className=" fs-5 ">
                  What payment methods do you accept?
                </span>
                {activeTab === 7 ? (
                  <svg
                    // className="h-100 w-25 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{
                      height: "0px",
                      width: "0px",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    // className="h-100 w-25 "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{
                      height: "0px",
                      width: "0px",
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </button>
              {activeTab === 7 && (
                <div className="mt-1">
                  <p className="fs-5  bg-success-subtle">
                    We accept visa,mastercard,paypal payment method also we have
                    cash on delivery system.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
      <Footer />
    </Layout>
  );
};

export default Policy;
