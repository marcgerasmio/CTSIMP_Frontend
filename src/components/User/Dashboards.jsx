import { useState, useRef } from "react";
import Header from "./Header";
import InputField from "./InputField";
import TextAreaField from "./TextAreaField";
import FilePreview from "./FilePreview";
import Modal from "./Modal";
import { FaSave } from "react-icons/fa";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  return (
    <div
      className="min-h-screen font-mono relative bg-cover bg-center"
      style={{ backgroundImage: "url(bg.jpg)" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative z-10 container mx-auto px-8 py-6">
        <form className="bg-white bg-opacity-80 backdrop-blur-sm p-10 rounded-lg shadow-xl">
          <Header onOpenModal={() => setIsModalOpen(true)} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  id="name"
                  label="Name of Place"
                  placeholder="e.g, Tinuy-an Falls"
                />
                <InputField
                  id="address"
                  label="Address"
                  placeholder="e.g, Bislig, Surigao Del Sur"
                />
                <InputField
                  id="email"
                  label="Email Address"
                  type="email"
                  placeholder="e.g, example@gmail.com"
                />
                <InputField
                  id="contact"
                  label="Contact No."
                  type="tel"
                  placeholder="e.g, 09518149753"
                />
              </div>
              <TextAreaField
                id="description"
                label="Description"
                placeholder="Spot Description. . ."
              />
              <TextAreaField
                id="visualTour"
                label="Visual Tour iframe"
                placeholder="e.g, <iframe src={url} title={description}></iframe>"
              />
              <TextAreaField
                id="googleMap"
                label="Google Map iframe"
                placeholder="Google Map iframe"
              />
            </div>
            <div className="lg:col-span-1">
              <FilePreview
                previewUrl={previewUrl}
                onFileChange={handleFileChange}
                fileInputRef={fileInputRef}
              />
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="btn btn-primary font-bold text-white w-full sm:w-1/4 md:w-1/6"
            >
              <FaSave /> Submit
            </button>
          </div>
        </form>
      </div>
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Dashboard;
