import React, { useEffect, useState } from "react";
import { FaUser, FaMapMarkerAlt, FaShoppingBag } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";
import "./UserMenu.css";
import { useAuth } from "../../context/auth";
import axios from "axios";
const UserMenu = () => {
  // get current URL
  const location = useLocation();
  const dashboardClass =
    location.pathname === "/dashboard/user" ? "nav-link active" : "nav-link";
  const [orders, SetOrders] = useState([]);
  const [auth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/auth/orders");
      SetOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);
  return (
    <>
      <nav className="navbar-vertical user-menu">
        <ul>
          <li className="nav-item">
            <NavLink to="/dashboard/user/userinfo" className={dashboardClass}>
              <MdSpaceDashboard className="nav-icon" />
              <span className="nav-text">Dashboard</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/dashboard/user/profile" className="nav-link">
              <FaUser className="nav-icon" />
              <span className="nav-text">Profile</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/dashboard/user/orders" className="nav-link" disabled>
              <FaShoppingBag className="nav-icon" />
              <span className="nav-text">Orders({orders.length})</span>
            </NavLink>
          </li>
          <li className="nav-item coming mt-2">
            <NavLink to="/contactus" className="nav-link">
              <FaMapMarkerAlt className="nav-icon" />
              <span className="nav-text">Coming Soon</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default UserMenu;
