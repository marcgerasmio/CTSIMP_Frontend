"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ onClose }) => {
  const [places, setPlaces] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const name = sessionStorage.getItem("name");
  const [isRemarksModalOpen, setIsRemarksModalOpen] = useState(false);
  const [selectedRemarks, setSelectedRemarks] = useState("");

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch("http://CTSIMP_Backend.test/api/places");
        if (response.ok) {
          const data = await response.json();
          const filteredData = data.filter((item) => item.name === name);
          console.log(filteredData);
          setPlaces(filteredData);
        } else {
          console.error("Failed to fetch places");
        }
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, []);

  const handleEditClick = (place) => {
    setSelectedPlace(place);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedPlace(null);
  };

  const handleRemarksClick = (place) => {
    setSelectedRemarks(place.remarks || "No remarks provided");
    setIsRemarksModalOpen(true);
  };

  const handleRemarksModalClose = () => {
    setIsRemarksModalOpen(false);
    setSelectedRemarks("");
  };

  const handleEditSubmit = async (updatedPlace) => {
    const url = `http://CTSIMP_Backend.test/api/places/${updatedPlace.id}`;
    const name = sessionStorage.getItem("name");

    if (!name) {
      console.error("Name is required but is missing.");
      return;
    }

    const payload = {
      name,
      place_name: updatedPlace.place_name || "",
      address: updatedPlace.address || "",
      email_address: updatedPlace.email_address || "",
      contact_no: updatedPlace.contact_no || "",
      description: updatedPlace.description || "",
      virtual_iframe: updatedPlace.virtual_iframe || "",
      map_iframe: updatedPlace.map_iframe || "",
      status: "Pending",
      entrance: updatedPlace.entrance || "",
      history: updatedPlace.history || "",
      pricing: updatedPlace.pricing || "",
      activities: updatedPlace.activities || "",
      image_link: updatedPlace.image_link || "",
    };

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed with status ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      window.location.reload();
    } catch (error) {
      console.error("Update failed:", error.message);
    }
  };

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 md:p-10"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
      >
        <motion.div
          className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 flex justify-between items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <h2 className="text-xl font-semibold text-white">
              Submitted Destinations
            </h2>
            <motion.button
              onClick={onClose}
              className="text-white hover:text-emerald-100 transition-colors duration-300"
              whileHover={{ rotate: 90 }}
              transition={{ duration: 0.2 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </motion.button>
          </motion.div>

          <div className="p-6 overflow-auto max-h-[calc(90vh-80px)]">
            {places.length > 0 ? (
              <motion.div
                className="overflow-x-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-emerald-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider border-b border-emerald-200">
                        Full Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider border-b border-emerald-200">
                        Tourist Spot
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider border-b border-emerald-200">
                        Address
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider border-b border-emerald-200">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider border-b border-emerald-200">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-emerald-100">
                    {places.map((place, index) => (
                      <tr
                        key={index}
                        className="hover:bg-emerald-50 transition-colors duration-300"
                      >
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                          {place.name}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-emerald-700">
                          {place.place_name}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                          {place.address}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              place.status === "Pending"
                                ? "bg-amber-100 text-amber-800"
                                : place.status === "Approved"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {place.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <div className="flex space-x-4">
                            <button
                              onClick={() => handleEditClick(place)}
                              className="text-emerald-600 hover:text-emerald-800 transition-colors duration-300"
                            >
                              Edit
                            </button>
                            {place.status === "Rejected" && (
                              <button
                                onClick={() => handleRemarksClick(place)}
                                className="text-red-600 hover:text-red-800 transition-colors duration-300"
                              >
                                View
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
            ) : (
              <div className="text-center py-12">No Records Found</div>
            )}
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isEditModalOpen && (
          <EditModal
            place={selectedPlace}
            onClose={handleEditModalClose}
            onSubmit={handleEditSubmit}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isRemarksModalOpen && (
          <RemarksModal
            remarks={selectedRemarks}
            onClose={handleRemarksModalClose}
          />
        )}
      </AnimatePresence>
    </>
  );
};

const EditModal = ({ place, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: place.id || "",
    name: place.name || "",
    place_name: place.place_name || "",
    address: place.address || "",
    email_address: place.email_address || "",
    contact_no: place.contact_no || "",
    description: place.description || "",
    virtual_iframe: place.virtual_iframe || "",
    map_iframe: place.map_iframe || "",
    image_link: place.image_link || null,
    status: place.status || "Pending",
    entrance: place.entrance || "",
    history: place.history || "",
    pricing: place.pricing || "",
    activities: place.activities ? place.activities.split(",") : [], // Convert to array
  });

  const [activityInput, setActivityInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleActivityAdd = () => {
    if (activityInput.trim()) {
      setFormData((prevData) => ({
        ...prevData,
        activities: [...prevData.activities, activityInput.trim()],
      }));
      setActivityInput("");
    }
  };

  const handleActivityRemove = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      activities: prevData.activities.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      activities: formData.activities.join(","),
    };
    onSubmit(updatedFormData);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg shadow-xl w-full max-w-3xl p-6"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <h2 className="text-xl font-semibold mb-4">Edit Destination</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="place_name"
                className="block text-sm font-medium text-gray-700"
              >
                Place Name
              </label>
              <input
                id="place_name"
                name="place_name"
                type="text"
                value={formData.place_name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                id="address"
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="email_address"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <input
                id="email_address"
                name="email_address"
                type="email"
                value={formData.email_address}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="contact_no"
                className="block text-sm font-medium text-gray-700"
              >
                Contact Number
              </label>
              <input
                id="contact_no"
                name="contact_no"
                type="text"
                value={formData.contact_no}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                rows="3"
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="virtual_iframe"
                className="block text-sm font-medium text-gray-700"
              >
                Virtual Iframe
              </label>
              <input
                id="virtual_iframe"
                name="virtual_iframe"
                type="text"
                value={formData.virtual_iframe}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="map_iframe"
                className="block text-sm font-medium text-gray-700"
              >
                Map Iframe
              </label>
              <input
                id="map_iframe"
                name="map_iframe"
                type="text"
                value={formData.map_iframe}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="entrance"
                className="block text-sm font-medium text-gray-700"
              >
                Entrance Fee
              </label>
              <input
                id="entrance"
                name="entrance"
                type="text"
                value={formData.entrance}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="pricing"
                className="block text-sm font-medium text-gray-700"
              >
                Pricing
              </label>
              <input
                id="pricing"
                name="pricing"
                type="text"
                value={formData.pricing}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
              />
            </div>
            <div className="md:col-span-2">
              <label
                htmlFor="history"
                className="block text-sm font-medium text-gray-700"
              >
                History
              </label>
              <textarea
                id="history"
                name="history"
                value={formData.history}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                rows="3"
              ></textarea>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700">
              Activities
            </label>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="text"
                value={activityInput}
                onChange={(e) => setActivityInput(e.target.value)}
                className="block w-full border border-gray-300 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
                placeholder="Add an activity"
              />
              <button
                type="button"
                onClick={handleActivityAdd}
                className="px-4 py-2 bg-emerald-600 text-white rounded-md"
              >
                Add
              </button>
            </div>
            <ul className="mt-2 space-y-1">
              {formData.activities.map((activity, index) => (
                <li key={index} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{activity}</span>
                  <button
                    type="button"
                    onClick={() => handleActivityRemove(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-600 text-white rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

const RemarksModal = ({ remarks, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-lg shadow-xl w-full max-w-md p-6"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-red-600">
            Rejection Remarks
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div className="bg-red-50 p-4 rounded-md border border-red-100">
          <p className="text-gray-700">{remarks}</p>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
