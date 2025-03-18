"use client"

import { motion } from "framer-motion"

const TextAreaField = ({ id, label, placeholder, icon, value, onChange, name, rows = 4 }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
    <label htmlFor={id} className="block text-sm font-medium text-emerald-700 mb-1">
      {label}
    </label>
    <div className="relative">
      {icon && <div className="absolute top-3 left-3 flex items-start pointer-events-none">{icon}</div>}
      <motion.textarea
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        rows={rows}
        className={`${icon ? "pl-10" : "pl-4"} w-full px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300`}
        whileFocus={{ boxShadow: "0 0 0 3px rgba(16, 185, 129, 0.2)" }}
      />
    </div>
  </motion.div>
)

export default TextAreaField

