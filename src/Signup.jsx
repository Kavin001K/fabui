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
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);
  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone); // 10 digits

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // validations
    if (!form.name.trim()) return setError("Name is required");
    if (!validatePhone(form.phone))
      return setError("Enter a valid 10-digit phone number");
    if (!validateEmail(form.email)) return setError("Enter a valid email");
    if (form.password.length < 6)
      return setError("Password must be at least 6 characters");
    if (form.password !== form.confirmPassword)
      return setError("Passwords do not match");

    setLoading(true);

    try {
      const res = await fetch("https://fabfab.onrender.com/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        // save JWT and user info
        localStorage.setItem("fabfab_token", data.token);
        localStorage.setItem("fabfab_user", JSON.stringify(data.customer));

        navigate("/dashboard");
      } else {
        setError(data.error || "Signup failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
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
              required
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
              required
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
              required
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
              required
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
              required
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button
            type="submit"
            className="btn w-100 fw-semibold"
            style={{ backgroundColor: "#7cb342", color: "#fff" }}
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
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
