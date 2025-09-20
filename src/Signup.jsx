// src/pages/Signup.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone); // 10 digits

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // validations
    if (!form.name.trim()) {
      setError("Name is required");
      return;
    }
    if (!validatePhone(form.phone)) {
      setError("Enter a valid 10-digit phone number");
      return;
    }
    if (!validateEmail(form.email)) {
      setError("Enter a valid email");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Save to local storage
    const userData = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      password: form.password,
    };
    localStorage.setItem("fabclean_user", JSON.stringify(userData));

    setSuccess("Signed up successfully ✅");

    // redirect to login after 2 seconds
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };

  return (
    <div className="vh-100 bg-light d-flex align-items-center justify-content-center">


      <div className="card p-4 shadow-sm border-0" style={{ width: "400px" }}>
        <h3 className="mb-4 text-center fw-bold" style={{ color: "#f57c00" }}>
          Create Account
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              name="name"
              className="form-control border-secondary"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="phone"
              className="form-control border-secondary"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control border-secondary"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control border-secondary"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="confirmPassword"
              className="form-control border-secondary"
              placeholder="Re-enter Password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <button
            type="submit"
            className="btn w-100 fw-semibold"
            style={{ backgroundColor: "#7cb342", color: "#fff" }}
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-3">
          <span className="text-muted">
            Already have an account?{" "}
            <button
              className="btn btn-link p-0"
              style={{ color: "#f57c00" }}
              onClick={() => navigate("/login")}
            >
              Log in
            </button>
          </span>
        </div>
      </div>
    </div>
  );
}
