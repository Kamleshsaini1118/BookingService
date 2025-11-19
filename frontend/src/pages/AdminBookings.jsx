import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(
        "https://bookingservice-1-csg6.onrender.com/admin/bookings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setBookings(res.data.data.bookings || []);
    } catch (err) {
      console.error("Failed to fetch bookings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.patch(
        `https://bookingservice-1-csg6.onrender.com/admin/bookings/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      await fetchBookings();
    } catch (err) {
      console.error("Failed to update booking", err);
    }
  };

  if (loading) {
    return <div className="p-6">Loading bookings...</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Manage Bookings</h1>
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">User</th>
              <th className="p-2 text-left">Service</th>
              <th className="p-2 text-left">Date</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id} className="border-b">
                <td className="p-2">
                  {b.user?.username} ({b.user?.email})
                </td>
                <td className="p-2">{b.service?.name}</td>
                <td className="p-2">
                  {b.date ? new Date(b.date).toLocaleString() : "-"}
                </td>
                <td className="p-2 capitalize">{b.status}</td>
                <td className="p-2 space-x-2">
                  <button
                    onClick={() => updateStatus(b._id, "confirmed")}
                    className="px-2 py-1 text-xs rounded bg-green-500 text-white"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => updateStatus(b._id, "cancelled")}
                    className="px-2 py-1 text-xs rounded bg-red-500 text-white"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr>
                <td colSpan="5" className="p-2 text-center text-gray-500">
                  No bookings found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}