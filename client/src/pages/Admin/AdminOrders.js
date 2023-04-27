import React, { useEffect, useState } from "react";
import AdminMenu from "./../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../context/auth";
import moment from "moment";
import { Select } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { BsCheckAll } from "react-icons/bs";
// import { Select } from "antd";

const { Option } = Select;

const AdminOrders = () => {
  const [status] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const [filter, setFilter] = useState("all");

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
      // console.log(orders.length);
    } catch (error) {
      console.log(error);
    }
  };
  const filterOptions = [
    { value: "all", label: "All Orders" },
    { value: "Not Process", label: "Not Process" },
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
    } else if (filter === "Not Process") {
      return o.status === "Not Process";
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

  const handleChange = async (orderId, value) => {
    try {
      const { data } = await axios.put(
        `/api/v1/auth/order-status/${orderId}`,
        // setStatus(data),
        {
          status: value,
        },
        toast.success(`The Order is ${value}`)
      );
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout title={"all orders from customer"}>
      <div className="row container-fluid ">
        <div className="col-md-3 ">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center mt-3">All Orders</h1>
          <Select
            value={filter}
            onChange={handleFilterChange}
            className="w-25 mb-2"
            style={{ marginLeft: "830px" }}
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
                <div className="border mb-4" key={i}>
                  <table className="table table-striped">
                    <thead className="bg-light">
                      <tr>
                        <th scope="col" style={{ width: "5%" }}>
                          #
                        </th>
                        <th scope="col" style={{ width: "20%" }}>
                          Status
                        </th>
                        <th scope="col" style={{ width: "20%" }}>
                          Buyer
                        </th>
                        <th scope="col" style={{ width: "25%" }}>
                          Date
                        </th>
                        <th scope="col" style={{ width: "15%" }}>
                          Payment
                        </th>
                        <th scope="col" style={{ width: "15%" }}>
                          Quantity
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr
                        key={o._id}
                        className={`${
                          o.status === "processing"
                            ? "table-info"
                            : o.status === "completed"
                            ? "table-success"
                            : o.status === "cancelled"
                            ? "table-danger"
                            : ""
                        }`}
                      >
                        <td>{i + 1}</td>
                        <td>
                          <Select
                            bordered={false}
                            onChange={(value) => handleChange(o._id, value)}
                            defaultValue={o?.status}
                          >
                            {status.map((s, i) => (
                              <Option key={i} value={s}>
                                {s}
                              </Option>
                            ))}
                          </Select>
                        </td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>
                          {o?.payment.success ? (
                            <BsCheckAll color="green" size={23} />
                          ) : (
                            <CloseOutlined />
                          )}
                        </td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="container">
                    {o?.products?.map((p, i) => (
                      <div
                        className="row mb-1 card flex-row align-items-center"
                        key={i}
                      >
                        <div className="col-md-2">
                          <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            className="card-img-top"
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
                          <p className="mb-1">
                            {p.description.substring(0, 30)}...
                          </p>
                        </div>
                        <div className="col-md-2">
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
    </Layout>
    /* <div className="container">
                  {o?.products?.map((p, i) => (
                    <div className="row mb-2 card flex-row" key={p._id}>
                      <div className="col-md-1 d-flex align-items-center justify-content-center">
                        <img
                          src={`/api/v1/product/product-photo/${p._id}`}
                          className="card-img-top"
                          alt={p.name}
                          height="105rem"
                        />
                      </div>
                      <div className="col-md-11 d-flex flex-column justify-content-center">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <h5>{p.name}</h5>
                          <span>Price: {p.price}</span>
                        </div>
                        <p>{p.description.substring(0, 30)}</p>
                      </div>
                    </div>
                  ))}
                </div> */
  );
};

export default AdminOrders;
