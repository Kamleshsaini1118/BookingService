import React, { useEffect, useState } from "react";
import axios from "axios";
import { getCurrentUser } from "../utils/auth";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

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
    return <div className="p-6">Loading admin dashboard...</div>;
  }

  if (!stats) {
    return <div className="p-6">Failed to load stats.</div>;
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Admin Dashboard {user && `- ${user.username}`}
      </h1>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-gray-500 text-sm">Total Users</h2>
          <p className="text-2xl font-bold">{stats.totalUsers}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-gray-500 text-sm">Total Bookings</h2>
          <p className="text-2xl font-bold">{stats.totalBookings}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-gray-500 text-sm">Total Services</h2>
          <p className="text-2xl font-bold">{stats.totalServices}</p>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="font-semibold mb-2">Recent Bookings</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">User</th>
                <th className="text-left p-2">Service</th>
                <th className="text-left p-2">Status</th>
                <th className="text-left p-2">Created At</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentBookings.map((b) => (
                <tr key={b._id} className="border-b">
                  <td className="p-2">
                    {b.user?.username} ({b.user?.email})
                  </td>
                  <td className="p-2">{b.service?.name}</td>
                  <td className="p-2 capitalize">{b.status}</td>
                  <td className="p-2">
                    {new Date(b.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
              {stats.recentBookings.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-2 text-center text-gray-500">
                    No recent bookings.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}