const TextAreaField = ({ id, label, placeholder }) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <textarea
      id={id}
      className="textarea textarea-bordered w-full h-32"
      placeholder={placeholder}
    ></textarea>
  </div>
);

export default TextAreaField;
