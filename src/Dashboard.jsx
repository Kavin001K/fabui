import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../src/assets/logo.webp";
import "./App.css";
import { useNavigate, Link } from "react-router-dom";
import TextType from "./TextType";

export default function Dashboard() {
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState(null);

  // ✅ Check login status when component mounts
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    setLoggedInUser(user);
  }, []);

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    navigate("/login");
  };

  const handleCardClick = () => {
    navigate("/orders"); // Navigate to Orders.jsx
  };

  return (
    <div className="bg-light ">
      {/* Hero Section (with Navbar inside) */}
      <header className="hero-section d-flex flex-column">
        {/* Navbar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-transparent">
          <div className="container">
            {/* Logo */}
            <a className="navbar-brand d-flex align-items-center" href="#">
              <img src={logo} alt="FabClean Logo" height="40" className="me-2" />
            </a>

            {/* Toggle for mobile */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Nav Items */}
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 fw-semibold">
                <li className="nav-item mx-2">
                  <a className="nav-link text-white" href="#home">
                    Home
                  </a>
                </li>
                <li className="nav-item mx-2">
                  <a className="nav-link text-white" href="#services">
                    Services
                  </a>
                </li>
                <li className="nav-item mx-2">
                  <a className="nav-link text-white" href="#about">
                    About us
                  </a>
                </li>
                <li className="nav-item mx-2">
                  <a className="nav-link text-white" href="#contact">
                    Contact us
                  </a>
                </li>
              </ul>

             <div className="d-flex ms-lg-3">
  {localStorage.getItem("fabclean_user") ? (
    // Logout button when logged in
    <button
      className="btn fw-semibold"
      onClick={() => {
        localStorage.removeItem("fabclean_user");
        navigate("/LandingPage");
      }}
    >
      Logout
    </button>
  ) : (
    // Login + Signup when NOT logged in
    <>
      <a className="btn fw-semibold me-2" href="./Login">Login</a>
      <a className="btn fw-semibold" href="./Signup">Sign up</a>
    </>
  )}
</div>


            </div>
          </div>
        </nav>

        {/* Hero Content with TextType */}
        <div className="container text-center text-white d-flex flex-column justify-content-center flex-grow-1">
          <h1 className="fw-bold display-4">
            Welcome to <span className="text-success">Fab</span>
            <span className="">Clean</span>
          </h1>
          <p className="lead mt-3">
            <TextType
              text={[
                "Your trusted partner for laundry & dry cleaning services.",
                "Doorstep pickup & delivery across India.",
                "Affordable. Reliable. Premium Care.",
              ]}
              typingSpeed={60}
              deletingSpeed={40}
              pauseDuration={1800}
              loop={true}
              showCursor={true}
              textColors={["#ffffff", "#ffc107", "#28a745"]}
              className="fw-semibold"
            />
          </p>
        </div>
      </header>

      {/* Services Section */}
      <div className="container my-5" id="services">
        <h2 className="text-center mb-4 fw-bold">Our Services</h2>
        <div className="row g-4">
          {/* Service 1 */}
          <div className="col-md-3">
            <div
              className="card h-100 shadow-sm border-0 text-center p-4 d-flex flex-column align-items-center service-card"
              onClick={handleCardClick}
            >
              <div className="icon-wrapper d-flex align-items-center justify-content-center mb-3">
                <img
                  src="https://s3.ap-south-1.amazonaws.com/fabriconew.in/common/services/wf.png"
                  alt="Wash & Fold"
                  width="80"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <h5 className="fw-bold">Wash & Fold</h5>
              <p className="text-muted">Affordable laundry service</p>
            </div>
          </div>

          {/* Service 2 */}
          <div className="col-md-3">
            <div
              className="card h-100 shadow-sm border-0 text-center p-4 d-flex flex-column align-items-center service-card"
              onClick={handleCardClick}
            >
              <div className="icon-wrapper d-flex align-items-center justify-content-center mb-3">
                <img
                  src="https://s3.ap-south-1.amazonaws.com/fabriconew.in/common/services/dc.png"
                  alt="Dry Cleaning"
                  width="80"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <h5 className="fw-bold">Dry Cleaning</h5>
              <p className="text-muted">Premium dry cleaning services</p>
            </div>
          </div>

          {/* Service 3 */}
          <div className="col-md-3">
            <div
              className="card h-100 shadow-sm border-0 text-center p-4 d-flex flex-column align-items-center service-card"
              onClick={handleCardClick}
            >
              <div className="icon-wrapper d-flex align-items-center justify-content-center mb-3">
                <img
                  src="https://s3.ap-south-1.amazonaws.com/fabriconew.in/common/services/wi.png"
                  alt="Ironing"
                  width="80"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <h5 className="fw-bold">Ironing</h5>
              <p className="text-muted">Perfect crisp finish</p>
            </div>
          </div>

          {/* Service 4 */}
          <div className="col-md-3">
            <div
              className="card h-100 shadow-sm border-0 text-center p-4 d-flex flex-column align-items-center service-card"
              onClick={handleCardClick}
            >
              <div className="icon-wrapper d-flex align-items-center justify-content-center mb-3">
                <img
                  src="https://s3.ap-south-1.amazonaws.com/fabriconew.in/common/services/pl.png"
                  alt="Premium Laundry"
                  width="80"
                  style={{ objectFit: "contain" }}
                />
              </div>
              <h5 className="fw-bold">Premium Laundry</h5>
              <p className="text-muted">Luxury care for your clothes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Doorstep Pickup Section */}
      <section className="py-1 text-white text-center mt-0">
        <div className="container">
          <div className="d-flex flex-column align-items-center">
            <img
              src="https://cdn-icons-png.freepik.com/512/12515/12515246.png"
              alt="Pickup Icon"
              width="90"
              height="90"
              className="mb-2"
            />
            <h4 className="fw-bold text-black mb-1">Doorstep Pickup</h4>
            <p className="mb-2 text-black">Book your service now</p>
            <a href="/orders" className="btn btn-warning fw-semibold px-4">
              Book Now
            </a>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <div className="container py-4" id="about">
        <div className="row align-items-center">
          {/* Left Content */}
          <div className="col-md-6">
            <h2 className="fw-bold mb-4">About Us</h2>
            <p className="text-muted" style={{ lineHeight: "1.8" }}>
              At <strong>FabFab Laundry</strong>, we believe that your time is
              valuable. That’s why we provide premium, affordable, and reliable
              laundry solutions designed to make your life easier. From everyday
              washing and folding to high-quality dry cleaning and premium
              fabric care, we handle your clothes with the utmost attention and
              care. <br />
              <br />
              With doorstep pickup and delivery, eco-friendly processes, and a
              dedicated team, we ensure your garments are not only clean but
              also fresh, crisp, and ready when you need them. Your satisfaction
              is our priority, and we aim to make laundry hassle-free for every
              household.
            </p>
          </div>

          {/* Right Image */}
          <div className="col-md-6 text-center">
            <img
              src="https://19laundryservices.com/theme/prolaundry/images/7380013_32370.jpg"
              alt="Laundry Machine"
              className="img-fluid"
              height="400"
              style={{
                Height: "500px",
                Width: "350px",
              }}
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="py-3 bg-light">
        <div className="container text-center">
          <div className="row g-4">
            {/* Stat 1 */}
            <div className="col-md-4">
              <h2 className="fw-bold text-success display-5">500+</h2>
              <p className="text-secondary fs-5">Stores Across India</p>
            </div>

            {/* Stat 2 */}
            <div className="col-md-4">
              <h2 className="fw-bold text-warning display-5">200+</h2>
              <p className="text-secondary fs-5">Cities Served</p>
            </div>

            {/* Stat 3 */}
            <div className="col-md-4">
              <h2 className="fw-bold text-primary display-5">1 Lac+</h2>
              <p className="text-secondary fs-5">Happy Customers</p>
            </div>
          </div>
        </div>
      </section>

    

            {/* ✅ Footer (Contact info moved here & green bg) */}
      <footer id="contact"className="py-5" style={{ backgroundColor: "#28a745" }}>
        <div className="container text-center text-white">
          <h4 className="fw-bold mb-3">Contact Us</h4>
          <p className="mb-2 fs-5">
            📧 Email:{" "}
            <a
              href="mailto:support@fabclean.in"
              className="text-white text-decoration-none"
            >
              support@fabclean.in
            </a>
          </p>
          <p className="fs-5">
            📞 Phone:{" "}
            <a
              href="tel:+919876543210"
              className="text-white text-decoration-none"
            >
              +91 98765 43210
            </a>
          </p>
          <hr className="border-light" />
          <p className="m-0">
            © {new Date().getFullYear()} FabClean. All Rights Reserved.
          </p>
        </div>
      </footer>

    </div>
  );
}
