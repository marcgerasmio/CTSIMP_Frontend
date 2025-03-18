"use client"

import { NavLink } from "react-router-dom"
import { motion } from "framer-motion"

const Header = ({ onOpenModal }) => {
  const handleSignOut = () => {
    localStorage.clear() // Clear local storage on sign out
  }

  return (
    <motion.div
      className="flex justify-between items-center mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <motion.h1
        className="text-2xl font-semibold text-emerald-800 flex items-center"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2 text-emerald-600"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ rotate: -180, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </motion.svg>
        Enter Place Information
      </motion.h1>
      <motion.div
        className="flex gap-3"
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <motion.button
          type="button"
          className="p-2 rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors duration-300"
          aria-label="View Records"
          onClick={onOpenModal}
          title="View Records"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="8" y1="6" x2="21" y2="6"></line>
            <line x1="8" y1="12" x2="21" y2="12"></line>
            <line x1="8" y1="18" x2="21" y2="18"></line>
            <line x1="3" y1="6" x2="3.01" y2="6"></line>
            <line x1="3" y1="12" x2="3.01" y2="12"></line>
            <line x1="3" y1="18" x2="3.01" y2="18"></line>
          </svg>
        </motion.button>
        <NavLink to="/">
          <motion.button
            type="button"
            className="p-2 rounded-full bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors duration-300"
            aria-label="Sign Out"
            onClick={handleSignOut}
            title="Sign Out"
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
              <polyline points="16 17 21 12 16 7"></polyline>
              <line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
          </motion.button>
        </NavLink>
      </motion.div>
    </motion.div>
  )
}

export default Header

