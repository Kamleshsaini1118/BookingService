import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(
        "https://bookingservice-1-csg6.onrender.com/admin/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      setUsers(res.data.data.users || []);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleBlock = async (id, block) => {
    try {
      const token = localStorage.getItem("accessToken");
      await axios.patch(
        `https://bookingservice-1-csg6.onrender.com/admin/users/${id}/${block ? "block" : "unblock"}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      await fetchUsers();
    } catch (err) {
      console.error("Failed to update user", err);
    }
  };

  if (loading) {
    return <div className="p-6">Loading users...</div>;
  }

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Manage Users</h1>
      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left">Username</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Role</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-b">
                <td className="p-2">{u.username}</td>
                <td className="p-2">{u.email}</td>
                <td className="p-2 capitalize">{u.role}</td>
                <td className="p-2">
                  {u.isBlocked ? (
                    <span className="text-red-500">Blocked</span>
                  ) : (
                    <span className="text-green-600">Active</span>
                  )}
                </td>
                <td className="p-2">
                  {u.isBlocked ? (
                    <button
                      onClick={() => toggleBlock(u._id, false)}
                      className="px-2 py-1 text-xs rounded bg-green-500 text-white"
                    >
                      Unblock
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleBlock(u._id, true)}
                      className="px-2 py-1 text-xs rounded bg-red-500 text-white"
                    >
                      Block
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" className="p-2 text-center text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}