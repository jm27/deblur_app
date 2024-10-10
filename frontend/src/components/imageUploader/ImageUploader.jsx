import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { validateFileType, validateFileSize } from "../../utils/fileValidation";
import { submitImage } from "../../services/api";
import "./ImageUploader.css";

const ImageUploader = () => {
  const [fileError, setFileError] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [upscaledImage, setUpscaledImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const onDrop = (acceptedFiles, fileRejections) => {
    setFileError(null);
    setUpscaledImage(null);
    setImageFile(null);

    if (fileRejections.length) {
      setFileError(fileRejections[0].errors[0].message);
      return;
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];

      if (!validateFileType(file)) {
        setFileError("Invalid file type. Only .jpg or .png files are allowed.");
        return;
      }
      if (!validateFileSize(file)) {
        setFileError("File is too large. Max size is 5MB.");
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageSubmit = async () => {
    if (!imageFile) {
      setFileError("No image selected.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await submitImage(imageFile);
      setUpscaledImage(response.image);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    maxFiles: 1,
    maxSize: 5242880, // 5MB
    multiple: false, // Single file upload
  });

  return (
    <div className="image-uploader-container">
      <div
        {...getRootProps({
          className: `dropzone ${isDragActive ? "active" : ""}`,
        })}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop an image here, or click to select an image</p>
        <p className="file-requirements">Only .jpg or .png, max size 5MB</p>
      </div>
      {fileError && <p className="error-message">{fileError}</p>}
      {uploadedImage && (
        <div className="preview-container">
          <h4>Original Image Preview:</h4>
          <img
            src={uploadedImage}
            alt="uploaded preview"
            className="image-preview"
          />
        </div>
      )}

      {
        <button
          disabled={!uploadedImage || isLoading}
          className="submit-button"
          onClick={handleImageSubmit}
        >
          Upscale Image
        </button>
      }

      {isLoading && (
        <p className="loading-message">Upscaling in progress, please wait...</p>
      )}

      {upscaledImage && (
        <div className="preview-container">
          <h4>Upscaled Image: </h4>
          <img
            src={upscaledImage}
            alt="upscaled preview"
            className="image-preview"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
