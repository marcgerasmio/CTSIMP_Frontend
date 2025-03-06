import React, { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const Modal = ({ onClose }) => {
  const [places, setPlaces] = useState([]); 


  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch("http://tourism-backend.test/api/places");
        if (response.ok) {
          const data = await response.json();
          setPlaces(data);
        } else {
          console.error("Failed to fetch places");
        }
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, []); 

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-10 font-mono">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-lg font-bold">View Records</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <FaTimes size={20} />
          </button>
        </div>
        <div className="p-6">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Tourist Spot</th>
                <th>Address</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {places.length > 0 ? (
                places.map((place, index) => (
                  <tr key={index}>
                    <td>{place.name}</td>
                    <td>{place.place_name}</td>
                    <td>{place.address}</td>
                    <td>
                    <button
                    className={`btn btn-outline btn-sm ${
                      place.status === "Pending"
                        ? "btn-warning" 
                        : place.status === "Approved"
                        ? "btn-success" 
                        : "btn-error" 
                    }`}
                  >
                    {place.status === "Pending"
                      ? "Pending"
                      : place.status === "Approved"
                      ? "Approved"
                      : "Rejected"}
                  </button>

                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center text-gray-500">
                    No records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Modal;
