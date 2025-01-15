"use client";

import React, { useState } from "react";
import ConfirmationModal from "@/components/shared/buttons/ConfirmModal";
import Image from "next/image";

interface DeleteSelectedButtonProps {
  selectedIds: string[];
  type: "staff" | "user";
  deleteAction: (
    formData: FormData
  ) => Promise<{ success: boolean; error?: string }>;
  onSuccess?: () => void;
}

const DeleteSelectedButton: React.FC<DeleteSelectedButtonProps> = ({
  selectedIds,
  type,
  deleteAction,
  onSuccess,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleDelete = async () => {
    setModalOpen(false);

    try {
      console.log("Deleting selected IDs:", selectedIds); // Debug log
      for (const id of selectedIds) {
        if (!id) {
          console.error("Encountered undefined id during deletion.");
          continue;
        }

        const formData = new FormData();
        formData.append("id", id);
        formData.append("type", type);

        const result = await deleteAction(formData);

        if (!result.success) {
          console.error(`Failed to delete ${id}:`, result.error);
          alert(`Error deleting item: ${result.error}`);
          return;
        }
      }

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

export default DeleteSelectedButton;
