import { useState } from "react";
import Login from "./Login.jsx";
import Register from "./Register.jsx";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleAuth = () => setIsLogin((prev) => !prev);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div
        className="hero min-h-screen font-mono"
        style={{
          backgroundImage: "url(bg.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-65"></div>
        <div className="hero-content text-neutral-content text-center w-1/3">
          {isLogin ? (
            <Login onToggle={toggleAuth} openModal={openModal} />
          ) : (
            <Register onToggle={toggleAuth} openModal={openModal} />
          )}
        </div>
      </div>

      {/* Shared Modal */}
      {isModalOpen && (
        <dialog id="error_modal" className="modal" open>
          <div className="modal-box">
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={closeModal}
              >
                ✕
              </button>
            </form>
            <h3 className="font-bold text-lg">Operation Failed</h3>
            <p className="py-4">Please check your input and try again.</p>
          </div>
        </dialog>
      )}
    </>
  );
};

export default Auth;
