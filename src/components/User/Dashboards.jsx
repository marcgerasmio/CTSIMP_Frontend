import { useState, useRef, useEffect } from "react";
import Header from "./Header";
import FilePreview from "./FilePreview";
import Modal from "./Modal";
import { FaSave } from "react-icons/fa";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [formData, setFormData] = useState({
    name: '', // This will be populated from sessionStorage
    place_name: '', // User will input this manually
    address: '',
    email_address: '',
    contact_no: '',
    description: '',
    virtual_iframe: '',
    map_iframe: '',
    image_link: null,
    status: 'Pending',
  });

  const fileInputRef = useRef(null);

  // Set the name field from sessionStorage when the component mounts
  useEffect(() => {
    const storedName = sessionStorage.getItem("name");
    if (storedName) {
      setFormData((prevData) => ({
        ...prevData,
        name: storedName,
      }));
    }
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        setFormData((prevData) => ({
          ...prevData,
          image_link: file, // Set the image file for upload
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
      setFormData((prevData) => ({
        ...prevData,
        image_link: null,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData();

    // Append form data
    for (const key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }

    try {
      const response = await fetch('http://Tourism_Backend.test/api/places', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formDataToSubmit,
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Place created:', data.place);
        alert('Place created successfully');
        window.location.reload();
      } else {
        console.error('Error:', data.message);
        alert('Error creating place');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting form');
    }
  };

  return (
    <div
      className="min-h-screen font-mono relative bg-cover bg-center"
      style={{ backgroundImage: "url(bg.jpg)" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative z-10 container mx-auto px-8 py-6">
        <form
          className="bg-white bg-opacity-80 backdrop-blur-sm p-10 rounded-lg shadow-xl"
          onSubmit={handleSubmit}
        >
          <Header onOpenModal={() => setIsModalOpen(true)} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Place Name */}
                <div>
                  <label
                    htmlFor="place_name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Place Name
                  </label>
                  <input
                    id="place_name"
                    type="text"
                    placeholder="e.g, Tinuy-an Falls"
                    value={formData.place_name || ""}
                    onChange={handleChange}
                    name="place_name"
                    className="input input-bordered w-full"
                  />
                </div>
                {/* Address */}
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Address
                  </label>
                  <input
                    id="address"
                    type="text"
                    placeholder="e.g, Bislig, Surigao Del Sur"
                    value={formData.address || ""}
                    onChange={handleChange}
                    name="address"
                    className="input input-bordered w-full"
                  />
                </div>
                {/* Email Address */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="e.g, example@gmail.com"
                    value={formData.email_address || ""}
                    onChange={handleChange}
                    name="email_address"
                    className="input input-bordered w-full"
                  />
                </div>
                {/* Contact No */}
                <div>
                  <label
                    htmlFor="contact"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Contact No.
                  </label>
                  <input
                    id="contact"
                    type="tel"
                    placeholder="e.g, 09518149753"
                    value={formData.contact_no || ""}
                    onChange={handleChange}
                    name="contact_no"
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Spot Description..."
                  value={formData.description || ""}
                  onChange={handleChange}
                  name="description"
                  className="textarea textarea-bordered w-full"
                />
              </div>
              {/* Google Map iframe */}
              <div>
                <label
                  htmlFor="googleMap"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Google Map iframe 
                  <span className="ms-5">
                    <a href="https://youtube.com/watch?v=T5FaFLeERLs&si=3rAhKhMruFZitpAb" className="text-blue-500" target="_blank">(For Tutorial, click here)</a>
                  </span>
                </label>
                <textarea
                  id="googleMap"
                  placeholder="e.g, (https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d126440.1668895862!2d123.76526621796874!3d7.972554395731812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sph!4v1732520001105!5m2!1sen!2sph)"
                  value={formData.map_iframe || ""}
                  onChange={handleChange}
                  name="map_iframe"
                  className="textarea textarea-bordered w-full"
                  rows={4}
                />
              </div>
                {/* Visual Tour iframe */}
                <div>
                <label
                  htmlFor="visualTour"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Visual Tour iframe
                  <span className="ms-5">
                    <a href="https://webobook.com/embedded-virtual-tour" className="text-blue-500" target="_blank">(For Tutorial, click here)</a>
                  </span>
                </label>
                <textarea
                  id="visualTour"
                  placeholder="e.g, (https://webobook.com/public/67307f5970d3461cbc339ac2,en?ap=true&si=true&sm=false&sp=true&sfr=false&sl=false&sop=false&)"
                  value={formData.virtual_iframe || ""}
                  onChange={handleChange}
                  name="virtual_iframe"
                  className="textarea textarea-bordered w-full"
                  rows={2}
                />
              </div>
            </div>
            {/* Image Preview */}
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
