const TextAreaField = ({ id, label, placeholder, icon }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-emerald-700 mb-1"
    >
      {label}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute top-3 left-3 flex items-start pointer-events-none">
          {icon}
        </div>
      )}
      <textarea
        id={id}
        className={`${icon ? 'pl-10' : 'pl-4'} w-full px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent min-h-[120px]`}
        placeholder={placeholder}
      ></textarea>
    </div>
  </div>
);

export default TextAreaField;