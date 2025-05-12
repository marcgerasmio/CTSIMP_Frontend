"use client";

import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";

const AdminDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [pendingPlaces, setPendingPlaces] = useState([]);
  const [approvedPlaces, setApprovedPlaces] = useState([]);
  const [activeTab, setActiveTab] = useState("pending");
  const [pendingUsers, setPendingUsers] = useState([]);
  const [approvedUsers, setApprovedUsers] = useState([]);
  const [userActionDropdown, setUserActionDropdown] = useState({});
  const [userRemarks, setUserRemarks] = useState({});
  const [userStatus, setUserStatus] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);

  const [isRejectionModalOpen, setIsRejectionModalOpen] = useState(false);
  const [rejectionRemarks, setRejectionRemarks] = useState("");
  const [placeToReject, setPlaceToReject] = useState(null);
  const rejectionRemarksRef = useRef(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [isUserActionModalOpen, setIsUserActionModalOpen] = useState(false);

  useEffect(() => {
    // Fetch pending places
    fetch("http://CTSIMP_Backend.test/api/pending")
      .then((response) => response.json())
      .then((data) => setPendingPlaces(data))
      .catch((error) => console.error("Error fetching pending places:", error));

    // Fetch approved places
    fetch("http://CTSIMP_Backend.test/api/approvedplaces")
      .then((response) => response.json())
      .then((data) => setApprovedPlaces(data))
      .catch((error) =>
        console.error("Error fetching approved places:", error)
      );

    // Fetch pending users
    fetch("http://CTSIMP_Backend.test/api/users/pending")
      .then((response) => response.json())
      .then((data) => setPendingUsers(data.users))
      .catch((error) => console.error("Error fetching pending users:", error));

    // // Fetch approved users
    // fetch("http://tourism.test/api/approvedusers")
    //   .then((response) => response.json())
    //   .then((data) => setApprovedUsers(data))
    //   .catch((error) => console.error("Error fetching approved users:", error));
  }, []);

  const handleRejectClick = (place) => {
    setPlaceToReject(place);
    setRejectionRemarks("");
    setIsRejectionModalOpen(true);
  };

  const handleReviewClick = (place) => {
    setSelectedPlace(place);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlace(null);
  };

  const updatePlaceStatus = async (id, status, remarks = "") => {
    try {
      console.log("Updating status with remarks:", remarks);

      // Make sure remarks is a string and properly formatted
      const formattedRemarks = remarks ? remarks.trim() : "";
      console.log("Formatted remarks:", formattedRemarks);

      const requestBody = {
        status,
        remarks: formattedRemarks,
        rejection_remarks: formattedRemarks, // Try alternative field name
        remark: formattedRemarks, // Another possible field name
        comment: formattedRemarks, // Yet another possibility
      };

      console.log("Request body:", JSON.stringify(requestBody));

      const response = await fetch(
        `http://CTSIMP_Backend.test/api/places/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Error response from server:", errorData);
        throw new Error(
          `Failed to update status: ${errorData.message || response.statusText}`
        );
      }

      // Log the successful response too
      const responseData = await response.json().catch(() => ({}));
      console.log("Success response:", responseData);

      // Refresh data instead of reloading the page
      if (status === "Approved") {
        setPendingPlaces(pendingPlaces.filter((place) => place.id !== id));
        fetch("http://CTSIMP_Backend.test/api/approvedplaces")
          .then((response) => response.json())
          .then((data) => setApprovedPlaces(data));
      } else {
        setPendingPlaces(pendingPlaces.filter((place) => place.id !== id));
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status: " + error.message);
    }
  };

  const handleSignOut = () => {
    localStorage.clear();
  };

  const updateUserStatus = async (id) => {
    const status = userStatus[id];
    const remarks = userRemarks[id] || "";
    try {
      const response = await fetch(
        `http://CTSIMP_Backend.test/api/users/status-remarks/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status, remarks }),
        }
      );
      if (!response.ok) throw new Error("Failed to update user status.");
      setPendingUsers(pendingUsers.filter((user) => user.id !== id));
      setUserActionDropdown((prev) => ({ ...prev, [id]: false }));
      setUserRemarks((prev) => ({ ...prev, [id]: "" }));
      setUserStatus((prev) => ({ ...prev, [id]: "" }));
    } catch (error) {
      alert("Error updating user status: " + error.message);
    }
  };

  const RejectionModal = () => {
    if (!isRejectionModalOpen || !placeToReject) return null;

    const handleSubmitRejection = () => {
      const remarks = rejectionRemarksRef.current
        ? rejectionRemarksRef.current.value.trim()
        : "";

      if (!remarks) {
        alert("Please provide rejection remarks before submitting.");
        return;
      }

      console.log("Submitting rejection with remarks:", remarks);

      // Make sure we're passing the remarks as expected by the API
      updatePlaceStatus(placeToReject.id, "Rejected", remarks);
      setIsRejectionModalOpen(false);
      setPlaceToReject(null);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl border border-emerald-200">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-emerald-100">
            <h2 className="text-xl font-semibold text-error">
              Rejection Reason
            </h2>
            <button
              onClick={() => setIsRejectionModalOpen(false)}
              className="rounded-full h-8 w-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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

          <div className="mb-5 text-justify">
            <p className="text-gray-600 mb-5">
              You are about to reject{" "}
              <span className="font-semibold text-emerald-700">
                {placeToReject.place_name}
              </span>
              . Please provide a reason for rejection:
            </p>

            <div>
              {/* <textarea
                className="w-full border border-emerald-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                rows={3}
                value={rejectionRemarks}
                onChange={(e) => setRejectionRemarks(e.target.value)}
                placeholder="Please explain why this place is being rejected..."
                required
              /> */}
              <textarea
                ref={rejectionRemarksRef}
                className="w-full border border-emerald-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                rows={3}
                defaultValue={rejectionRemarks}
                placeholder="Please explain why this place is being rejected..."
                required
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={() => setIsRejectionModalOpen(false)}
              className="px-4 py-2 bg-white border border-emerald-300 text-emerald-700 rounded-md hover:bg-emerald-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmitRejection}
              className="px-4 py-2 bg-error text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    );
  };

  const PlaceDetailsModal = ({ place, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50 overflow-y-auto py-10">
        <div className="bg-white p-8 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto m-4 border border-emerald-200 shadow-xl">
          <div className="flex justify-between items-center mb-6 border-b border-emerald-100 pb-4">
            <div className="flex items-center">
              {/* Location Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-emerald-600 mr-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <h2 className="text-2xl font-semibold text-emerald-800">
                {place.place_name}
              </h2>
            </div>
            <button
              onClick={onClose}
              className="rounded-full h-8 w-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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

          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-emerald-50 p-4 rounded-md">
              <div>
                <h3 className="font-medium text-emerald-700 mb-2">
                  Submitted By
                </h3>
                <p className="text-gray-700">{place.name}</p>
              </div>
              <div>
                <h3 className="font-medium text-emerald-700 mb-2">Address</h3>
                <p className="text-gray-700">
                  {place.address || "Not provided"}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-emerald-700 mb-2">
                  Contact Information
                </h3>
                <p className="text-gray-700">
                  Email: {place.email_address || "Not provided"}
                  <br />
                  Phone: {place.contact_no || "Not provided"}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-emerald-700 mb-2">Status</h3>
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
              </div>
            </div>

            {/* Description */}
            <section>
              <h3 className="font-medium text-lg mb-2 text-emerald-700 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                Description
              </h3>
              <p className="text-gray-700 bg-emerald-50 p-4 rounded-md">
                {place.description || "No description provided"}
              </p>
            </section>

            {/* History (if available) */}
            {place.history && (
              <section>
                <h3 className="font-medium text-lg mb-2 text-emerald-700 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                  History
                </h3>
                <p className="text-gray-700 bg-emerald-50 p-4 rounded-md">
                  {place.history}
                </p>
              </section>
            )}

            {/* Entrance Fee & Pricing */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {place.entrance && (
                <section>
                  <h3 className="font-medium text-lg mb-2 text-emerald-700 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="1"
                        y="4"
                        width="22"
                        height="16"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="1" y1="10" x2="23" y2="10"></line>
                    </svg>
                    Entrance
                  </h3>
                  <div className="bg-emerald-50 p-4 rounded-md">
                    <p className="text-gray-700">{place.entrance}</p>
                  </div>
                </section>
              )}

              {place.pricing && (
                <section>
                  <h3 className="font-medium text-lg mb-2 text-emerald-700 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="1" x2="12" y2="23"></line>
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                    </svg>
                    Pricing
                  </h3>
                  <div className="bg-emerald-50 p-4 rounded-md">
                    <p className="text-gray-700">{place.pricing}</p>
                  </div>
                </section>
              )}
            </div>

            {/* Activities */}
            {place.activities && (
              <section>
                <h3 className="font-medium text-lg mb-2 text-emerald-700 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  Activities
                </h3>
                <div className="bg-emerald-50 p-4 rounded-md">
                  {place.activities.split(",").map((activity, index) => (
                    <div key={index} className="mb-1 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-emerald-600 mr-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="9 11 12 14 22 4"></polyline>
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
                      </svg>
                      <span className="text-gray-700">{activity.trim()}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Picture */}
            <section>
              <h3 className="font-medium text-lg mb-2 text-emerald-700 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <circle cx="8.5" cy="8.5" r="1.5"></circle>
                  <polyline points="21 15 16 10 5 21"></polyline>
                </svg>
                Picture
              </h3>
              <div className="border border-emerald-200 rounded-lg overflow-hidden shadow-md">
                {place.image_link ? (
                  <img
                    src={`http://tourism.test/storage/${place.image_link}`}
                    alt={place.name}
                    className="w-full h-auto"
                  />
                ) : (
                  <div className="bg-gray-100 p-8 text-center text-gray-500">
                    No image available
                  </div>
                )}
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Google Map */}
              <section>
                <h3 className="font-medium text-lg mb-2 text-emerald-700 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                    <line x1="8" y1="2" x2="8" y2="18"></line>
                    <line x1="16" y1="6" x2="16" y2="22"></line>
                  </svg>
                  Google Map
                </h3>
                <div className="border border-emerald-200 rounded-lg overflow-hidden shadow-md">
                  {place.map_iframe ? (
                    <iframe
                      src={place.map_iframe}
                      title="Location Map"
                      className="w-full h-64"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="bg-gray-100 h-64 flex items-center justify-center text-gray-500">
                      No map available
                    </div>
                  )}
                </div>
              </section>

              {/* Virtual Tour */}
              <section>
                <h3 className="font-medium text-lg mb-2 text-emerald-700 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polygon points="10 8 16 12 10 16 10 8"></polygon>
                  </svg>
                  Virtual Tour
                </h3>
                <div className="border border-emerald-200 rounded-lg overflow-hidden shadow-md">
                  {place.virtual_iframe ? (
                    <iframe
                      src={place.virtual_iframe}
                      title="Virtual Tour"
                      className="w-full h-64"
                      allow="xr-spatial-tracking; vr; gyroscope; accelerometer; fullscreen; autoplay; xr"
                      scrolling="no"
                      allowFullScreen={true}
                      frameBorder="0"
                      allowVR="yes"
                    />
                  ) : (
                    <div className="bg-gray-100 h-64 flex items-center justify-center text-gray-500">
                      No virtual tour available
                    </div>
                  )}
                </div>
              </section>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-emerald-100">
            <button
              className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
              onClick={() => {
                updatePlaceStatus(place.id, "Approved");
                onClose();
              }}
            >
              Approve
            </button>
            <button
              className="px-4 py-2 bg-error text-white rounded-md hover:bg-red-700 transition-colors"
              onClick={() => {
                handleRejectClick(place);
                onClose();
              }}
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    );
  };

  const PasswordChangeModal = () => {
    if (!isPasswordModalOpen) return null;

    // const [currentPassword, setCurrentPassword] = useState("");
    // const [newPassword, setNewPassword] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState("");
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);
    // const [success, setSuccess] = useState(null);
    const name = sessionStorage.getItem("name");

    const handlePasswordChange = async (e) => {
      e.preventDefault();
      setError(null);
      setSuccess(null);

      if (newPassword !== confirmPassword) {
        setError("New password and confirmation do not match.");
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          "http://CTSIMP_Backend.test/api/change-password",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              new_password: newPassword,
              new_password_confirmation: confirmPassword,
            }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to change password.");
        }

        setSuccess("Password changed successfully.");
        setTimeout(() => {
          setIsPasswordModalOpen(false);
        }, 1500);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl border border-emerald-200">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-emerald-100">
            <h2 className="text-xl font-semibold text-emerald-800">
              Change Password
            </h2>
            <button
              onClick={() => setIsPasswordModalOpen(false)}
              className="rounded-full h-8 w-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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

          <form onSubmit={handlePasswordChange}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-emerald-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <input
                    type="password"
                    className="pl-10 w-full px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-emerald-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <input
                    type="password"
                    className="pl-10 w-full px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-emerald-700 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-emerald-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="3"
                        y="11"
                        width="18"
                        height="11"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                  </div>
                  <input
                    type="password"
                    className="pl-10 w-full px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-700 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="12"></line>
                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              {success && (
                <div className="p-3 bg-green-50 border border-green-200 rounded-md flex items-center gap-2 text-green-700 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                  <span>{success}</span>
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsPasswordModalOpen(false)}
                className="px-4 py-2 bg-white border border-emerald-300 text-emerald-700 rounded-md hover:bg-emerald-50 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors flex items-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Changing...
                  </>
                ) : (
                  "Change Password"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const UserActionModal = ({ user, isOpen, onClose }) => {
    if (!isOpen) return null;

    const [localRemarks, setLocalRemarks] = useState(
      userRemarks[user.id] || ""
    );
    const [localStatus, setLocalStatus] = useState(userStatus[user.id] || "");

    const handleSubmit = () => {
      setUserRemarks((prev) => ({ ...prev, [user.id]: localRemarks }));
      setUserStatus((prev) => ({ ...prev, [user.id]: localStatus }));
      updateUserStatus(user.id);
      onClose();
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-xl border border-emerald-200">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-emerald-100">
            <h2 className="text-xl font-semibold text-emerald-800">
              User Action
            </h2>
            <button
              onClick={onClose}
              className="rounded-full h-8 w-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
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

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-1">
                Status
              </label>
              <select
                className="w-full border border-emerald-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                value={localStatus}
                onChange={(e) => setLocalStatus(e.target.value)}
              >
                <option value="">Select</option>
                <option value="Accepted">Accepted</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-700 mb-1">
                Remarks
              </label>
              <textarea
                className="w-full border border-emerald-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                rows={3}
                value={localRemarks}
                onChange={(e) => setLocalRemarks(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              className="px-4 py-2 bg-white border border-emerald-300 text-emerald-700 rounded-md hover:bg-emerald-50 transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors"
              disabled={!localStatus}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="min-h-screen relative bg-cover bg-center"
      style={{ backgroundImage: "url(bg.jpg)" }}
    >
      <div className="absolute inset-0 bg-emerald-900 bg-opacity-80"></div>
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6 flex justify-between items-center">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white mr-3"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Caraga Tourism
                </h1>
                <p className="text-emerald-100 text-sm">Admin Dashboard</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                className="p-2 rounded-full bg-emerald-700 text-white hover:bg-emerald-800 transition-colors"
                aria-label="Change Password"
                onClick={() => setIsPasswordModalOpen(true)}
                title="Change Password"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </button>
              <NavLink to="/">
                <button
                  className="p-2 rounded-full bg-emerald-700 text-white hover:bg-emerald-800 transition-colors"
                  aria-label="Sign Out"
                  onClick={handleSignOut}
                  title="Sign Out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                </button>
              </NavLink>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="bg-emerald-50 px-6 pt-4">
            <div className="flex border-b border-emerald-200">
              <button
                className={`px-6 py-3 font-medium text-sm transition-colors relative ${
                  activeTab === "pending"
                    ? "text-emerald-700 border-b-2 border-emerald-600"
                    : "text-emerald-600 hover:text-emerald-800"
                }`}
                onClick={() => setActiveTab("pending")}
              >
                Pending Places
                {pendingPlaces.length > 0 && (
                  <span className="absolute top-2 right-0 bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {pendingPlaces.length}
                  </span>
                )}
              </button>
              <button
                className={`px-6 py-3 font-medium text-sm transition-colors ${
                  activeTab === "approved"
                    ? "text-emerald-700 border-b-2 border-emerald-600"
                    : "text-emerald-600 hover:text-emerald-800"
                }`}
                onClick={() => setActiveTab("approved")}
              >
                Approved Places
              </button>
              <button
                className={`relative px-6 py-3 font-medium text-sm transition-colors ${
                  activeTab === "users"
                    ? "text-emerald-700 border-b-2 border-emerald-600"
                    : "text-emerald-600 hover:text-emerald-800"
                }`}
                onClick={() => setActiveTab("users")}
              >
                {pendingUsers.length > 0 && (
                  <span className="absolute top-1 right-2 bg-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {pendingUsers.length}
                  </span>
                )}
                Users
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "pending" && (
              <div className="overflow-x-auto">
                {pendingPlaces.length === 0 ? (
                  <div className="text-center py-12">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-emerald-300 mx-auto mb-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <h3 className="text-lg font-medium text-gray-700">
                      No Pending Places
                    </h3>
                    <p className="text-gray-500 mt-1">
                      All submissions have been reviewed
                    </p>
                  </div>
                ) : (
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-emerald-50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider border-b border-emerald-200">
                          #
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider border-b border-emerald-200">
                          Full Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider border-b border-emerald-200">
                          Place
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider border-b border-emerald-200">
                          Email Address
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider border-b border-emerald-200">
                          Contact Number
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider border-b border-emerald-200">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-emerald-100">
                      {pendingPlaces.map((place, index) => (
                        <tr
                          key={place.id}
                          className="hover:bg-emerald-50 transition-colors"
                        >
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                            {index + 1}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                            {place.name}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-emerald-700">
                            {place.place_name}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                            {place.email_address}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                            {place.contact_no}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                            <div className="flex gap-2">
                              <button
                                className="px-3 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors text-xs font-medium"
                                onClick={() => handleReviewClick(place)}
                              >
                                Review
                              </button>
                              <button
                                className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded hover:bg-emerald-200 transition-colors text-xs font-medium"
                                onClick={() =>
                                  updatePlaceStatus(place.id, "Approved")
                                }
                              >
                                Approve
                              </button>
                              <button
                                className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-xs font-medium"
                                onClick={() => handleRejectClick(place)}
                              >
                                Reject
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {activeTab === "approved" && (
              <div className="overflow-x-auto">
                {approvedPlaces.length === 0 ? (
                  <div className="text-center py-12">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-emerald-300 mx-auto mb-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <h3 className="text-lg font-medium text-gray-700">
                      No Approved Places Yet
                    </h3>
                    <p className="text-gray-500 mt-1">
                      Approved places will appear here
                    </p>
                  </div>
                ) : (
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-emerald-50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider border-b border-emerald-200">
                          #
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider border-b border-emerald-200">
                          Full Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider border-b border-emerald-200">
                          Place
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider border-b border-emerald-200">
                          Email Address
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider border-b border-emerald-200">
                          Contact Number
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider border-b border-emerald-200">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-emerald-100">
                      {approvedPlaces.map((place, index) => (
                        <tr
                          key={place.id}
                          className="hover:bg-emerald-50 transition-colors"
                        >
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                            {index + 1}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                            {place.name}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-emerald-700">
                            {place.place_name}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                            {place.email_address}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                            {place.contact_no}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                            <button
                              className="px-3 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors text-xs font-medium"
                              onClick={() => handleReviewClick(place)}
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {activeTab === "users" && (
              <div className="overflow-x-auto">
                {pendingUsers.length === 0 && approvedUsers.length === 0 ? (
                  <div className="text-center py-12">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12 text-emerald-300 mx-auto mb-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <h3 className="text-lg font-medium text-gray-700">
                      No Pending Users
                    </h3>
                    <p className="text-gray-500 mt-1">
                      All user registrations have been reviewed
                    </p>
                  </div>
                ) : (
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-emerald-50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider border-b border-emerald-200">
                          #
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider border-b border-emerald-200">
                          Full Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-emerald-700 uppercase tracking-wider border-b border-emerald-200">
                          Email
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
                      {pendingUsers.map((user, index) => (
                        <tr
                          key={user.id}
                          className="hover:bg-emerald-50 transition-colors"
                        >
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                            {index + 1}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                            {user.name}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                            {user.email}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-yellow-600 font-semibold">
                            Pending
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                            <button
                              className="px-3 py-1 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors text-xs font-medium"
                              onClick={() => {
                                setSelectedUser(user);
                                setIsUserActionModalOpen(true);
                              }}
                            >
                              Action
                            </button>
                          </td>
                        </tr>
                      ))}
                      {approvedUsers.map((user, index) => (
                        <tr
                          key={user.id}
                          className="hover:bg-emerald-50 transition-colors"
                        >
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                            {pendingUsers.length + index + 1}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                            {user.name}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                            {user.email}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600 font-semibold">
                            Approved
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                            {user.remarks && (
                              <span className="text-xs text-gray-500">
                                Remarks: {user.remarks}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="bg-emerald-50 px-6 py-4 border-t border-emerald-100 text-center">
            <p className="text-xs text-emerald-700">
              Department of Tourism - Caraga Region
            </p>
            <p className="text-xs text-emerald-600 mt-1">
              Discover the beauty and culture of Caraga
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      <PasswordChangeModal />
      <PlaceDetailsModal
        place={selectedPlace}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      <UserActionModal
        user={selectedUser}
        isOpen={isUserActionModalOpen}
        onClose={() => {
          setIsUserActionModalOpen(false);
          setSelectedUser(null);
        }}
      />
      <RejectionModal />
    </div>
  );
};

export default AdminDashboard;
