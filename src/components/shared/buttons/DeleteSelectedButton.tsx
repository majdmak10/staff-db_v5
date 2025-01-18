import React, { useState } from "react";
import ConfirmationModal from "@/components/shared/buttons/ConfirmModal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { DeleteActionResult } from "@/lib/actions";

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
        // Convert error to a string if it exists
        const errorString =
          typeof result.error === "string"
            ? result.error
            : result.error instanceof Error
            ? result.error.message
            : "An unknown error occurred.";
        setErrorMessage(errorString);
        setModalOpen(true);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsDeleting(false);
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
          width={36}
          height={36}
          className="md:w-5 md:h-5"
        />
      </button>

      <ConfirmationModal
        isOpen={isModalOpen}
        message={
          errorMessage ||
          `Are you sure you want to delete the selected ${selectedIds.length} ${
            type === "user" ? "admin(s)" : "staff"
          }?`
        }
        onConfirm={errorMessage ? undefined : handleDelete}
        onCancel={() => {
          setModalOpen(false);
          setErrorMessage(null);
        }}
        showOnlyCancel={!!errorMessage}
      />
    </>
  );
};

export default DeleteSelectedButton;
