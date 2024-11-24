import React, { useState } from "react";
import { FaSignOutAlt, FaUserCog } from "react-icons/fa";

const AdminDashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const places = [
    {
      id: 1,
      name: "Tinuy-an Falls",
      description:
        "A beautiful waterfall located in Surigao del Sur, Philippines.",
      visualTour:
        "<iframe src='https://www.example.com/visual-tour' width='100%' height='300'></iframe>",
      googleMap:
        "<iframe src='https://www.google.com/maps/embed?pb=!1m18...'></iframe>",
      picture: "https://via.placeholder.com/600x400?text=Tinuy-an+Falls",
    },
    {
      id: 2,
      name: "Enchanted River",
      description:
        "A mystical river located in Hinatuan, Surigao del Sur, known for its blue color.",
      visualTour:
        "<iframe src='https://www.example.com/visual-tour' width='100%' height='300'></iframe>",
      googleMap:
        "<iframe src='https://www.google.com/maps/embed?pb=!1m18...'></iframe>",
      picture: "https://via.placeholder.com/600x400?text=Enchanted+River",
    },
  ];

  const handleReviewClick = (place) => {
    setSelectedPlace(place);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPlace(null);
  };

  const PlaceDetailsModal = ({ place, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">{place.name}</h2>
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
                src={place.picture}
                alt={place.name}
                className="w-full h-auto rounded-lg"
              />
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section>
                <h3 className="font-medium text-lg mb-2">Visual Tour</h3>
                <div
                  dangerouslySetInnerHTML={{ __html: place.visualTour }}
                  className="w-full aspect-video"
                />
              </section>

              <section>
                <h3 className="font-medium text-lg mb-2">
                  Google Map Location
                </h3>
                <div
                  dangerouslySetInnerHTML={{ __html: place.googleMap }}
                  className="w-full aspect-video"
                />
              </section>
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button className="btn btn-outline" onClick={onClose}>
              Close
            </button>
            <button className="btn btn-primary text-white">Approve</button>
          </div>
        </div>
      </div>
    );
  };

  const PasswordChangeModal = () => {
    if (!isPasswordModalOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
          <hr />
          <form>
            <div className="space-y-4 mt-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Current Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  New Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Confirm New Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control mt-4">
                <label className="label cursor-pointer">
                  <span className="label-text">Show Password</span>
                  <input
                    type="checkbox"
                    checked={showPassword}
                    onChange={() => setShowPassword(!showPassword)}
                    className="toggle toggle-primary"
                  />
                </label>
              </div>
            </div>
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsPasswordModalOpen(false)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Change Password
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
                <button
                  className="btn btn-circle btn-ghost"
                  aria-label="Sign Out"
                >
                  <FaSignOutAlt size={22} />
                </button>
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
                      {places.map((place, index) => (
                        <tr key={place.id}>
                          <td>{index + 1}</td>
                          <td>John Doe</td>
                          <td>{place.name}</td>
                          <td>example@gmail.com</td>
                          <td>09518149753</td>
                          <td className="flex gap-3">
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => handleReviewClick(place)}
                            >
                              Review
                            </button>
                            <button className="btn btn-outline btn-warning btn-sm">
                              Pending
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
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {places.map((place, index) => (
                        <tr key={place.id}>
                          <td>{index + 1}</td>
                          <td>John Doe</td>
                          <td>{place.name}</td>
                          <td>example@gmail.com</td>
                          <td>09518149753</td>
                          <td className="flex gap-3">
                            <button className="btn btn-success btn-sm text-white">
                              Approve
                            </button>
                            <button className="btn btn-error btn-sm text-white">
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedPlace && (
        <PlaceDetailsModal
          place={selectedPlace}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}

      <PasswordChangeModal />
    </div>
  );
};

export default AdminDashboard;
