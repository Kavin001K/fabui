// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import Dashboard from "./Dashboard";
import Login from "./Login";
import Orders from "./Orders";
import SignUp from "./Signup"; // ✅ import your signup component
import "./App.css";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Login & SignUp */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} /> {/* ✅ new route */}

        {/* Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Orders */}
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Router>
  );
}
