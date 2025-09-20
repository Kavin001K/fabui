// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../src/assets/logo.webp"; 

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    // get user from local storage
    const savedUser = JSON.parse(localStorage.getItem("fabclean_user"));
    if (!savedUser) {
      setError("No user found. Please sign up first.");
      return;
    }

    if (
      savedUser.email === form.email &&
      savedUser.password === form.password
    ) {
      // go to dashboard
      navigate("/dashboard");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="vh-100 bg-light d-flex flex-column">
      <header className="p-3">
        <img src={logo} alt="Fab Clean Logo" style={{ height: "40px" }} />
      </header>

      <div className="d-flex flex-grow-1 align-items-center justify-content-center">
        <div
          className="card p-4 shadow-sm border-0"
          style={{ width: "400px", background: "#ffffff" }}
        >
          <h3 className="mb-4 text-center fw-bold" style={{ color: "#f57c00" }}>
            Welcome back!
          </h3>

          <form onSubmit={handleLogin}>
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

            {error && <div className="alert alert-danger">{error}</div>}

            <button
              type="submit"
              className="btn w-100 mb-3 fw-semibold"
              style={{ backgroundColor: "#7cb342", color: "#fff" }}
            >
              Log in
            </button>
          </form>

          <div className="text-center mb-3">
            <a href="#" style={{ color: "#f57c00" }} className="d-block">
              I forgot my password
            </a>
            <span className="text-muted">
              Don’t have an account?{" "}
              <button
                className="btn btn-link p-0"
                style={{ color: "#7cb342" }}
                onClick={() => navigate("/signup")}
              >
                Sign up
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
