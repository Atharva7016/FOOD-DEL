import React from "react";
import "./Footer.css";
import { assets } from "../../assets/assets"
import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToHeader = () => {
    const el = document.getElementById("header");
    if (el && location.pathname === "/") {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/", { state: { scrollTo: "header" } });
    }
  };

  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>
            Tomato brings your favourite meals to your doorstep. Fresh ingredients,
            trusted restaurants, and fast delivery — so you can enjoy great food
            anytime, anywhere.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li onClick={goToHeader}>Home</li>
                <li onClick={goToHeader}>About us</li>
                <li onClick={goToHeader}>Delivery</li>
                <li onClick={goToHeader}>Privacy Policy</li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91 9988776655</li>
                <li>contactTomato@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright"> Copyright 2025 @ Tomato.com - All Right Reserved </p>
    </div>
  );
};

export default Footer;
