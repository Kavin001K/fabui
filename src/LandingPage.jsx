// src/pages/Landing.jsx
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import logo from "../src/assets/logo.webp"; 

export default function Landing() {
  return (
    <div
      className="vh-100 d-flex flex-column"
      style={{
        backgroundImage: "url('https://png.pngtree.com/background/20250106/original/pngtree-laundry-detergent-halo-bubbles-simple-background-picture-image_15150387.jpg')", // <-- put your direct image link
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Navbar */}
      <nav className="d-flex justify-content-between align-items-center p-3 ">
        <div className="d-flex align-items-center">
          <img src={logo} alt="Logo" height="40" className="me-2" />
        </div>
        <div>
          <Link
            to="/login"
            className="btn fw-semibold px-4"
            style={{
              backgroundColor: "#7cb342", 
              color: "white",
              borderRadius: "8px",
            }}
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="d-flex flex-column justify-content-center align-items-center flex-grow-1 text-center px-3">
        <h1 className="fw-bold display-4 text-dark mb-3 ">
          Simplify Your Laundry with Ease
        </h1>
        <p
          className="lead text-secondary mb-4 "
          style={{ maxWidth: "600px" }}
        >
          Manage your laundry orders effortlessly. Track, schedule, and relax —
          we’ll handle the rest for you.
        </p>
        <Link
          to="/Dashboard"
          className="btn btn-lg fw-semibold px-5"
          style={{
            backgroundColor: "#fd7e14", // Orange
            color: "white",
            borderRadius: "10px",
          }}
        >
          Get Started
        </Link>
      </div>
    </div>
  );
}
