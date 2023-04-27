import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./UserMenu.css";
// import { NavLink, useLocation } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";
import {
  MdDashboard,
  MdOutlineProductionQuantityLimits,
  MdCoPresent,
  MdEditDocument,
  MdPlaylistAdd,
} from "react-icons/md";
const AdminMenu = () => {
  // get current URL
  const location = useLocation();

  const dashboardClass =
    location.pathname === "/dashboard/admin" ? "nav-link active" : "nav-link";

  return (
    <>
      <nav className="navbar-vertical user-menu">
        <ul>
          <li className="nav-item">
            <NavLink to="/dashboard/admin/chart" className="nav-link">
              <MdDashboard className="nav-icon" />
              <span className="nav-text">Admin</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/dashboard/admin/profile" className={dashboardClass}>
              <MdCoPresent className="nav-icon" />
              <span className="nav-text">Profile </span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/dashboard/admin/create-category" className="nav-link">
              <MdPlaylistAdd className="nav-icon" />
              <span className="nav-text">Create Category</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/dashboard/admin/create-product" className="nav-link">
              <MdEditDocument className="nav-icon" />
              <span className="nav-text">Create product</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/dashboard/admin/products" className="nav-link">
              <MdOutlineProductionQuantityLimits className="nav-icon" />
              <span className="nav-text"> Products</span>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/dashboard/admin/orders" className="nav-link">
              <FaClipboardList className="nav-icon" />
              <span className="nav-text">Orders</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default AdminMenu;
