import React from "react";
import Layout from "./../../components/Layout/Layout";
import UserMenu from "./../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={"Users dashboard"}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 ">
            <UserMenu />
          </div>
          <div className="col-md-10 col-sm-12 mt-5">
            <div className="card w-75 card-full-width-sm p-3 user-info-card">
              <div className="card-header">
                <h2 className="card-title">
                  <i className="fas fa-user"></i> User Information
                </h2>
              </div>
              <div className="card-body">
                <div className="row user-info-item">
                  <div className="col-2">
                    <i className="fas fa-user-circle"></i>
                  </div>
                  <div className="col-5">
                    <span className="item-title">Name:</span>
                  </div>
                  <div className="col-5">
                    <span className="item-value">{auth?.user?.name}</span>
                  </div>
                </div>
                <div className="row user-info-item">
                  <div className="col-2">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="col-5">
                    <span className="item-title">Email:</span>
                  </div>
                  <div className="col-5">
                    <span className="item-value">{auth?.user?.email}</span>
                  </div>
                </div>
                <div className="row user-info-item">
                  <div className="col-2">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="col-5">
                    <span className="item-title">Phone Number:</span>
                  </div>
                  <div className="col-5">
                    <span className="item-value">{auth?.user?.phone}</span>
                  </div>
                </div>
                <div className="row user-info-item">
                  <div className="col-2">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="col-5">
                    <span className="item-title">Address:</span>
                  </div>
                  <div className="col-5">
                    <span className="item-value">{auth?.user?.address}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
