import React, { useState } from "react";
import { useDropzone, FileWithPath, Accept } from "react-dropzone";
import { CloudArrowUpIcon } from "@heroicons/react/24/solid";
import axios from "axios";

interface PhotoUploadModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [uploadMessage, setUploadMessage] = useState<string>("");

  const onDrop = (acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      setUploadMessage("Please select files to upload.");
      return;
    }

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("photos", file);
    });

    try {
      const response = await axios.post(
        "http://localhost:8001/api/admin/order/upload/2ec66367-8107-4e55-a197-8c6944e79706",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadMessage(
        `Files uploaded successfully: ${response.data.files.count} files`
      );
    } catch (error) {
      setUploadMessage("Error uploading files.");
      console.error(error);
    }
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: true,
    accept: {
      "image/*": [],
    },
  });

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white p-8 rounded-lg w-96">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Upload Photos</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700"
          >
            X
          </button>
        </div>
        <div className="mt-4">
          <div
            {...getRootProps()}
            className="border-dashed border-2 p-6 text-center cursor-pointer relative"
          >
            <div className="flex justify-center mb-4">
              <CloudArrowUpIcon className="h-12 w-12 text-gray-500" />
            </div>
            <input {...getInputProps()} />

            <p className="text-gray-500">
              Drag & Drop or Click to Select Files
            </p>
          </div>
          <div className="mt-4">
            <ul>
              {files.map((file, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{file.name}</span>
                  <span>{(file.size / 1024).toFixed(2)} KB</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
        {uploadMessage && <p className="mt-4 text-center">{uploadMessage}</p>}
      </div>
    </div>
  );
};

export default PhotoUploadModal;
