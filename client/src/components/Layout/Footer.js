import React from "react";
import logo from "../../Images/images/logo2.png";
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineYoutube,
} from "react-icons/ai";
import { footerProductLinks } from "./../../static/data";
import { footercompanyLinks } from "../../static/data";
import { footerSupportLinks } from "../../static/data";
import img from "../../Images/images/footer-payment.png";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-dark text-white footer">
      <div className="container py-5">
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <img src={logo} alt="logo" className="mb-3" />
            <p>
              Fresh from farm to table - the ingredients for a beautiful meal.
            </p>
            <div className="icon d-flex">
              <a href="/" className="text-white me-3">
                <AiOutlineFacebook size={25} />
              </a>
              <a href="/" className="text-white me-3">
                <AiOutlineTwitter size={25} />
              </a>
              <a href="/" className="text-white me-3">
                <AiOutlineInstagram size={25} />
              </a>
              <a href="/" className="text-white">
                <AiOutlineYoutube size={25} />
              </a>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <p className="mb-3 ">Company</p>
            <ul className="list-unstyled">
              {footerProductLinks.map((link) => (
                <li key={link.name} className="mb-2">
                  <a href={link.link} className="text-white">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <p className="mb-3">Useful Links</p>
            <ul className="list-unstyled">
              {footercompanyLinks.map((link) => (
                <li key={link.name} className="mb-2">
                  <Link to={link.link} className="text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <p className="mb-3">Support</p>
            <ul className="list-unstyled">
              {footerSupportLinks.map((link) => (
                <li key={link.name} className="mb-2">
                  <a href={link.link} className="text-white">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="bg-dark text-muted py-2 text-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 mb-2 mb-lg-0 text-light">
              &copy; GreenGrocer Commerce <br /> Private Limited 2019-2023
            </div>
            <div className="col-lg-6 mb-2 mb-lg-0 text-light">
              “GreenGrocer” is owned managed <br />
              by "GreenGrocer Commerce Private Limited"
            </div>
            <div className="col-lg-3">
              {" "}
              <img src={img} alt="Payment Options" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
