import { useState, useRef, useEffect } from "react";
import Header from "./Header";
import FilePreview from "./FilePreview";
import Modal from "./Modal";

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
      const response = await fetch('http://tourism-backend.test/api/places', {
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
      className="min-h-screen relative bg-cover bg-center"
      style={{ backgroundImage: "url(bg.jpg)" }}
    >
      <div className="absolute inset-0 bg-emerald-900 bg-opacity-80"></div>
      <div className="relative z-10 container mx-auto px-4 py-8">
        <form
          className="bg-white rounded-lg shadow-xl overflow-hidden"
          onSubmit={handleSubmit}
        >
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 p-6">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white mr-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <div>
                <h1 className="text-2xl font-bold text-white">Caraga Tourism</h1>
                <p className="text-emerald-100 text-sm">Submit a New Destination</p>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <Header onOpenModal={() => setIsModalOpen(true)} />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Place Name */}
                  <div>
                    <label
                      htmlFor="place_name"
                      className="block text-sm font-medium text-emerald-700 mb-1"
                    >
                      Place Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                      </div>
                      <input
                        id="place_name"
                        type="text"
                        placeholder="e.g, Tinuy-an Falls"
                        value={formData.place_name || ""}
                        onChange={handleChange}
                        name="place_name"
                        className="pl-10 w-full px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  {/* Address */}
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-emerald-700 mb-1"
                    >
                      Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                          <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                      </div>
                      <input
                        id="address"
                        type="text"
                        placeholder="e.g, Bislig, Surigao Del Sur"
                        value={formData.address || ""}
                        onChange={handleChange}
                        name="address"
                        className="pl-10 w-full px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  {/* Email Address */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-emerald-700 mb-1"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                      </div>
                      <input
                        id="email"
                        type="email"
                        placeholder="e.g, example@gmail.com"
                        value={formData.email_address || ""}
                        onChange={handleChange}
                        name="email_address"
                        className="pl-10 w-full px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  {/* Contact No */}
                  <div>
                    <label
                      htmlFor="contact"
                      className="block text-sm font-medium text-emerald-700 mb-1"
                    >
                      Contact No.
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                      </div>
                      <input
                        id="contact"
                        type="tel"
                        placeholder="e.g, 09518149753"
                        value={formData.contact_no || ""}
                        onChange={handleChange}
                        name="contact_no"
                        className="pl-10 w-full px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Description */}
                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-emerald-700 mb-1"
                  >
                    Description
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                        <line x1="16" y1="13" x2="8" y2="13"></line>
                        <line x1="16" y1="17" x2="8" y2="17"></line>
                        <polyline points="10 9 9 9 8 9"></polyline>
                      </svg>
                    </div>
                    <textarea
                      id="description"
                      placeholder="Spot Description..."
                      value={formData.description || ""}
                      onChange={handleChange}
                      name="description"
                      className="pl-10 w-full px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent min-h-[120px]"
                    />
                  </div>
                </div>
                
                {/* Google Map iframe */}
                <div>
                  <label
                    htmlFor="googleMap"
                    className="block text-sm font-medium text-emerald-700 mb-1"
                  >
                    Google Map iframe
                    <span className="ml-5">
                      <a href="https://youtube.com/watch?v=T5FaFLeERLs&si=3rAhKhMruFZitpAb" className="text-emerald-600 hover:text-emerald-700 underline" target="_blank" rel="noopener noreferrer">(For Tutorial, click here)</a>
                    </span>
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                        <line x1="8" y1="2" x2="8" y2="18"></line>
                        <line x1="16" y1="6" x2="16" y2="22"></line>
                      </svg>
                    </div>
                    <textarea
                      id="googleMap"
                      placeholder="e.g, (https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d126440.1668895862!2d123.76526621796874!3d7.972554395731812!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sph!4v1732520001105!5m2!1sen!2sph)"
                      value={formData.map_iframe || ""}
                      onChange={handleChange}
                      name="map_iframe"
                      className="pl-10 w-full px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent min-h-[100px]"
                      rows={4}
                    />
                  </div>
                </div>
                
                {/* Visual Tour iframe */}
                <div>
                  <label
                    htmlFor="visualTour"
                    className="block text-sm font-medium text-emerald-700 mb-1"
                  >
                    Visual Tour iframe
                    <span className="ml-5">
                      <a href="https://webobook.com/embedded-virtual-tour" className="text-emerald-600 hover:text-emerald-700 underline" target="_blank" rel="noopener noreferrer">(For Tutorial, click here)</a>
                    </span>
                  </label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polygon points="10 8 16 12 10 16 10 8"></polygon>
                      </svg>
                    </div>
                    <textarea
                      id="visualTour"
                      placeholder="e.g, (https://webobook.com/public/67307f5970d3461cbc339ac2,en?ap=true&si=true&sm=false&sp=true&sfr=false&sl=false&sop=false&)"
                      value={formData.virtual_iframe || ""}
                      onChange={handleChange}
                      name="virtual_iframe"
                      className="pl-10 w-full px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent min-h-[80px]"
                      rows={2}
                    />
                  </div>
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
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium rounded-md transition duration-200 flex items-center justify-center shadow-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                Submit Destination
              </button>
            </div>
          </div>
          
          <div className="bg-emerald-50 px-6 py-4 border-t border-emerald-100 text-center">
            <p className="text-xs text-emerald-700">
              Department of Tourism - Caraga Region
            </p>
            <p className="text-xs text-emerald-600 mt-1">
              Discover the beauty and culture of Caraga
            </p>
          </div>
        </form>
      </div>
      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default Dashboard;