"use client";

import React, { useState } from "react";
import ConfirmationModal from "@/components/shared/buttons/ConfirmModal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DeleteActionResult } from "@/lib/actions"; // Adjust the import path as needed

interface DeleteButtonProps {
  id: string;
  type: "staff" | "user";
  deleteAction: (formData: FormData) => Promise<DeleteActionResult>;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  id,
  type,
  deleteAction,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const formData = new FormData();
      formData.append("id", id);
      formData.append("type", type);

      const result = await deleteAction(formData);

      if (result.success) {
        // Refresh the correct page based on the type
        if (type === "user") {
          router.refresh();
          window.location.href = "/dashboard/admins";
        } else if (type === "staff") {
          router.refresh();
          window.location.href = "/dashboard/staff";
        }
        router.refresh(); // Ensures the current page's data is reloaded
      } else {
        console.error("Failed to delete", result.error);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsDeleting(false);
      setModalOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        title="Delete"
        disabled={isDeleting}
      >
        <Image
          src="/table_icons/delete.png"
          alt="Delete"
          width={20}
          height={20}
          title="Delete"
        />
      </button>

      <ConfirmationModal
        isOpen={isModalOpen}
        message={`Are you sure you want to delete this ${
          type === "user" ? "admin" : "staff"
        }?`}
        onConfirm={handleDelete}
        onCancel={() => setModalOpen(false)}
      />
    </>
  );
};

export default DeleteButton;
