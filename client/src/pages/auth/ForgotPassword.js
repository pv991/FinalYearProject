import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../../styles/AuthStyles.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();
  //form login funciton
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/forgot-password", {
        email,
        newPassword,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);

        //store the data in local with stringify because json data is not support in local
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  return (
    <Layout title={"Reset Password"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <h1 className="title">
              <span
                style={{
                  marginLeft: "10px",
                  fontWeight: "bold",
                  color: "darkgreen",
                }}
              >
                RESET
              </span>
              <span style={{ color: "green" }}>PASSWORD</span>
            </h1>
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              // id="exampleInputEmail"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              // id="exampleInputEmail"
              placeholder="Enter Your Secret Answer."
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              // id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Reset
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
