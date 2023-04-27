import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout/Layout";
import UserMenu from "./../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      setOrders(data);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const { Option } = Select;

  const filterOptions = [
    { value: "all", label: "All Orders" },
    { value: "processing", label: "Processing" },
    { value: "Shipped", label: "Shipped" },
    { value: "deliverd", label: "deliverd" },
    { value: "cancel", label: "cancel" },
  ];

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const filteredOrders = orders.filter((o) => {
    if (!filter || filter === "all") {
      return true;
    } else if (filter === "processing") {
      return o.status === "Processing";
    } else if (filter === "Shipped") {
      return o.status === "Shipped";
    } else if (filter === "cancel") {
      return o.status === "cancel";
    } else if (filter === "deliverd") {
      return o.status === "deliverd";
    }
    return false;
  });

  return (
    <Layout title={"Your Orders"}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9 col-sm-12">
            <h2 className="text-center mt-1">All Orders </h2>
            <Select
              value={filter}
              onChange={handleFilterChange}
              className="w-25 orderfilter mb-2"
              // style={{ marginLeft: "830px" }}
            >
              {filterOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>

            {filteredOrders
              .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
              .map((o, i) => {
                return (
                  <div className="border  shadow mb-3" key={o._id}>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Status</th>
                          <th scope="col">Buyer</th>
                          <th scope="col">date</th>
                          <th scope="col">Payment</th>
                          <th scope="col">Items</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>{o?.status}</td>
                          <td>{o?.buyer?.name}</td>
                          <td>{moment(o?.createdAt).fromNow()}</td>
                          <td>{o?.payment.success ? "Success" : "Failed"}</td>
                          <td>{o?.products?.length}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="container">
                      {o?.products?.map((p, i) => (
                        <div
                          className="row mb-2 card flex-row align-items-center"
                          key={p._id}
                        >
                          <div className="col-md-2 col-sm-5">
                            <img
                              src={`/api/v1/product/product-photo/${p._id}`}
                              className="card-img-top"
                              alt={p.name}
                              onClick={() => navigate(`/product/${p.slug}`)}
                              style={{
                                height: "80px",
                                width: "auto",
                                maxWidth: "100%",
                              }}
                            />
                          </div>
                          <div className="col-md-6 col-sm-5">
                            <p className="fw-bold mb-1">{p.name}</p>
                            <p className="mb-1">
                              {p.description.substring(0, 30)}...
                            </p>
                          </div>
                          <div className="col-md-4">
                            <p className="fw-bold">Rs. {p.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
