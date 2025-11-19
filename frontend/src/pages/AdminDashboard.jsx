import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCurrentUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(
          "https://bookingservice-1-csg6.onrender.com/admin/stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setStats(res.data.data);
      } catch (err) {
        console.error("Failed to fetch stats", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const user = getCurrentUser();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading admin dashboard...</div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600 text-lg">
          Failed to load statistics. Please refresh the page.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Welcome back,{" "}
              <span className="font-semibold">
                {user?.username || user?.email || "Admin"}
              </span>
              . Here’s what’s happening in your booking system today.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => navigate("/admin/bookings")}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition"
            >
              View All Bookings
            </button>
            <button
              onClick={() => navigate("/admin/users")}
              className="px-4 py-2 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-black transition"
            >
              Manage Users
            </button>
          </div>
        </div>
      </div>

      {/* Stats + Recent bookings */}
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Stat cards */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-5">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Total Users
            </p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {stats.totalUsers}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              All registered users in the system.
            </p>
          </div>

          <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-5">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Total Bookings
            </p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {stats.totalBookings}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Overall bookings created by users.
            </p>
          </div>

          <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-5">
            <p className="text-xs uppercase tracking-wide text-gray-500">
              Services
            </p>
            <p className="mt-2 text-3xl font-bold text-gray-900">
              {stats.totalServices}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Active services available for booking.
            </p>
          </div>
        </div>

        {/* Recent bookings */}
        <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-gray-900">Recent Bookings</h2>
            <button
              onClick={() => navigate("/admin/bookings")}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View all
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left p-2 text-xs font-semibold text-gray-600">
                    User
                  </th>
                  <th className="text-left p-2 text-xs font-semibold text-gray-600">
                    Service
                  </th>
                  <th className="text-left p-2 text-xs font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="text-left p-2 text-xs font-semibold text-gray-600">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody>
                {stats.recentBookings.map((b) => (
                  <tr key={b._id} className="border-b last:border-b-0">
                    <td className="p-2">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">
                          {b.user?.username || "Unknown"}
                        </span>
                        <span className="text-xs text-gray-500">
                          {b.user?.email}
                        </span>
                      </div>
                    </td>
                    <td className="p-2 text-gray-800">
                      {b.service?.name || "N/A"}
                    </td>
                    <td className="p-2">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                          b.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : b.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {b.status}
                      </span>
                    </td>
                    <td className="p-2 text-gray-700">
                      {new Date(b.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
                {stats.recentBookings.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      className="p-4 text-center text-gray-500 text-sm"
                    >
                      No recent bookings yet.
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