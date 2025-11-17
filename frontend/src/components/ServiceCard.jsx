import React from "react";
import { useNavigate, Link } from "react-router-dom";


export default function ServiceCard({ service, onBook }) {
  if (!service) return null;
  
  return (
    <div className="border p-4 rounded shadow-md">
      <h3 className="font-bold text-lg">{service.name || 'Unnamed Service'}</h3>
      <p>{service.description || 'No description available'}</p>
      <p className="font-semibold mt-2">${service.price || 'N/A'}</p>
      <button 
        className="mt-2 bg-green-600 text-white p-2 rounded w-full hover:bg-green-700 transition-colors"
        onClick={() => onBook(service)}
      >
        <Link to="/register">Book Now </Link>
      </button>
    </div>
  );
}