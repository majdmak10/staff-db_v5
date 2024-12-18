"use client";

import Image from "next/image";
import React, { useState, useRef } from "react";

interface UploadPictureProps {
  label?: string;
  id?: string;
  name?: string;
  accept?: string;
  uploadIcon?: string; // New prop for the upload icon image source
}

const UploadPicture: React.FC<UploadPictureProps> = ({
  label = "Profile Picture",
  id = "profilePicture",
  name = "profilePicture",
  accept = "image/*",
  uploadIcon = "/table_icons/cloud-c.png",
}) => {
  const [fileName, setFileName] = useState<string>("No chosen picture");
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const name = file.name;
      const truncatedName =
        name.length > 15 ? `${name.slice(0, 20)}...${name.slice(-10)}` : name;
      setFileName(truncatedName);
      setFilePreview(URL.createObjectURL(file));
    } else {
      clearFile();
    }
  };

  const clearFile = () => {
    setFileName("No chosen picture");
    setFilePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input
    }
  };

  return (
    <div className="flex flex-col w-full gap-2">
      <label htmlFor={id} className="text-sm text-gray-500">
        {label}
      </label>

      <div className="flex flex-col px-1 ring-[1.5px] ring-gray-300 rounded-md hover:ring-mBlue focus:ring-mBlue focus:outline-none transition-all duration-200">
        <div className="flex items-center gap-2 text-sm w-full h-10">
          <label htmlFor={id} className="cursor-pointer">
            <Image
              src={uploadIcon}
              alt="Upload"
              className="w-7 h-7 object-contain hover:opacity-80 transition duration-200"
              width={32}
              height={32}
            />
          </label>
          <div className="flex items-center gap-2 text-sm text-gray-500 flex-grow">
            <span>{fileName}</span>
            {filePreview && (
              <button
                type="button"
                onClick={clearFile}
                className="text-red-500 hover:text-red-600 ml-auto mr-2"
                aria-label="Clear Picture"
              >
                ✖
              </button>
            )}
          </div>
        </div>

        {filePreview && (
          <Image
            src={filePreview}
            alt="Profile Thumbnail"
            className="mt-2 mb-2 ml-1 w-24 h-24 rounded-full object-cover"
            width={96}
            height={96}
          />
        )}

        <input
          type="file"
          id={id}
          name={name}
          accept={accept}
          aria-label={label}
          className="hidden"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
      </div>
    </div>
  );
};

export default UploadPicture;
