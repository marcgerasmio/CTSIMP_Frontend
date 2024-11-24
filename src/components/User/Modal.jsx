import React from "react";
import { FaTimes } from "react-icons/fa";

const Modal = ({ onClose }) => (
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
            <tr>
              <td>John Doe</td>
              <td>Tinuy-an Falls</td>
              <td>Bislig, Surigao Del Sur</td>
              <td>
                <button className="btn btn-outline btn-success btn-sm">
                  Approved
                </button>
              </td>
            </tr>
            <tr>
              <td>Doe John</td>
              <td>Butuan City</td>
              <td>Butuan City</td>
              <td>
                <button className="btn btn-outline btn-error btn-sm">
                  Rejected
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default Modal;
