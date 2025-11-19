import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export default function Navbar() {

  // store token in state (important)
  const [token, setToken] = useState(localStorage.getItem("accessToken"));

    const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });
  
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();


  // update token state when localStorage changes (optional but best)

  useEffect(() => {
    const checkToken = () => {
      const newToken = localStorage.getItem("accessToken");
      setToken(newToken);

      try {
        const rawUser = localStorage.getItem("user");
        setUser(rawUser ? JSON.parse(rawUser) : null);
      } catch {
        setUser(null);
      }
    };

    window.addEventListener("tokenChanged", checkToken);
    window.addEventListener("storage", checkToken);

    checkToken();

    return () => {
      window.removeEventListener("tokenChanged", checkToken);
      window.removeEventListener("storage", checkToken);
    };
  }, []);


  // logout function
  const handleLogout = async () => {
    try {
      await axios.post(
        "https://bookingservice-1-csg6.onrender.com/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log("Logout error:", error);
    }

    // remove token & update state
    localStorage.removeItem("accessToken");
    setToken(null);
    // window.location.href = "/login";
    navigate("/login");

  };

  return (
    <nav className="bg-white shadow-md top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-600">
          BookingApp
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <Link to="/service" className="hover:text-blue-600">
            Services
          </Link>

          {user?.role === "admin" && (
            <Link to="/admin/dashboard" className="hover:text-blue-600">
              Admin Panel
            </Link>
          )}

          {token ? (
            <>
              <Link to="/my-bookings" className="hover:text-blue-600">
                My Bookings
              </Link>

              <button
                onClick={handleLogout}
                className="text-red-500 cursor-pointer hover:text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600">
                Login
              </Link>
              <Link to="/register" className="hover:text-blue-600">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Hamburger Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? (
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md px-4 py-3 space-y-3 text-gray-700 font-medium animate-slideDown">
          <Link
            to="/service"
            className="block hover:text-blue-600"
            onClick={() => setMenuOpen(false)}
          >
            Services
          </Link>

             {user?.role === "admin" && (
            <Link
              to="/admin/dashboard"
              className="block hover:text-blue-600"
              onClick={() => setMenuOpen(false)}
            >
              Admin Panel
            </Link>
          )}

          {token ? (
            <>
              <Link
                to="/my-bookings"
                className="block hover:text-blue-600"
                onClick={() => setMenuOpen(false)}
              >
                My Bookings
              </Link>

              <button
                onClick={handleLogout}
                className="block text-red-500 hover:text-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block hover:text-blue-600"
                onClick={() => setMenuOpen(false)}
              >
                Login
              </Link>

              <Link
                to="/register"
                className="block hover:text-blue-600"
                onClick={() => setMenuOpen(false)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
