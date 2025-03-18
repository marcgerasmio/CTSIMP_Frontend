"use client"

import { motion } from "framer-motion"

const FilePreview = ({ previewUrl, onFileChange, fileInputRef }) => (
  <motion.div
    className="space-y-6"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: 0.4 }}
  >
    <div>
      <label className="block text-sm font-medium text-emerald-700 mb-1">Destination Image Preview</label>
      <motion.div
        className="mt-2 relative aspect-square rounded-lg overflow-hidden bg-emerald-50 flex items-center justify-center border-2 border-dashed border-emerald-300 shadow-sm"
        whileHover={{ boxShadow: "0 10px 25px -5px rgba(16, 185, 129, 0.2)" }}
        transition={{ duration: 0.3 }}
      >
        {previewUrl ? (
          <motion.img
            src={previewUrl || "/placeholder.svg"}
            alt="Preview"
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            layoutId="previewImage"
          />
        ) : (
          <motion.div
            className="text-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 text-emerald-400 mx-auto mb-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </motion.svg>
            <motion.span
              className="text-emerald-600 text-sm block"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Upload an image to see a preview here
            </motion.span>
            <motion.span
              className="text-emerald-500 text-xs block mt-1"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              Recommended: High-quality landscape photos
            </motion.span>
          </motion.div>
        )}
      </motion.div>
    </div>
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    >
      <label htmlFor="fileUpload" className="block text-sm font-medium text-emerald-700 mb-2">
        Upload Destination Image
      </label>
      <div className="relative">
        <input
          id="fileUpload"
          type="file"
          ref={fileInputRef}
          onChange={onFileChange}
          className="hidden"
          accept="image/*"
        />
        <motion.label
          htmlFor="fileUpload"
          className="flex items-center justify-center w-full px-4 py-3 border border-emerald-300 rounded-md bg-white hover:bg-emerald-50 text-emerald-700 cursor-pointer transition-colors duration-300"
          whileHover={{ scale: 1.02, backgroundColor: "rgb(236, 253, 245)" }}
          whileTap={{ scale: 0.98 }}
        >
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2 text-emerald-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ y: [0, -3, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", duration: 1.5 }}
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </motion.svg>
          {previewUrl ? "Change Image" : "Select Image"}
        </motion.label>
      </div>
      {previewUrl && (
        <motion.p
          className="mt-2 text-xs text-emerald-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Image selected. Click above to change.
        </motion.p>
      )}
    </motion.div>
  </motion.div>
)

export default FilePreview

