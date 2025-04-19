"use client"

import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function Carousel() {
  const navigate = useNavigate()
  const [currentImageId, setCurrentImageId] = useState(null)
  const [translateX, setTranslateX] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [images, setImages] = useState([])
  const carouselRef = useRef(null)
  // Animation states
  const [isImageChanging, setIsImageChanging] = useState(false)
  const [animationDirection, setAnimationDirection] = useState(null)
  const [showLoadingAnimation, setShowLoadingAnimation] = useState(true)

  const currentImage = images && images.length > 0 ? images.find((img) => img.id === currentImageId) : null

  const imageSrc = currentImage?.src ? `http://tourism-backend.test/storage/${currentImage.src}` : ""

  const handleNavigation = (direction) => {
    const currentIndex = images.findIndex((img) => img.id === currentImageId)
    let newIndex

    if (direction === "next") {
      newIndex = (currentIndex + 1) % images.length
      setAnimationDirection("right")
    } else {
      newIndex = (currentIndex - 1 + images.length) % images.length
      setAnimationDirection("left")
    }

    setIsImageChanging(true)

    // Short delay to allow exit animation to complete
    setTimeout(() => {
      setCurrentImageId(images[newIndex].id)
      setTimeout(() => {
        setIsImageChanging(false)
      }, 50)
    }, 300)
  }

  const updateCarouselPosition = () => {
    if (carouselRef.current) {
      const currentIndex = images.findIndex((img) => img.id === currentImageId)
      const itemWidth = 192 + 16
      const newTranslateX = -currentIndex * itemWidth
      setTranslateX(newTranslateX)
    }
  }

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

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
          })),
        )
        // Simulate loading for animation effect
        setTimeout(() => {
          setImagesLoaded(true)
          setTimeout(() => {
            setShowLoadingAnimation(false)
          }, 600)
        }, 1000)
      })
      .catch((error) => console.error("Error fetching places:", error))
  }, [])

  useEffect(() => {
    if (images.length > 0) {
      setCurrentImageId(images[0].id)
      updateCarouselPosition()
    }
  }, [images])

  useEffect(() => {
    updateCarouselPosition()
  }, [currentImageId])

  useEffect(() => {
    const handleResize = () => {
      updateCarouselPosition()
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // CSS for animations
  const fadeInAnimation = "animate-[fadeIn_0.8s_ease-in-out]"
  const fadeOutAnimation = "animate-[fadeOut_0.3s_ease-in-out]"
  const slideInRightAnimation = "animate-[slideInRight_0.5s_ease-out]"
  const slideInLeftAnimation = "animate-[slideInLeft_0.5s_ease-out]"
  const slideOutRightAnimation = "animate-[slideOutRight_0.3s_ease-in]"
  const slideOutLeftAnimation = "animate-[slideOutLeft_0.3s_ease-in]"
  const pulseAnimation = "animate-[pulse_2s_infinite]"
  const bounceAnimation = "animate-[bounce_1s_ease-in-out]"
  const floatAnimation = "animate-[float_3s_ease-in-out_infinite]"

  if (!imagesLoaded || images.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-emerald-50">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <svg
              className="animate-spin h-24 w-24 text-emerald-600 opacity-20"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <svg
              className="absolute top-0 left-0 animate-pulse h-24 w-24 text-emerald-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className={`text-2xl font-semibold text-emerald-800 ${bounceAnimation}`}>
            {images.length === 0 ? "No Tourism Places Available" : "Discovering Mindanao's Treasures"}
          </div>
          <p className={`text-emerald-600 mt-2 ${floatAnimation}`}>
            {images.length === 0
              ? "Check back soon for new destinations"
              : "Preparing your virtual journey through paradise"}
          </p>
          <div className="mt-8 flex justify-center space-x-2">
            <span className="h-3 w-3 bg-emerald-500 rounded-full animate-[bounce_0.6s_infinite_0.1s]"></span>
            <span className="h-3 w-3 bg-emerald-500 rounded-full animate-[bounce_0.6s_infinite_0.2s]"></span>
            <span className="h-3 w-3 bg-emerald-500 rounded-full animate-[bounce_0.6s_infinite_0.3s]"></span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative min-h-screen w-full overflow-hidden ${showLoadingAnimation ? fadeInAnimation : ""}`}>
      {/* Main background image with transition effect */}
      {currentImage && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={imageSrc || "/placeholder.svg"}
            alt={currentImage?.alt}
            className={`h-full w-full object-cover transition-all duration-700 ease-in-out ${
              isImageChanging ? "opacity-0 scale-105" : "opacity-100 scale-100"
            } ${
              animationDirection === "right" && !isImageChanging
                ? "animate-[zoomInRight_0.7s_ease-out]"
                : animationDirection === "left" && !isImageChanging
                  ? "animate-[zoomInLeft_0.7s_ease-out]"
                  : ""
            }`}
            style={{ filter: "brightness(1.05) contrast(1.05)" }}
          />
        </div>
      )}

      {/* Animated vignette effect */}
      <div className="absolute inset-0 z-5 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none animate-[fadeIn_1.5s_ease-in-out]"></div>
      <div className="absolute inset-0 z-5 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none animate-[pulseGradient_8s_ease-in-out_infinite]"></div>

      {/* Floating particles effect for atmosphere */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-2 h-2 bg-white/20 rounded-full animate-[float_8s_ease-in-out_infinite]"></div>
        <div className="absolute top-[15%] left-[15%] w-1 h-1 bg-white/30 rounded-full animate-[float_12s_ease-in-out_infinite_1s]"></div>
        <div className="absolute top-[25%] right-[10%] w-2 h-2 bg-white/20 rounded-full animate-[float_9s_ease-in-out_infinite_0.5s]"></div>
        <div className="absolute top-[40%] right-[20%] w-1 h-1 bg-white/30 rounded-full animate-[float_11s_ease-in-out_infinite_1.5s]"></div>
        <div className="absolute bottom-[30%] left-[25%] w-2 h-2 bg-white/20 rounded-full animate-[float_10s_ease-in-out_infinite_2s]"></div>
      </div>

      {/* Back button with hover effect */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 z-30 text-white p-3 bg-emerald-700/80 rounded-full hover:bg-emerald-800/90 transition-all duration-300 shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-1"
        aria-label="Go back"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      {/* Main content with entrance animation */}
      <div className={`relative z-20 flex min-h-screen flex-col ${fadeInAnimation}`}>
        <div className="flex-1 flex items-center p-6 md:p-12">
          <div
            className={`max-w-2xl backdrop-blur-sm p-8 rounded-lg shadow-xl transition-all duration-500 ${
              isImageChanging
                ? animationDirection === "right"
                  ? slideOutLeftAnimation
                  : slideOutRightAnimation
                : animationDirection === "right"
                  ? slideInRightAnimation
                  : animationDirection === "left"
                    ? slideInLeftAnimation
                    : fadeInAnimation
            }`}
          >
            {/* Content with text shadow for readability without obscuring background */}
            <div className="inline-block px-3 py-1 bg-emerald-600 text-white text-xs font-medium rounded-full mb-4 shadow-sm animate-[pulse_3s_infinite]">
              Caraga Destination
            </div>

            <h1 className="mb-2 text-4xl md:text-5xl font-bold text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)]">
              {currentImage?.title}
            </h1>

            <div className="w-20 h-1 bg-amber-500 mb-6 shadow-md animate-[growWidth_1s_ease-out]"></div>

            <p className="mb-8 text-white text-lg leading-relaxed drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] bg-black/10 p-4 rounded-lg backdrop-blur-sm">
              {currentImage?.description}
            </p>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => toggleDropdown("contact")}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 flex items-center shadow-md hover:shadow-lg hover:-translate-y-0.5 ${
                  activeDropdown === "contact"
                    ? "bg-emerald-700 text-white"
                    : "bg-white/90 text-emerald-900 hover:bg-white"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 mr-2 ${activeDropdown === "contact" ? "animate-[pulse_1s_infinite]" : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                Contact
              </button>
              <button
                onClick={() => toggleDropdown("map")}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 flex items-center shadow-md hover:shadow-lg hover:-translate-y-0.5 ${
                  activeDropdown === "map" ? "bg-emerald-700 text-white" : "bg-white/90 text-emerald-900 hover:bg-white"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 mr-2 ${activeDropdown === "map" ? "animate-[pulse_1s_infinite]" : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                  <line x1="8" y1="2" x2="8" y2="18"></line>
                  <line x1="16" y1="6" x2="16" y2="22"></line>
                </svg>
                View Map
              </button>
              <button
                onClick={() => toggleDropdown("tour")}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 flex items-center shadow-md hover:shadow-lg hover:-translate-y-0.5 ${
                  activeDropdown === "tour"
                    ? "bg-emerald-700 text-white"
                    : "bg-white/90 text-emerald-900 hover:bg-white"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 mr-2 ${activeDropdown === "tour" ? "animate-[spin_4s_linear_infinite]" : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polygon points="10 8 16 12 10 16 10 8"></polygon>
                </svg>
                Virtual Tour
              </button>
            </div>

            {/* Dropdown content with animation */}
            {activeDropdown && (
              <div className="mt-6 p-5 bg-white rounded-lg shadow-lg border border-emerald-100 animate-[fadeInUp_0.4s_ease-out]">
                {activeDropdown === "contact" && (
                  <div>
                    <h3 className="font-semibold text-emerald-800 mb-3 flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-emerald-600 animate-[pulse_2s_infinite]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      Contact Information
                    </h3>
                    <div className="bg-emerald-50 p-4 rounded-md animate-[fadeIn_0.6s_ease-out_0.2s]">
                      <div className="flex items-start mb-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-3 text-emerald-600 mt-0.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                          <polyline points="22,6 12,13 2,6"></polyline>
                        </svg>
                        <div>
                          <p className="text-sm font-medium text-gray-700">Email</p>
                          <p className="text-emerald-700">{currentImage?.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-3 text-emerald-600 mt-0.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-emerald-600"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
                        <line x1="8" y1="2" x2="8" y2="18"></line>
                        <line x1="16" y1="6" x2="16" y2="22"></line>
                      </svg>
                      Location Map
                    </h3>
                    <div className="border border-emerald-200 rounded-lg overflow-hidden shadow-md animate-[fadeIn_0.6s_ease-out_0.2s]">
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2 text-emerald-600 animate-[spin_4s_linear_infinite]"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <polygon points="10 8 16 12 10 16 10 8"></polygon>
                      </svg>
                      Virtual Tour Experience
                    </h3>
                    <div className="border border-emerald-200 rounded-lg overflow-hidden shadow-md animate-[fadeIn_0.6s_ease-out_0.2s]">
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

        {/* Carousel navigation with animations */}
        <div className="relative w-full bg-black/40 backdrop-blur-sm p-6 border-t border-white/10 animate-[fadeInUp_0.8s_ease-out]">
          <div className="mx-auto max-w-6xl overflow-hidden" ref={carouselRef}>
            <div
              className="flex gap-4 transition-transform duration-500 ease-out"
              style={{ transform: `translateX(${translateX}px)` }}
            >
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className={`flex-none w-[192px] h-[128px] rounded-lg overflow-hidden shadow-md transition-all duration-300 cursor-pointer animate-[fadeIn_0.5s_ease-out_${index * 0.1}s] ${
                    image.id === currentImageId
                      ? "ring-4 ring-amber-500 scale-105 z-10"
                      : "ring-2 ring-white/30 hover:ring-white/70 hover:scale-102"
                  }`}
                  onClick={() => {
                    if (image.id !== currentImageId) {
                      setAnimationDirection(
                        images.findIndex((img) => img.id === currentImageId) < index ? "right" : "left",
                      )
                      setIsImageChanging(true)
                      setTimeout(() => {
                        setCurrentImageId(image.id)
                        setTimeout(() => {
                          setIsImageChanging(false)
                        }, 50)
                      }, 300)
                    }
                  }}
                >
                  <img
                    src={`http://tourism-backend.test/storage/${image.src}`}
                    alt={image.alt}
                    className={`object-cover w-full h-full transition-transform duration-700 ${
                      image.id === currentImageId ? "scale-110" : "scale-100 hover:scale-110"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons with hover effects */}
          <button
            onClick={() => handleNavigation("prev")}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-3 bg-emerald-700/80 rounded-full hover:bg-emerald-800/90 transition-all duration-300 shadow-lg hover:shadow-emerald-500/20 hover:-translate-x-1"
            aria-label="Previous destination"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <button
            onClick={() => handleNavigation("next")}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-3 bg-emerald-700/80 rounded-full hover:bg-emerald-800/90 transition-all duration-300 shadow-lg hover:shadow-emerald-500/20 hover:translate-x-1"
            aria-label="Next destination"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>

          {/* Destination counter with animation */}
          <div className="absolute bottom-6 right-1/2 transform translate-x-1/2 bg-emerald-800/90 text-white text-xs font-medium px-3 py-1 rounded-full animate-[pulse_3s_infinite]">
            {images.findIndex((img) => img.id === currentImageId) + 1} / {images.length}
          </div>
        </div>

        {/* Footer with subtle animation */}
        <div className="bg-emerald-900/70 backdrop-blur-sm text-center py-3 text-emerald-100 text-xs animate-[fadeIn_1s_ease-out]">
          <p>Department of Tourism - Caraga Region</p>
          <p className="text-emerald-200 mt-1 animate-[float_3s_ease-in-out_infinite]">
            Discover the beauty and culture of Caraga
          </p>
        </div>
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        
        @keyframes slideInRight {
          from { transform: translateX(30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideInLeft {
          from { transform: translateX(-30px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOutRight {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(30px); opacity: 0; }
        }
        
        @keyframes slideOutLeft {
          from { transform: translateX(0); opacity: 1; }
          to { transform: translateX(-30px); opacity: 0; }
        }
        
        @keyframes zoomInRight {
          from { transform: scale(1.1) translateX(30px); opacity: 0; }
          to { transform: scale(1) translateX(0); opacity: 1; }
        }
        
        @keyframes zoomInLeft {
          from { transform: scale(1.1) translateX(-30px); opacity: 0; }
          to { transform: scale(1) translateX(0); opacity: 1; }
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes growWidth {
          from { width: 0; }
          to { width: 5rem; }
        }
        
        @keyframes fadeInUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes pulseGradient {
          0% { opacity: 0.7; }
          50% { opacity: 0.3; }
          100% { opacity: 0.7; }
        }
      `}</style>
    </div>
  )
}

