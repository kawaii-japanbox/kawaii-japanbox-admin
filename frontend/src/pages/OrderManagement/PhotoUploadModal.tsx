import React, { useEffect, useState } from "react";
import { useDropzone, FileWithPath } from "react-dropzone";
import {
  CloudArrowUpIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { deleteUploadedFile, uploadFiles } from "../../api/api";
import { PhotoUploadModalProps, Image } from "./interface";
import "../../styles/orders.css";

const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({
  isOpen,
  setIsModalOpen,
  orderId,
}) => {
  const [files, setFiles] = useState<FileWithPath[]>([]);
  const [uploadMessage, setUploadMessage] = useState<string>("");
  const [uploadedImages, setUploadedImages] = useState<Image[]>([]);

  useEffect(() => {
    if (orderId) {
      setFiles([]);
      setUploadMessage("");
      setUploadedImages([]);
    }
  }, [orderId, isOpen]);

  const handleCloseModal = () => setIsModalOpen(false);

  const onDrop = (acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
  };

  const handleDeleteUploaded = async (id: string, url: string) => {
    try {
      await deleteUploadedFile({ imageId: id, url });
      setUploadedImages((prevImages) =>
        prevImages.filter((img) => img.id !== id)
      );
    } catch (error) {
      console.error("Error deleting uploaded file", error);
    }
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
      const response = await uploadFiles({ orderId, formData });
      setUploadMessage(`Files uploaded successfully: ${response.count} files`);
      setUploadedImages((prev) => [...prev, ...response.images]);
      setFiles([]);
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
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Upload Photos</h2>
          <button onClick={handleCloseModal} className="close-button">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="mt-4">
          <div {...getRootProps()} className="dropzone">
            <div className="flex justify-center mb-4">
              <CloudArrowUpIcon className="dropzone-icon" />
            </div>
            <input {...getInputProps()} />

            <p className="dropzone-text">
              Drag & Drop or Click to Select Files
            </p>
          </div>
          <div className="mt-4">
            <ul>
              {files.map((file, index) => (
                <li key={index} className="file-item">
                  <span>{file.name}</span>
                  <span>{(file.size / 1024).toFixed(2)} KB</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex justify-end mt-4 font-inter">
          <button className="upload-button" onClick={handleUpload}>
            Upload
          </button>
        </div>
        {uploadMessage && <p className="upload-message">{uploadMessage}</p>}
        {/* Uploaded images gallery */}
        {uploadedImages.length > 0 && (
          <div className="mt-6">
            <div className="image-grid">
              {uploadedImages.map((img, index) => (
                <div key={img.id} className="relative group">
                  <img
                    src={img.url}
                    alt={`Uploaded ${img.id}`}
                    className="image"
                  />
                  <button
                    onClick={() => handleDeleteUploaded(img.id, img.url)}
                    className="delete-button"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoUploadModal;
