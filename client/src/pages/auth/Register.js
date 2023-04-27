import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../../styles/AuthStyles.css";
import img from "../../Images/images/loginimage.avif";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");

  const navigate = useNavigate();
  //form function when sumbit trigger
  //e stands for event
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
        address,
        answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
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
    <Layout title="Register - GreenGrocer">
      <section
        style={{
          backgroundColor: "#ecfaff",
          color: "##110e0e",
          height: "90vh",
          fontFamily: "Josefin Sans",
        }}
      >
        <div className="container py-5 h-50">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1 rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src={img}
                      alt="login form"
                      className="img-fluid h-100"
                      style={{ borderRadius: "1rem 0 0 1rem" }}
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={handleSubmit}>
                        <div className="d-flex align-items-center mb-1 pb-1">
                          <i
                            className="fas fa-user fa-2x me-3"
                            style={{ color: "#3F704D" }}
                          ></i>
                          <span className="h1 fw-bold mb-0">GreenGrocer</span>
                        </div>

                        <h5
                          className="fw-normal mb-0 pb-3"
                          style={{ letterSpacing: "1px" }}
                        >
                          Register your account
                        </h5>

                        <div className="form-outline mb-2">
                          <input
                            type="text"
                            // id="form2Example17"
                            className="form-control form-control-lg"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Your name"
                            required
                          />
                        </div>
                        <div className="form-outline mb-2">
                          <input
                            type="email"
                            // id="form2Example17"
                            className="form-control form-control-lg"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Email address"
                          />
                        </div>

                        <div className="form-outline mb-2">
                          <input
                            type="password"
                            className="form-control form-control-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Password"
                          />
                        </div>
                        <div className="form-outline mb-2">
                          <input
                            type="number"
                            className="form-control form-control-lg"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            placeholder="Phone No."
                          />
                        </div>
                        <div className="form-outline mb-2">
                          <input
                            type="test"
                            className="form-control form-control-lg"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            placeholder="Address"
                          />
                        </div>
                        <div className="form-outline mb-2">
                          <input
                            type="test"
                            className="form-control form-control-lg"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            required
                            placeholder="What is Your Favariote Grocery item?"
                          />
                        </div>

                        <div className="pt-1 mb-2">
                          <button className="btn btn-dark btn-lg btn-block">
                            Register
                          </button>{" "}
                          {/* <a
                            className="small btn btn btn-danger "
                            onClick={() => {
                              navigate("/forgot-password");
                            }}
                          >
                            Forgot password?
                          </a> */}
                        </div>

                        <p className=" pb-lg-2" style={{ color: "#393f81" }}>
                          Already have Account?
                          <Link
                            to="/login"
                            style={{
                              color: "#393f81",
                              marginLeft: "5px",
                            }}
                          >
                            Login here
                          </Link>
                        </p>
                        <Link to="#!" className="small text-muted">
                          Terms of use.&nbsp;&nbsp;
                        </Link>
                        <Link to="#!" className="small text-muted">
                          Privacy policy
                        </Link>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Register;
