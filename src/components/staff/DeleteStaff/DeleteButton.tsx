"use client";

import React, { useState } from "react";
import ConfirmationModal from "@/components/staff/DeleteStaff/ConfirmModal";

interface DeleteButtonProps {
  staffId: string;
  deleteStaff: (formData: FormData) => Promise<void>; // Accept the server action as a prop
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  staffId,
  deleteStaff,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleDelete = async () => {
    setModalOpen(false);

    const formData = new FormData();
    formData.append("id", staffId);

    await deleteStaff(formData);

    // Optionally, you can trigger a client-side action or revalidate the page:
    // window.location.reload(); // if necessary
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded text-xs"
      >
        Delete
      </button>
      <ConfirmationModal
        isOpen={isModalOpen}
        message="Are you sure you want to delete this staff member?"
        onConfirm={handleDelete}
        onCancel={() => setModalOpen(false)}
      />
    </>
  );
};

export default DeleteButton;
