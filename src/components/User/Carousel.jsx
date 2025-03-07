import React, { useState, useRef, useEffect } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom"; // Added import

export default function Carousel() {
  const navigate = useNavigate(); // Added navigation hook
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
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-gray-600">
          {images.length === 0 ? "No Data..." : "Loading..."}
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-mono">
      {/* Added home navigation button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 z-30 text-white text-3xl p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors duration-300"
      >
        <IoChevronBackOutline />
      </button>

      {currentImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={imageSrc}
            alt={currentImage?.alt}
            className="h-full w-full object-cover transition-opacity duration-500"
          />
        </div>
      )}

      <div className="relative z-10 flex min-h-screen flex-col">
        <div className="flex-1 flex items-center p-6 md:p-12">
          <div className="max-w-2xl bg-black/1 p-8 rounded-lg backdrop-blur-sm">
            <h1 className="mb-2 text-5xl font-bold text-white">
              {currentImage?.title}
            </h1>
            <h2 className="mb-4 text-2xl font-semibold text-yellow-500">
              {currentImage?.place_name}
            </h2>
            <p className="mb-6 text-white text-lg">
              {currentImage?.description}
            </p>

            <div className="flex gap-4">
              <button
                onClick={() => toggleDropdown("contact")}
                className="rounded-full bg-white px-6 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-300"
              >
                Contact
              </button>
              <button
                onClick={() => toggleDropdown("map")}
                className="rounded-full bg-white px-6 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-300"
              >
                View map
              </button>
              <button
                onClick={() => toggleDropdown("tour")}
                className="rounded-full bg-white px-6 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-300"
              >
                Explore Virtual Tour
              </button>
            </div>

            {activeDropdown === "contact" && (
              <div className="mt-4 p-4 bg-white text-black rounded-lg shadow-lg">
                <h3 className="font-semibold">Contact Information</h3>
                <p className="text-sm text-gray-700">
                  Email: {currentImage?.email}
                </p>
                <p className="text-sm text-gray-700">
                  Phone: {currentImage?.contact}
                </p>
              </div>
            )}
            {activeDropdown === "map" && (
              <div className="mt-4 p-4 bg-white text-black rounded-lg shadow-lg">
                <h3 className="font-semibold">View Map</h3>
                <iframe
                  src={currentImage?.map_iframe}
                  title="Location Map"
                  className="w-full h-64"
                ></iframe>
              </div>
            )}
            {activeDropdown === "tour" && (
              <div className="mt-4 p-4 bg-white text-black rounded-lg shadow-lg">
                <h3 className="font-semibold">Virtual Tour</h3>
                <iframe
                  src={currentImage?.virtual_iframe}
                  title="Virtual Tour"
                  className="w-full h-64"
                  allow="xr-spatial-tracking; vr; gyroscope; accelerometer; fullscreen; autoplay; xr"
                  scrolling="no"
                  allowFullScreen={true}
                  frameBorder="0"
                  allowVR="yes"
                />
              </div>
            )}
          </div>
        </div>

        <div className="relative w-full bg-black/30 p-6">
          <div className="mx-auto max-w-6xl overflow-hidden" ref={carouselRef}>
            <div
              className="flex gap-4 transition-transform duration-300 ease-out"
              style={{ transform: `translateX(${translateX}px)` }}
            >
              {images.map((image) => (
                <div
                  key={image.id}
                  className="flex-none w-[192px] h-[128px] bg-gray-200 rounded-lg"
                >
                  <img
                    src={`http://tourism-backend.test/storage/${image.src}`}
                    alt={image.alt}
                    className="object-cover w-full h-full rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
            <button
              onClick={() => handleNavigation("prev")}
              className="text-white text-3xl p-2 bg-black/50 rounded-full hover:bg-black/70"
            >
              <IoChevronBackOutline />
            </button>
          </div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
            <button
              onClick={() => handleNavigation("next")}
              className="text-white text-3xl p-2 bg-black/50 rounded-full hover:bg-black/70"
            >
              <IoChevronForwardOutline />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}