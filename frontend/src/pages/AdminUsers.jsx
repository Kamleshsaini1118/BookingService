import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      setLoading(true);
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

  const filteredUsers = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return users;
    return users.filter(
      (u) =>
        u.username?.toLowerCase().includes(term) ||
        u.email?.toLowerCase().includes(term)
    );
  }, [users, search]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));

  const currentPageUsers = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredUsers.slice(start, start + pageSize);
  }, [filteredUsers, page]);

  const goToPage = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-700 hover:text-black mb-3"
        >
          <IoArrowBack size={26} />
          <span className="text-sm font-medium">Back</span>
        </button>

        {/* Header + search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Manage Users</h1>
            <p className="text-gray-600 mt-1">
              View all users and block or unblock them when needed.
            </p>
          </div>
          <div className="w-full md:w-64">
            <input
              type="text"
              placeholder="Search by username or email"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-2 text-left text-xs font-semibold text-gray-600">Username</th>
                  <th className="p-2 text-left text-xs font-semibold text-gray-600">Email</th>
                  <th className="p-2 text-left text-xs font-semibold text-gray-600">Role</th>
                  <th className="p-2 text-left text-xs font-semibold text-gray-600">Status</th>
                  <th className="p-2 text-left text-xs font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>

              <tbody>
                {currentPageUsers.map((u) => (
                  <tr key={u._id} className="border-b last:border-b-0">
                    <td className="p-2 text-gray-900 font-medium">{u.username}</td>
                    <td className="p-2 text-gray-700">{u.email}</td>
                    <td className="p-2 capitalize text-gray-800">{u.role}</td>
                    <td className="p-2">
                      {u.isBlocked ? (
                        <span className="inline-flex px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                          Blocked
                        </span>
                      ) : (
                        <span className="inline-flex px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                          Active
                        </span>
                      )}
                    </td>
                    <td className="p-2">
                      {u.isBlocked ? (
                        <button
                          onClick={() => toggleBlock(u._id, false)}
                          className="px-3 py-1 text-xs rounded-lg bg-green-600 text-white hover:bg-green-700"
                        >
                          Unblock
                        </button>
                      ) : (
                        <button
                          onClick={() => toggleBlock(u._id, true)}
                          className="px-3 py-1 text-xs rounded-lg bg-red-600 text-white hover:bg-red-700"
                        >
                          Block
                        </button>
                      )}
                    </td>
                  </tr>
                ))}

                {currentPageUsers.length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-4 text-center text-gray-500 text-sm">
                      No users match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between text-xs text-gray-600">
            <span>
              Showing{" "}
              {filteredUsers.length === 0 ? 0 : (page - 1) * pageSize + 1} –{" "}
              {Math.min(page * pageSize, filteredUsers.length)} of{" "}
              {filteredUsers.length} users
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
                className={`px-3 py-1 rounded-lg border text-xs ${
                  page === 1
                    ? "border-gray-200 text-gray-300 cursor-not-allowed"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                Previous
              </button>

              <span>Page {page} of {totalPages}</span>

              <button
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages}
                className={`px-3 py-1 rounded-lg border text-xs ${
                  page === totalPages
                    ? "border-gray-200 text-gray-300 cursor-not-allowed"
                    : "border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
