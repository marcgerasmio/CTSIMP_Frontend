import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Carousel() {
  const navigate = useNavigate();
  const [currentImageId, setCurrentImageId] = useState(null);
  const [translateX, setTranslateX] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [images, setImages] = useState([]);
  const carouselRef = useRef(null);

  const currentImage =
    images && images.length > 0
      ? images.find((img) => img.id === currentImageId)
      : null;

  const imageSrc = currentImage?.src
    ? `http://tourism-backend.test/storage/${currentImage.src}`
    : "";

  const handleNavigation = (direction) => {
    const currentIndex = images.findIndex((img) => img.id === currentImageId);
    let newIndex;

    if (direction === "next") {
      newIndex = (currentIndex + 1) % images.length;
    } else {
      newIndex = (currentIndex - 1 + images.length) % images.length;
    }

    setCurrentImageId(images[newIndex].id);
  };

  const updateCarouselPosition = () => {
    if (carouselRef.current) {
      const currentIndex = images.findIndex((img) => img.id === currentImageId);
      const itemWidth = 192 + 16;
      const newTranslateX = -currentIndex * itemWidth;
      setTranslateX(newTranslateX);
    }
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  useEffect(() => {
    fetch("http://tourism-backend.test/api/approvedplaces")
      .then((response) => response.json())
      .then((data) => {
        setImages(
          data.map((place) => ({
            id: place.id,
            src: place.image_link,
            alt: place.name,
            title: place.place_name,
            email: place.email_address,
            contact: place.contact_no,
            description: place.description,
            virtual_iframe: place.virtual_iframe,
            map_iframe: place.map_iframe,
          }))
        );
        setImagesLoaded(true);
      })
      .catch((error) => console.error("Error fetching places:", error));
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      setCurrentImageId(images[0].id);
      updateCarouselPosition();
    }
  }, [images]);

  useEffect(() => {
    updateCarouselPosition();
  }, [currentImageId]);

  useEffect(() => {
    const handleResize = () => {
      updateCarouselPosition();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!imagesLoaded || images.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-emerald-50">
        <div className="text-center">
          <svg 
            className="animate-spin h-12 w-12 text-emerald-600 mx-auto mb-4" 
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
          <div className="text-2xl font-semibold text-emerald-800">
            {images.length === 0 ? "No Tourism Places Available" : "Loading Mindanao's Beautiful Destinations..."}
          </div>
          <p className="text-emerald-600 mt-2">
            {images.length === 0 ? "Check back soon for new destinations" : "Preparing your virtual journey"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Main background image - No overlay for better visibility */}
      {currentImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={imageSrc || "/placeholder.svg"}
            alt={currentImage?.alt}
            className="h-full w-full object-cover transition-opacity duration-500"
            style={{ filter: "brightness(1.05) contrast(1.05)" }} // Subtle enhancement to the image
          />
        </div>
      )}
      
      {/* Subtle vignette effect that preserves image clarity */}
      <div className="absolute inset-0 z-5 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 z-5 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none"></div>
      
      {/* Back button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 z-30 text-white p-3 bg-emerald-700/80 rounded-full hover:bg-emerald-800/90 transition-colors duration-300 shadow-lg"
        aria-label="Go back"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      {/* Main content */}
      <div className="relative z-20 flex min-h-screen flex-col">
        <div className="flex-1 flex items-center p-6 md:p-12">
          <div className="max-w-2xl backdrop-blur-sm p-8 rounded-lg shadow-xl">
            {/* Content with text shadow for readability without obscuring background */}
            <div className="inline-block px-3 py-1 bg-emerald-600 text-white text-xs font-medium rounded-full mb-4 shadow-sm">
              Mindanao Destination
            </div>
            
            <h1 className="mb-2 text-4xl md:text-5xl font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)]">
              {currentImage?.title}
            </h1>
            
            <div className="w-20 h-1 bg-amber-500 mb-6 shadow-md"></div>
            
            <p className="mb-8 text-white text-lg leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] bg-black/10 p-4 rounded-lg backdrop-blur-sm">
              {currentImage?.description}
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => toggleDropdown("contact")}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 flex items-center shadow-md ${
                  activeDropdown === "contact" 
                    ? "bg-emerald-700 text-white" 
                    : "bg-white/90 text-emerald-900 hover:bg-white"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Contact
              </button>
              <button
                onClick={() => toggleDropdown("map")}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 flex items-center shadow-md ${
                  activeDropdown === "map" 
                    ? "bg-emerald-700 text-white" 
                    : "bg-white/90 text-emerald-900 hover:bg-white"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                  <line x1="8" y1="2" x2="8" y2="18"></line>
                  <line x1="16" y1="6" x2="16" y2="22"></line>
                </svg>
                View Map
              </button>
              <button
                onClick={() => toggleDropdown("tour")}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300 flex items-center shadow-md ${
                  activeDropdown === "tour" 
                    ? "bg-emerald-700 text-white" 
                    : "bg-white/90 text-emerald-900 hover:bg-white"
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polygon points="10 8 16 12 10 16 10 8"></polygon>
                </svg>
                Virtual Tour
              </button>
            </div>

            {/* Dropdown content */}
            {activeDropdown && (
              <div className="mt-6 p-5 bg-white rounded-lg shadow-lg border border-emerald-100 animate-fadeIn">
                {activeDropdown === "contact" && (
                  <div>
                    <h3 className="font-semibold text-emerald-800 mb-3 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      Contact Information
                    </h3>
                    <div className="bg-emerald-50 p-4 rounded-md">
                      <div className="flex items-start mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-emerald-600 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Email</p>
                          <p className="text-emerald-700">{currentImage?.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-emerald-600 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Phone</p>
                          <p className="text-emerald-700">{currentImage?.contact}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeDropdown === "map" && (
                  <div>
                    <h3 className="font-semibold text-emerald-800 mb-3 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                        <line x1="8" y1="2" x2="8" y2="18"></line>
                        <line x1="16" y1="6" x2="16" y2="22"></line>
                      </svg>
                      Location Map
                    </h3>
                    <div className="border border-emerald-200 rounded-lg overflow-hidden shadow-md">
                      <iframe
                        src={currentImage?.map_iframe}
                        title="Location Map"
                        className="w-full h-64 md:h-80"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}
                
                {activeDropdown === "tour" && (
                  <div>
                    <h3 className="font-semibold text-emerald-800 mb-3 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polygon points="10 8 16 12 10 16 10 8"></polygon>
                      </svg>
                      Virtual Tour Experience
                    </h3>
                    <div className="border border-emerald-200 rounded-lg overflow-hidden shadow-md">
                      <iframe
                        src={currentImage?.virtual_iframe}
                        title="Virtual Tour"
                        className="w-full h-64 md:h-80"
                        allow="xr-spatial-tracking; vr; gyroscope; accelerometer; fullscreen; autoplay; xr"
                        scrolling="no"
                        allowFullScreen={true}
                        frameBorder="0"
                        allowVR="yes"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Carousel navigation - Semi-transparent for better background visibility */}
        <div className="relative w-full bg-black/40 backdrop-blur-sm p-6 border-t border-white/10">
          <div className="mx-auto max-w-6xl overflow-hidden" ref={carouselRef}>
            <div
              className="flex gap-4 transition-transform duration-300 ease-out"
              style={{ transform: `translateX(${translateX}px)` }}
            >
              {images.map((image) => (
                <div
                  key={image.id}
                  className={`flex-none w-[192px] h-[128px] rounded-lg overflow-hidden shadow-md transition-all duration-300 cursor-pointer ${
                    image.id === currentImageId 
                      ? "ring-4 ring-amber-500 scale-105" 
                      : "ring-2 ring-white/30 hover:ring-white/70"
                  }`}
                  onClick={() => setCurrentImageId(image.id)}
                >
                  <img
                    src={`http://tourism-backend.test/storage/${image.src}`}
                    alt={image.alt}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation buttons */}
          <button
            onClick={() => handleNavigation("prev")}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-3 bg-emerald-700/80 rounded-full hover:bg-emerald-800/90 transition-colors duration-300 shadow-lg"
            aria-label="Previous destination"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          
          <button
            onClick={() => handleNavigation("next")}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-3 bg-emerald-700/80 rounded-full hover:bg-emerald-800/90 transition-colors duration-300 shadow-lg"
            aria-label="Next destination"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
          
          {/* Destination counter */}
          <div className="absolute bottom-6 right-1/2 transform translate-x-1/2 bg-emerald-800/90 text-white text-xs font-medium px-3 py-1 rounded-full">
            {images.findIndex((img) => img.id === currentImageId) + 1} / {images.length}
          </div>
        </div>
        
        {/* Footer - Lighter and more transparent */}
        <div className="bg-emerald-900/70 backdrop-blur-sm text-center py-3 text-emerald-100 text-xs">
          <p>Department of Tourism - Mindanao Region</p>
          <p className="text-emerald-200 mt-1">Discover the beauty and culture of Mindanao</p>
        </div>
      </div>
    </div>
  );
}