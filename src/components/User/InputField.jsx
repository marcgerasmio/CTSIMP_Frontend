const InputField = ({ id, label, placeholder, type = "text", icon }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-emerald-700 mb-1"
    >
      {label}
    </label>
    <div className="relative">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className={`${icon ? 'pl-10' : 'pl-4'} w-full px-4 py-2 border border-emerald-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
      />
    </div>
  </div>
);

export default InputField;