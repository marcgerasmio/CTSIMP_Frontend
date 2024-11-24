const InputField = ({ id, label, placeholder, type = "text" }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      className="input input-bordered w-full"
    />
  </div>
);

export default InputField;
