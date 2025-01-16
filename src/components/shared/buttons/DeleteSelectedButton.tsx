import React, { useState } from "react";
import ConfirmationModal from "@/components/shared/buttons/ConfirmModal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DeleteActionResult } from "@/lib/actions"; // Adjust the import path as needed

interface DeleteSelectedButtonProps {
  selectedIds: string[];
  type: "staff" | "user";
  deleteAction: (formData: FormData) => Promise<DeleteActionResult>;
  show: boolean;
}

const DeleteSelectedButton: React.FC<DeleteSelectedButtonProps> = ({
  selectedIds,
  type,
  deleteAction,
  show,
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  if (!show || selectedIds.length === 0) return null;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      const formData = new FormData();
      formData.append("type", type);
      formData.append("ids", JSON.stringify(selectedIds)); // Sending selected IDs as a JSON array

      const result = await deleteAction(formData);

      if (result.success) {
        router.refresh(); // Ensures the current page's data is reloaded
        if (type === "user") {
          window.location.href = "/dashboard/admins";
        } else if (type === "staff") {
          window.location.href = "/dashboard/staff";
        }
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
        className="p-1 hover:rounded-full hover:bg-red-200"
        aria-label="Delete Selected"
        disabled={isDeleting}
      >
        <Image
          src="/table_icons/delete.png"
          alt="Delete Selected"
          width={20}
          height={20}
        />
      </button>

      <ConfirmationModal
        isOpen={isModalOpen}
        message={`Are you sure you want to delete the selected ${
          selectedIds.length
        } ${type === "user" ? "admin(s)" : "staff"}?`}
        onConfirm={handleDelete}
        onCancel={() => setModalOpen(false)}
      />
    </>
  );
};

export default DeleteSelectedButton;
