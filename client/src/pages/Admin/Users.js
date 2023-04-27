import React, { useEffect, useState } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import axios from "axios";
import useCategory from "../../hooks/useCategory";
import { NavLink } from "react-router-dom";

const Users = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [page] = useState(1);

  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/all-orders");
      setOrders(data);
      // console.log(data);
      // console.log(orders.length);
    } catch (error) {
      console.log(error);
    }
  };
  // const getTotalAmount = (data) => {
  //   let total = 0;
  //   data.forEach((order) => {
  //     total += parseFloat(order.payment.amount);
  //   });
  //   return total.toFixed(2);
  // };
  useEffect(() => {
    if (auth?.token) getOrders();
    getAllProducts();
    // eslint-disable-next-line
  }, [auth?.token]);

  //get products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
      // console.log(data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const totalAmount = orders.reduce((acc, order) => {
    const transactionAmount = Number(order.payment.transaction.amount);
    return acc + transactionAmount;
  }, 0);

  // console.log(`Total amount: ${totalAmount}`);
  const categories = useCategory();

  return (
    <Layout title={"Admin Dashboard"}>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-4">
            <div className="d-flex gap-2 justify-content-between mb-3">
              {loading && <p>Loading...</p>}
              <div className="card text-center w-50 mx-auto">
                <div className="card-body">
                  <NavLink to="/dashboard/admin/orders" className="nav-link">
                    <h5 className="card-title">Total Orders</h5>
                    <p className="card-text">{orders.length}</p>
                  </NavLink>
                </div>
              </div>
              <div className="card text-center w-50 mx-auto">
                <div className="card-body">
                  <h5 className="card-title">Total Sell</h5>
                  <p className="card-text">₹{totalAmount}</p>
                </div>
              </div>
            </div>

            <iframe
              className="border-0  rounded-2 shadow"
              title="orderstatus"
              width={500}
              height={480}
              src="https://charts.mongodb.com/charts-project-0-ehlbj/embed/charts?id=64305a0d-46c9-43a5-8bf8-7e6502e9433e&maxDataAge=3600&theme=light&autoRefresh=true"
            />
          </div>
          <div className="col-md-5">
            <div className="d-flex gap-2 justify-content-between mb-3">
              <div className="card text-center w-50 mx-auto">
                <div className="card-body">
                  <NavLink to="/dashboard/admin/products" className="nav-link">
                    <h5 className="card-title">Total Products</h5>
                    <p className="card-text">{products.length}</p>
                  </NavLink>
                </div>
              </div>
              <div className="card text-center w-50 mx-auto">
                <div className="card-body">
                  <NavLink
                    to="/dashboard/admin/create-category"
                    className="nav-link"
                  >
                    <h5 className="card-title">Total Category</h5>
                    <p className="card-text">{categories.length}</p>
                  </NavLink>
                </div>
              </div>
            </div>
            <iframe
              className="border-0 rounded-2 shadow"
              title="userlivetable"
              width={620}
              height={480}
              src="https://charts.mongodb.com/charts-project-0-ehlbj/embed/charts?id=643afb92-8ce8-4e7c-81ed-daab987d66d4&maxDataAge=3600&theme=light&autoRefresh=true"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
