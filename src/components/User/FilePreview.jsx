const FilePreview = ({ previewUrl, onFileChange, fileInputRef }) => (
  <div className="space-y-6">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Preview
      </label>
      <div className="mt-2 relative aspect-square rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-gray-500 text-sm">
            Image preview will appear here.
          </span>
        )}
      </div>
    </div>
    <div>
      <input
        id="fileUpload"
        type="file"
        ref={fileInputRef}
        onChange={onFileChange}
        className="file-input file-input-bordered w-full"
        accept="image/*"
      />
    </div>
  </div>
);

export default FilePreview;
