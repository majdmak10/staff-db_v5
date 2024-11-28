"use client";

import React, { useState } from "react";
import ConfirmationModal from "@/components/staff/DeleteStaff/ConfirmModal";

interface DeleteButtonProps {
  id: string;
  type: "staff" | "admin";
  deleteAction: (formData: FormData) => Promise<void>;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  id,
  type,
  deleteAction,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleDelete = async () => {
    setModalOpen(false);

    const formData = new FormData();
    formData.append("id", id);
    formData.append("type", type);

    await deleteAction(formData);
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
        message={`Are you sure you want to delete this ${type}?`}
        onConfirm={handleDelete}
        onCancel={() => setModalOpen(false)}
      />
    </>
  );
};

export default DeleteButton;
