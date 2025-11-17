import { useState, useEffect } from "react";
import axios from "axios";
import ServiceCard from "../components/ServiceCard";
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";


export default function Services() {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  // Fetch all services
  useEffect(() => {
    // const fetchServices = async () => {
    //   try {
    //     const res = await axios.get("http://localhost:7418/services");
    //     setServices(res.data);
    //   } catch (err) {
    //     console.error(err);
    //     alert("Failed to load services");
    //   }
    // };

   const fetchServices = async () => {
  try {
    console.log("Fetching services from:", "http://localhost:7418/services");

    const res = await axios.get("http://localhost:7418/services", {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    console.log("Services response:", res.data);

    if (res.data && res.data.success) {
      setServices(res.data.data || []);
    } else {
      console.error("Unexpected response format:", res.data);
      setServices([]); // Fallback to empty array
    }
  } catch (err) {
    console.error("Error details:", {
      message: err.message,
      response: err.response?.data,
      status: err.response?.status,
      code: err.code,
      config: err.config?.url
    });
    // Fallback to sample data if API fails
    setServices([
      {
        id: "1",
        name: "Sample Service",
        price: 0,
        description: "Could not load services. Please check your connection."
      }
    ]);
  }
};

    fetchServices();
  }, []);

  // Book a service

//   const handleBook = async (service) => {
//   const token = localStorage.getItem("accessToken");
  
//   if (!token) {
//     navigate("/login");
//     return;
//   }

//   try {
//     const res = await axios.post(
//       "http://localhost:7418/booking/create",
//       { serviceId: service._id, date: new Date() },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         }
//       }
//     );

//     if (res.data.success) {
//       toast.success("Booking created successfully!");
//       // Optionally refresh bookings list
//       // fetchBookings();
//     }
//   } catch (error) {
//     console.error("Booking error:", error);
//     toast.error(error.response?.data?.message || "Failed to create booking");
//   }
// };

  const handleBook = async (service) => {
  const token = localStorage.getItem('accessToken');
  
  // Check if user is logged in
  if (!token) {
    toast.info('Please login to book a service');
    navigate('/login', { 
      state: { 
        from: '/service', // Redirect back to service page after login
        message: 'Please login to book a service' 
      } 
    });
    return;
  }

  try {
    // Show loading state
    const loadingToast = toast.loading('Processing your booking...');
    
    const res = await axios.post(
      "http://localhost:7418/booking/create",
      { 
        serviceId: service._id, 
        date: new Date() 
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );

    // Dismiss loading toast
    toast.dismiss(loadingToast);
    
    if (res.data) {
      toast.success("Booking created successfully!");
      // Navigate to My Bookings page after a short delay
      setTimeout(() => {
        navigate('/my-bookings');
      }, 1000);
    }
  } catch (error) {
    console.error("Booking error:", error);
    toast.error(
      error.response?.data?.message || 
      error.message || 
      "Failed to create booking"
    );
    
    // If token is invalid or expired
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      navigate('/login', { 
        state: { 
          from: '/service',
          message: 'Your session has expired. Please login again.' 
        } 
      });
    }
  }
};

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
      {services.map((service) => (
        <ServiceCard key={service._id} service={service} onBook={handleBook} />
      ))}
    </div>
  );
}
