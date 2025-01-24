import React, { useState } from "react";
import { ModalOpenProps } from "./interface";

const FileUploadModal: React.FC<ModalOpenProps> = ({
  isModalOpen,
  setIsModalOpen,
}) => {
  const [fileName, setFileName] = useState("");
  const [dragging, setDragging] = useState(false);

  // Handle file selection through browse
  const handleFileSelect = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  // Handle file drop
  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  // Handle drag over event
  const handleDragOver = (e: any) => {
    e.preventDefault();
    setDragging(true);
  };

  // Handle drag leave event
  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleCloseModal = () => setIsModalOpen(false);
  return (
    <div>
      {/* Modal overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          {/* Modal content */}
          <div className="bg-white p-6 rounded-lg w-96">
            <div
              className={`p-6 border-2 border-dashed rounded-lg ${
                dragging ? "border-blue-500" : "border-gray-300"
              } transition-all`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div className="text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-gray-500 mx-auto"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 10l5-5m0 0l5 5m-5-5v12"
                  />
                </svg>
                <h2 className="mt-4 text-xl text-gray-800">
                  Drag and Drop a File or Browse
                </h2>
                <p className="mt-2 text-sm text-gray-500">
                  Click to browse your files
                </p>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileSelect}
                  id="file-input"
                />
                <label
                  htmlFor="file-input"
                  className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
                >
                  Browse
                </label>
              </div>
              {fileName && (
                <div className="mt-4 text-center text-gray-600">
                  <p>Selected File: {fileName}</p>
                </div>
              )}
            </div>

            {/* Close modal button */}
            <div className="mt-4 text-center">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploadModal;
