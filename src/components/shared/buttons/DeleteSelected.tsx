"use client";

import React, { useState } from "react";
import ConfirmationModal from "@/components/shared/buttons/ConfirmModal";
import Image from "next/image";

interface DeleteSelectedProps {
  selectedIds: string[];
  type: "staff" | "user";
  deleteAction: (formData: FormData) => Promise<void>;
  onSuccess?: () => void;
}

const DeleteSelected: React.FC<DeleteSelectedProps> = ({
  selectedIds,
  type,
  deleteAction,
  onSuccess,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleDelete = async () => {
    setModalOpen(false);

    try {
      // Delete each selected item
      for (const id of selectedIds) {
        const formData = new FormData();
        formData.append("id", id);
        formData.append("type", type);
        await deleteAction(formData);
      }

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error deleting items:", error);
    }
  };

  if (selectedIds.length === 0) return null;

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="flex items-center gap-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        <Image
          src="/table_icons/delete.png"
          alt="Delete"
          width={20}
          height={20}
        />
        Delete Selected ({selectedIds.length})
      </button>

      <ConfirmationModal
        isOpen={isModalOpen}
        message={`Are you sure you want to delete ${selectedIds.length} selected ${type}(s)?`}
        onConfirm={handleDelete}
        onCancel={() => setModalOpen(false)}
      />
    </>
  );
};

export default DeleteSelected;
