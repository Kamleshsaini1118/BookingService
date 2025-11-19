// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function AdminBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchBookings = async () => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const res = await axios.get(
//         "https://bookingservice-1-csg6.onrender.com/admin/bookings",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true,
//         }
//       );
//       setBookings(res.data.data.bookings || []);
//     } catch (err) {
//       console.error("Failed to fetch bookings", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const updateStatus = async (id, status) => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       await axios.patch(
//         `https://bookingservice-1-csg6.onrender.com/admin/bookings/${id}/status`,
//         { status },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true,
//         }
//       );
//       await fetchBookings();
//     } catch (err) {
//       console.error("Failed to update booking", err);
//     }
//   };

//   if (loading) {
//     return <div className="p-6">Loading bookings...</div>;
//   }

//   return (
//     <div className="p-6 space-y-4">
//       <h1 className="text-2xl font-bold">Manage Bookings</h1>
//       <div className="overflow-x-auto bg-white shadow rounded-lg">
//         <table className="min-w-full text-sm">
//           <thead>
//             <tr className="border-b">
//               <th className="p-2 text-left">User</th>
//               <th className="p-2 text-left">Service</th>
//               <th className="p-2 text-left">Date</th>
//               <th className="p-2 text-left">Status</th>
//               <th className="p-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.map((b) => (
//               <tr key={b._id} className="border-b">
//                 <td className="p-2">
//                   {b.user?.username} ({b.user?.email})
//                 </td>
//                 <td className="p-2">{b.service?.name}</td>
//                 <td className="p-2">
//                   {b.date ? new Date(b.date).toLocaleString() : "-"}
//                 </td>
//                 <td className="p-2 capitalize">{b.status}</td>
//                 <td className="p-2 space-x-2">
//                   <button
//                     onClick={() => updateStatus(b._id, "confirmed")}
//                     className="px-2 py-1 text-xs rounded bg-green-500 text-white"
//                   >
//                     Confirm
//                   </button>
//                   <button
//                     onClick={() => updateStatus(b._id, "cancelled")}
//                     className="px-2 py-1 text-xs rounded bg-red-500 text-white"
//                   >
//                     Cancel
//                   </button>
//                 </td>
//               </tr>
//             ))}
//             {bookings.length === 0 && (
//               <tr>
//                 <td colSpan="5" className="p-2 text-center text-gray-500">
//                   No bookings found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

//-------------------------------

// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function AdminBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchBookings = async () => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       const res = await axios.get(
//         "https://bookingservice-1-csg6.onrender.com/admin/bookings",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true,
//         }
//       );
//       setBookings(res.data.data.bookings || []);
//     } catch (err) {
//       console.error("Failed to fetch bookings", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const updateStatus = async (id, status) => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       await axios.patch(
//         `https://bookingservice-1-csg6.onrender.com/admin/bookings/${id}/status`,
//         { status },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true,
//         }
//       );
//       await fetchBookings();
//     } catch (err) {
//       console.error("Failed to update booking", err);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-gray-600 text-lg">Loading bookings...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-6">
//       <div className="max-w-6xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">
//               Manage Bookings
//             </h1>
//             <p className="text-gray-600 mt-1">
//               View and update the status of all user bookings.
//             </p>
//           </div>
//           {/* Placeholder for filters (UI only) */}
//           <div className="flex flex-wrap gap-2">
//             <button className="px-3 py-1.5 text-xs rounded-full border border-gray-300 text-gray-700 bg-white hover:bg-gray-100">
//               All
//             </button>
//             <button className="px-3 py-1.5 text-xs rounded-full border border-green-200 text-green-700 bg-green-50 hover:bg-green-100">
//               Confirmed
//             </button>
//             <button className="px-3 py-1.5 text-xs rounded-full border border-yellow-200 text-yellow-700 bg-yellow-50 hover:bg-yellow-100">
//               Pending
//             </button>
//             <button className="px-3 py-1.5 text-xs rounded-full border border-red-200 text-red-700 bg-red-50 hover:bg-red-100">
//               Cancelled
//             </button>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-4">
//           <div className="overflow-x-auto">
//             <table className="min-w-full text-sm">
//               <thead>
//                 <tr className="border-b bg-gray-50">
//                   <th className="p-2 text-left text-xs font-semibold text-gray-600">
//                     User
//                   </th>
//                   <th className="p-2 text-left text-xs font-semibold text-gray-600">
//                     Service
//                   </th>
//                   <th className="p-2 text-left text-xs font-semibold text-gray-600">
//                     Date
//                   </th>
//                   <th className="p-2 text-left text-xs font-semibold text-gray-600">
//                     Status
//                   </th>
//                   <th className="p-2 text-left text-xs font-semibold text-gray-600">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {bookings.map((b) => (
//                   <tr key={b._id} className="border-b last:border-b-0">
//                     <td className="p-2">
//                       <div className="flex flex-col">
//                         <span className="font-medium text-gray-900">
//                           {b.user?.username || "Unknown"}
//                         </span>
//                         <span className="text-xs text-gray-500">
//                           {b.user?.email}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="p-2 text-gray-800">
//                       {b.service?.name || "N/A"}
//                     </td>
//                     <td className="p-2 text-gray-700">
//                       {b.date
//                         ? new Date(b.date).toLocaleString()
//                         : "No date selected"}
//                     </td>
//                     <td className="p-2">
//                       <span
//                         className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
//                           b.status === "confirmed"
//                             ? "bg-green-100 text-green-700"
//                             : b.status === "cancelled"
//                             ? "bg-red-100 text-red-700"
//                             : "bg-yellow-100 text-yellow-700"
//                         }`}
//                       >
//                         {b.status}
//                       </span>
//                     </td>
//                     <td className="p-2">
//                       <div className="flex flex-wrap gap-2">
//                         <button
//                           onClick={() => updateStatus(b._id, "confirmed")}
//                           className="px-3 py-1 text-xs rounded-lg bg-green-600 text-white hover:bg-green-700"
//                         >
//                           Confirm
//                         </button>
//                         <button
//                           onClick={() => updateStatus(b._id, "cancelled")}
//                           className="px-3 py-1 text-xs rounded-lg bg-red-600 text-white hover:bg-red-700"
//                         >
//                           Cancel
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//                 {bookings.length === 0 && (
//                   <tr>
//                     <td
//                       colSpan="5"
//                       className="p-4 text-center text-gray-500 text-sm"
//                     >
//                       No bookings found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// -----------------------------------------------------------------


// import React, { useEffect, useState } from "react";
// import axios from "axios";

// export default function AdminBookings() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [statusFilter, setStatusFilter] = useState("all");

//   const fetchBookings = async (status = "all") => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem("accessToken");
//       const params = {};

//       if (status !== "all") {
//         params.status = status;
//       }

//       const res = await axios.get(
//         "https://bookingservice-1-csg6.onrender.com/admin/bookings",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true,
//           params,
//         }
//       );
//       setBookings(res.data.data.bookings || []);
//     } catch (err) {
//       console.error("Failed to fetch bookings", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBookings(statusFilter);
//   }, [statusFilter]);

//   const updateStatus = async (id, status) => {
//     try {
//       const token = localStorage.getItem("accessToken");
//       await axios.patch(
//         `https://bookingservice-1-csg6.onrender.com/admin/bookings/${id}/status`,
//         { status },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//           withCredentials: true,
//         }
//       );
//       await fetchBookings(statusFilter);
//     } catch (err) {
//       console.error("Failed to update booking", err);
//     }
//   };

//   const filterButtonClass = (value) =>
//     `px-3 py-1.5 text-xs rounded-full border ${
//       statusFilter === value
//         ? "bg-blue-600 text-white border-blue-600"
//         : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
//     }`;

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-gray-600 text-lg">Loading bookings...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-6">
//       <div className="max-w-6xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900">
//               Manage Bookings
//             </h1>
//             <p className="text-gray-600 mt-1">
//               View and update the status of all user bookings.
//             </p>
//           </div>

//           {/* Real status filter */}
//           <div className="flex flex-wrap gap-2">
//             <button
//               className={filterButtonClass("all")}
//               onClick={() => setStatusFilter("all")}
//             >
//               All
//             </button>
//             <button
//               className={filterButtonClass("confirmed")}
//               onClick={() => setStatusFilter("confirmed")}
//             >
//               Confirmed
//             </button>
//             <button
//               className={filterButtonClass("pending")}
//               onClick={() => setStatusFilter("pending")}
//             >
//               Pending
//             </button>
//             <button
//               className={filterButtonClass("cancelled")}
//               onClick={() => setStatusFilter("cancelled")}
//             >
//               Cancelled
//             </button>
//           </div>
//         </div>

//         {/* Table */}
//         <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-4">
//           <div className="overflow-x-auto">
//             <table className="min-w-full text-sm">
//               <thead>
//                 <tr className="border-b bg-gray-50">
//                   <th className="p-2 text-left text-xs font-semibold text-gray-600">
//                     User
//                   </th>
//                   <th className="p-2 text-left text-xs font-semibold text-gray-600">
//                     Service
//                   </th>
//                   <th className="p-2 text-left text-xs font-semibold text-gray-600">
//                     Date
//                   </th>
//                   <th className="p-2 text-left text-xs font-semibold text-gray-600">
//                     Status
//                   </th>
//                   <th className="p-2 text-left text-xs font-semibold text-gray-600">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {bookings.map((b) => (
//                   <tr key={b._id} className="border-b last:border-b-0">
//                     <td className="p-2">
//                       <div className="flex flex-col">
//                         <span className="font-medium text-gray-900">
//                           {b.user?.username || "Unknown"}
//                         </span>
//                         <span className="text-xs text-gray-500">
//                           {b.user?.email}
//                         </span>
//                       </div>
//                     </td>
//                     <td className="p-2 text-gray-800">
//                       {b.service?.name || "N/A"}
//                     </td>
//                     <td className="p-2 text-gray-700">
//                       {b.date
//                         ? new Date(b.date).toLocaleString()
//                         : "No date selected"}
//                     </td>
//                     <td className="p-2">
//                       <span
//                         className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
//                           b.status === "confirmed"
//                             ? "bg-green-100 text-green-700"
//                             : b.status === "cancelled"
//                             ? "bg-red-100 text-red-700"
//                             : "bg-yellow-100 text-yellow-700"
//                         }`}
//                       >
//                         {b.status}
//                       </span>
//                     </td>
//                     <td className="p-2">
//                       <div className="flex flex-wrap gap-2">
//                         <button
//                           onClick={() => updateStatus(b._id, "confirmed")}
//                           className="px-3 py-1 text-xs rounded-lg bg-green-600 text-white hover:bg-green-700"
//                         >
//                           Confirm
//                         </button>
//                         <button
//                           onClick={() => updateStatus(b._id, "cancelled")}
//                           className="px-3 py-1 text-xs rounded-lg bg-red-600 text-white hover:bg-red-700"
//                         >
//                           Cancel
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//                 {bookings.length === 0 && (
//                   <tr>
//                     <td
//                       colSpan="5"
//                       className="p-4 text-center text-gray-500 text-sm"
//                     >
//                       No bookings found for this filter.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  const fetchBookings = async (status = "all") => {
    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      const params = {};

      if (status !== "all") {
        params.status = status;
      }

      const res = await axios.get(
        "https://bookingservice-1-csg6.onrender.com/admin/bookings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
          params,
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
    fetchBookings(statusFilter);
  }, [statusFilter]);

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
      await fetchBookings(statusFilter);
    } catch (err) {
      console.error("Failed to update booking", err);
    }
  };

  const filterButtonClass = (value) =>
    `px-3 py-1.5 text-xs rounded-full border ${
      statusFilter === value
        ? "bg-blue-600 text-white border-blue-600"
        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
    }`;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading bookings...</div>
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

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Manage Bookings
            </h1>
            <p className="text-gray-600 mt-1">
              View and update the status of all user bookings.
            </p>
          </div>

          {/* Real status filter */}
          <div className="flex flex-wrap gap-2">
            <button
              className={filterButtonClass("all")}
              onClick={() => setStatusFilter("all")}
            >
              All
            </button>
            <button
              className={filterButtonClass("confirmed")}
              onClick={() => setStatusFilter("confirmed")}
            >
              Confirmed
            </button>
            <button
              className={filterButtonClass("pending")}
              onClick={() => setStatusFilter("pending")}
            >
              Pending
            </button>
            <button
              className={filterButtonClass("cancelled")}
              onClick={() => setStatusFilter("cancelled")}
            >
              Cancelled
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white shadow-sm border border-gray-100 rounded-xl p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-2 text-left text-xs font-semibold text-gray-600">
                    User
                  </th>
                  <th className="p-2 text-left text-xs font-semibold text-gray-600">
                    Service
                  </th>
                  <th className="p-2 text-left text-xs font-semibold text-gray-600">
                    Date
                  </th>
                  <th className="p-2 text-left text-xs font-semibold text-gray-600">
                    Status
                  </th>
                  <th className="p-2 text-left text-xs font-semibold text-gray-600">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
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
                    <td className="p-2 text-gray-700">
                      {b.date
                        ? new Date(b.date).toLocaleString()
                        : "No date selected"}
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
                    <td className="p-2">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => updateStatus(b._id, "confirmed")}
                          className="px-3 py-1 text-xs rounded-lg bg-green-600 text-white hover:bg-green-700"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => updateStatus(b._id, "cancelled")}
                          className="px-3 py-1 text-xs rounded-lg bg-red-600 text-white hover:bg-red-700"
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {bookings.length === 0 && (
                  <tr>
                    <td
                      colSpan="5"
                      className="p-4 text-center text-gray-500 text-sm"
                    >
                      No bookings found for this filter.
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
