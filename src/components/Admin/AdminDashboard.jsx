import React, { useState, useEffect } from "react";
import { FaSignOutAlt, FaUserCog } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AdminDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [pendingPlaces, setPendingPlaces] = useState([]);
  const [approvedPlaces, setApprovedPlaces] = useState([]);

  useEffect(() => {
    // Fetch pending places
    fetch("http://tourism.test/api/pending")
      .then((response) => response.json())
      .then((data) => setPendingPlaces(data))
      .catch((error) => console.error("Error fetching pending places:", error));

    // Fetch approved places
    fetch("http://tourism.test/api/approvedplaces")
      .then((response) => response.json())
      .then((data) => setApprovedPlaces(data))
      .catch((error) => console.error("Error fetching approved places:", error));
  }, []);

  const handleReviewClick = (place) => {
    setSelectedPlace(place);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlace(null);
  };

  const updatePlaceStatus = async (id, status) => {
    try {
      const response = await fetch(`http://tourism.test/api/places/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      window.location.reload();

      if (!response.ok) {
        throw new Error("Failed to update status.");
      }

    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const PlaceDetailsModal = ({ place, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center z-50">
        <div className="bg-white p-8 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto mt-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">{place.place_name}</h2>
            <button
              onClick={onClose}
              className="btn btn-sm btn-circle btn-ghost"
            >
              ✕
            </button>
          </div>
          <div className="space-y-6">
            <section>
              <h3 className="font-medium text-lg mb-2">Description</h3>
              <p>{place.description}</p>
            </section>

            <section>
              <h3 className="font-medium text-lg mb-2">Picture</h3>
              <img
                src={`http://tourism.test/storage/${place.image_link}`}
                alt={place.name}
                className="w-full h-auto rounded-lg"
              />
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section>
                <h3 className="font-medium text-lg mb-2">Google Map</h3>
                <iframe
                  src={place.map_iframe}
                  title="Location Map"
                  className="w-full h-64"
                ></iframe>
              </section>

              <section>
                <h3 className="font-medium text-lg mb-2">
                 Visual Tour
                </h3>
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
              </section>
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button className="btn btn-outline" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  const PasswordChangeModal = () => {
    if (!isPasswordModalOpen) return null;
    const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
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

      const response = await fetch("http://tourism.test/api/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          new_password: newPassword,
          new_password_confirmation: confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to change password.");
      }

      setSuccess("Password changed successfully.");
      setIsPasswordModalOpen(false);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };




    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
        <hr />
        <form onSubmit={handlePasswordChange}>
          <div className="space-y-4 mt-5">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Current Password
              </label>
              <input
                type="password"
                className="input input-bordered w-full"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                New Password
              </label>
              <input
                type="password"
                className="input input-bordered w-full"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <input
                type="password"
                className="input input-bordered w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-6">
            {error && <p className="text-red-500 text-sm">{error}</p>}
            {success && <p className="text-green-500 text-sm">{success}</p>}
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsPasswordModalOpen(false)}
              className="btn btn-outline"
              disabled={loading}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Changing..." : "Change Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
    );
  };

  return (
    <div
      className="min-h-screen font-mono relative bg-cover bg-center"
      style={{ backgroundImage: "url(bg.jpg)" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative z-10 container mx-auto px-8 py-6">
        <div className="bg-white bg-opacity-80 backdrop-blur-sm p-10 rounded-lg shadow-xl">
          <div className="p-6 bg-white rounded">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-semibold text-gray-800 tracking-wider">
                Admin Dashboard
              </h1>
              <div className="flex gap-3">
                <button
                  className="btn btn-circle btn-ghost"
                  aria-label="Change Password"
                  onClick={() => setIsPasswordModalOpen(true)}
                >
                  <FaUserCog size={22} />
                </button>
               <NavLink to="/">
               <button
                  className="btn btn-circle btn-ghost"
                  aria-label="Sign Out"
                >
                  <FaSignOutAlt size={22} />
                </button>
               </NavLink>
              </div>
            </div>
            <div role="tablist" className="tabs tabs-lifted">
              <input
                type="radio"
                name="my_tabs"
                role="tab"
                className="tab"
                aria-label="Pending"
                id="tab1"
                defaultChecked
              />
              <div
                role="tabpanel"
                className="tab-content bg-base-100 border-base-300 rounded-box p-6"
              >
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Full Name</th>
                        <th>Place</th>
                        <th>Email Address</th>
                        <th>Contact Number</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pendingPlaces.map((place, index) => (
                        <tr key={place.id}>
                         <td>{index + 1}</td>
                          <td>{place.name}</td>
                          <td>{place.place_name}</td>
                          <td>{place.email_address}</td>
                          <td>{place.contact_no}</td>
                          <td className="flex gap-3">
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => handleReviewClick(place)}
                            >
                              Review
                            </button>
                            <button
                              className="btn btn-outline btn-success btn-sm"
                              onClick={() => updatePlaceStatus(place.id, "Approved")}
                            >
                              Approve
                            </button>
                            <button
                              className="btn btn-outline btn-error btn-sm"
                              onClick={() => updatePlaceStatus(place.id, "Rejected")}
                            >
                              Reject
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <input
                type="radio"
                name="my_tabs"
                role="tab"
                className="tab"
                aria-label="Approved"
                id="tab2"
              />
              <div
                role="tabpanel"
                className="tab-content bg-base-100 border-base-300 rounded-box p-6"
              >
                <div className="overflow-x-auto">
                  <table className="table w-full">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Full Name</th>
                        <th>Place</th>
                        <th>Email Address</th>
                        <th>Contact Number</th>
                      </tr>
                    </thead>
                    <tbody>
                      {approvedPlaces.map((place, index) => (
                        <tr key={place.id}>
                          <td>{index + 1}</td>
                          <td>{place.name}</td>
                          <td>{place.place_name}</td>
                          <td>{place.email_address}</td>
                          <td>{place.contact_no}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <PasswordChangeModal />
          </div>
        </div>
      </div>
      <PlaceDetailsModal
              place={selectedPlace}
              isOpen={isModalOpen}
              onClose={handleCloseModal}
            />
    </div>
    
  );
};

export default AdminDashboard;
