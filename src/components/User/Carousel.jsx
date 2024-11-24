"use client";

import React, { useState, useRef, useEffect } from "react";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

export default function Carousel() {
  const [currentImageId, setCurrentImageId] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const carouselRef = useRef(null);

  const images = [
    {
      id: 1,
      src: "bg.jpg",
      thumbnail: "bg-3.jpg",
      alt: "Enchanted River main view",
      title: "ENCHANTED RIVER",
      subtitle: "Hinatuan Surigao del Sur",
      description:
        "The magical blue river (Enchanted River) is known for its enchanting color and diverse fish species. Visitors can enjoy boat tours, and explore marine life like dugongs and sea turtles. The lush tropical forests surrounding the river provide a picturesque backdrop for picnics and nature walks.",
    },
    {
      id: 2,
      src: "bg-1.jpg",
      thumbnail: "bg-1.jpg",
      alt: "Beach area",
      title: "PRISTINE BEACHES",
      subtitle: "Surrounding Enchanted River",
      description:
        "The beaches surrounding the Enchanted River offer a serene escape with their powdery white sand and crystal-clear waters. These unspoiled shores provide the perfect spot for sunbathing, picnicking, or simply enjoying the breathtaking views of the Philippine Sea.",
    },
    {
      id: 3,
      src: "bg-2.jpg",
      thumbnail: "bg-2.jpg",
      alt: "Cave formations",
      title: "MYSTERIOUS CAVES",
      subtitle: "Hidden Wonders of Hinatuan",
      description:
        "Explore the intricate cave systems near the Enchanted River, featuring stunning stalactite and stalagmite formations. These caves hold secrets of ancient geological processes and offer adventurers a glimpse into the underground wonders of Surigao del Sur.",
    },
    {
      id: 4,
      src: "bg.jpg",
      thumbnail: "bg.jpg",
      alt: "Local wildlife",
      title: "DIVERSE WILDLIFE",
      subtitle: "Surigao del Sur's Natural Treasures",
      description:
        "Discover the rich biodiversity of Surigao del Sur, home to various species of birds, reptiles, and mammals. The region's lush forests and pristine waters provide a haven for unique and endangered wildlife, offering nature enthusiasts an unforgettable experience.",
    },
    {
      id: 5,
      src: "bg-1.jpg",
      thumbnail: "bg-1.jpg",
      alt: "Local cuisine",
      title: "CULINARY DELIGHTS",
      subtitle: "Taste of Surigao del Sur",
      description:
        "Indulge in the local flavors of Surigao del Sur, where fresh seafood and traditional Filipino dishes take center stage. From grilled fish straight from the Enchanted River to unique delicacies like 'kinilaw', the region's cuisine is a feast for the senses.",
    },
  ];

  const currentImage =
    images.find((img) => img.id === currentImageId) || images[0];

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
      const itemWidth = 192 + 16; // 48rem (w-48) + 1rem (gap-4) in pixels
      const newTranslateX = -currentIndex * itemWidth;
      setTranslateX(newTranslateX);
    }
  };

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

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

  useEffect(() => {
    const imagePromises = images.map((image) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = image.src;
        img.onload = resolve;
        img.onerror = reject;
      });
    });

    Promise.all(imagePromises)
      .then(() => {
        setImagesLoaded(true);
        updateCarouselPosition();
      })
      .catch((error) => console.error("Error loading images:", error));
  }, []);

  if (!imagesLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-mono">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={currentImage.src}
          alt={currentImage.alt}
          className="h-full w-full object-cover transition-opacity duration-500"
        />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Main Content */}
        <div className="flex-1 flex items-center p-6 md:p-12">
          <div className="max-w-2xl bg-black/1 p-8 rounded-lg backdrop-blur-sm">
            <h1 className="mb-2 text-5xl font-bold text-white">
              {currentImage.title}
            </h1>
            <h2 className="mb-4 text-2xl font-semibold text-yellow-500">
              {currentImage.subtitle}
            </h2>
            <p className="mb-6 text-white text-lg">
              {currentImage.description}
            </p>

            {/* Buttons with Dropdowns */}
            <div className="flex flex-wrap gap-4">
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("contact")}
                  className="rounded-full bg-white px-6 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-300"
                >
                  Contact
                </button>
                {activeDropdown === "contact" && (
                  <div className="absolute mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Contact Information
                      </h3>
                      <p className="text-sm text-gray-700">
                        Email: info@enchantedriver.com
                      </p>
                      <p className="text-sm text-gray-700">
                        Phone: +63 123 456 7890
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("map")}
                  className="rounded-full bg-white px-6 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-300"
                >
                  View map
                </button>
                {activeDropdown === "map" && (
                  <div className="absolute mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Location
                      </h3>
                      <p className="text-sm text-gray-700">
                        Hinatuan, Surigao del Sur, Philippines
                      </p>
                      <a
                        href="#"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        Open in Google Maps
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative">
                <button
                  onClick={() => toggleDropdown("tour")}
                  className="rounded-full bg-white px-6 py-2 text-gray-800 hover:bg-gray-100 transition-colors duration-300"
                >
                  Explore Virtual Tour
                </button>
                {activeDropdown === "tour" && (
                  <div className="absolute mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                    <div className="p-4">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Virtual Tour Options
                      </h3>
                      <ul className="text-sm text-gray-700">
                        <li>
                          <a href="#" className="text-blue-600 hover:underline">
                            360° Panoramic View
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-blue-600 hover:underline">
                            Underwater Experience
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-blue-600 hover:underline">
                            Forest Trail Tour
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Image Carousel */}
        <div className="relative w-full bg-black/30 p-6">
          <div className="mx-auto max-w-6xl overflow-hidden" ref={carouselRef}>
            <div
              className="flex gap-4 transition-transform duration-300 ease-out"
              style={{ transform: `translateX(${translateX}px)` }}
            >
              {images.map((image) => (
                <button
                  key={image.id}
                  onClick={() => setCurrentImageId(image.id)}
                  className={`relative h-32 w-48 flex-shrink-0 overflow-hidden rounded-lg transition-all duration-300 ${
                    currentImageId === image.id
                      ? "ring-2 ring-white"
                      : "opacity-70"
                  }`}
                >
                  <img
                    src={image.thumbnail}
                    alt={image.alt}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 left-0 right-0 flex justify-between px-4 -translate-y-1/2">
            <button
              onClick={() => handleNavigation("prev")}
              className="rounded-full bg-white/75 p-2 text-gray-800 hover:bg-white focus:outline-none focus:ring-2 focus:ring-white transition-colors duration-300"
              aria-label="Previous image"
            >
              <IoChevronBackOutline className="h-6 w-6" />
            </button>
            <button
              onClick={() => handleNavigation("next")}
              className="rounded-full bg-white/75 p-2 text-gray-800 hover:bg-white focus:outline-none focus:ring-2 focus:ring-white transition-colors duration-300"
              aria-label="Next image"
            >
              <IoChevronForwardOutline className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
