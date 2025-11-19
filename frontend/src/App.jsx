import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { lazy } from "react";
import Navbar from "./components/Navbar";
import React  from "react";
import Home from "./pages/Home";
import AdminRoute from "./components/AdminRoutes";

// Lazy load components for better performance
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Services = lazy(() => import("./pages/Service"));
const MyBooking = lazy(() => import("./pages/MyBooking"));

// new admin pages
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const AdminBookings = lazy(() => import("./pages/AdminBookings"));
const AdminUsers = lazy(() => import("./pages/AdminUsers"));

function App() {
  return (
    <Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/service" element={<Services />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/my-bookings" element={<MyBooking />} />

          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/bookings"
            element={
              <AdminRoute>
                <AdminBookings />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <AdminUsers />
              </AdminRoute>
            }
          />

          <Route path="*" element={<Services />} /> {/* Fallback route */}
        </Routes>
    </Router>
  );
}

export default App;