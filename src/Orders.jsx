// src/pages/Orders.jsx
import React, { useEffect, useState } from "react";
import logo from "../src/assets/logo.webp"; 
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Orders() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    address: "",
    serviceId: "",
    pickupDate: "",
    specialInstructions: "",
    total: "",
  });
  const [message, setMessage] = useState("");

  // Prefill from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("fabclean_user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setForm((prev) => ({
        ...prev,
        customerName: user.name || "",
        customerPhone: user.phone || "",
        customerEmail: user.email || "",
      }));
    }
  }, []);

  // Fetch services
  useEffect(() => {
    fetch("http://localhost:5000/api/services")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch((err) => console.error("Error fetching services:", err));
  }, []);

  // Update total when service changes
  useEffect(() => {
    const selected = services.find((s) => s.id === form.serviceId);
    if (selected) {
      setForm((prev) => ({ ...prev, total: selected.price }));
    } else {
      setForm((prev) => ({ ...prev, total: "" }));
    }
  }, [form.serviceId, services]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!form.serviceId) {
      setMessage("❌ Please select a service");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Failed to create order");
        return;
      }

      setMessage("✅ Order created successfully!");
      setForm({
        customerName: form.customerName, 
        customerEmail: form.customerEmail,
        customerPhone: form.customerPhone,
        address: "",
        serviceId: "",
        pickupDate: "",
        specialInstructions: "",
        total: "",
      });

      // Refresh services
      const updated = await fetch("http://localhost:5000/api/services").then(r => r.json());
      setServices(updated);

    } catch (err) {
      console.error("Error submitting order:", err);
      setMessage("❌ Error submitting order");
    }
  };

  return (
    <div className="bg-light min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark ">
        <div className="container">
          <a className="navbar-brand d-flex align-items-center" href="#">
            <img src={logo} alt="FabClean Logo" height="40" className="me-2" />
          </a>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 fw-semibold">
              <li className="nav-item mx-2">
                <a className="nav-link text-black" href="./Dashboard/#home">Home</a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link text-black" href="./Dashboard/#services">Services</a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link text-black" href="./Dashboard#about">About us</a>
              </li>
              <li className="nav-item mx-2">
                <a className="nav-link text-black" href="./Dashboard#contact">Contact us</a>
              </li>
            </ul>
            <div className="d-flex ms-lg-3">
              <a className="btn fw-semibold me-2" href="./Login">Login</a>
              <a className="btn fw-semibold" href="/logout">Logout</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Header */}
      <div className="container py-5">
        <h2 className="fw-bold mb-4 text-center">Place your order</h2>

        {/* Form Card */}
        <div className="card shadow-sm p-4 mb-5">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Customer Name</label>
                <input
                  type="text"
                  name="customerName"
                  className="form-control"
                  value={form.customerName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Customer Email</label>
                <input
                  type="email"
                  name="customerEmail"
                  className="form-control"
                  value={form.customerEmail}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Customer Phone</label>
                <input
                  type="text"
                  name="customerPhone"
                  className="form-control"
                  value={form.customerPhone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  name="address"
                  className="form-control"
                  value={form.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Select Service</label>
                <select
                  name="serviceId"
                  className="form-select"
                  value={form.serviceId}
                  onChange={handleChange}
                  required
                >
                  <option value="">-- Choose a Service --</option>
                  {services.map(service => (
                    <option key={service.id} value={service.id}>
                      {service.name} (₹{service.price})
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Pickup Date</label>
                <input
                  type="date"
                  name="pickupDate"
                  className="form-control"
                  value={form.pickupDate}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
  <label className="form-label">Total</label>
  <input
    type="number"
    name="total"
    className="form-control"
    value={form.total}
    readOnly
    required
  />
</div>

<div className="col-md-6">
  <label className="form-label">Special Instructions</label>
  <textarea
    name="specialInstructions"
    className="form-control"
    value={form.specialInstructions}
    onChange={handleChange}
    rows="1"
    placeholder="Any special requests..."
  ></textarea>
</div>

            </div>

            <div className="mt-4 text-center">
              <button type="submit" className="btn btn-primary px-5">
                Submit Order
              </button>
            </div>
          </form>

          {message && (
            <div className="alert alert-info mt-4 text-center">{message}</div>
          )}
        </div>

     {/* Services Table */}
<h3 className="fw-bold mb-3">Available Services</h3>
<div className="card shadow-sm mb-5">
  <div className="card-body table-responsive">
    <table className="table table-hover">
      <thead className="table-light">
        <tr>
          <th>Name</th>
          <th>Duration</th>
          <th>Price</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {services.map((service) => (
          <tr key={service.id}>
            <td>{service.name}</td>
            <td>{service.duration}</td>
            <td>₹{service.price}</td>
            <td>
              <span
                className={`badge ${
                  service.status === "Active" ? "bg-success" : "bg-secondary"
                }`}
              >
                {service.status}
              </span>
            </td>
          </tr>
        ))}
        {services.length === 0 && (
          <tr>
            <td colSpan="4" className="text-center text-muted">
              No services available.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

      </div>
    </div>
  );
}
