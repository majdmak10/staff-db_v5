"use client";

import React, { useState } from "react";
import ConfirmationModal from "@/components/shared/buttons/ConfirmModal";
import Image from "next/image";

interface DeleteButtonProps {
  id: string;
  type: "staff" | "user";
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
      <button onClick={() => setModalOpen(true)} title="Delete">
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
        message={`Are you sure you want to delete this ${type}?`}
        onConfirm={handleDelete}
        onCancel={() => setModalOpen(false)}
      />
    </>
  );
};

export default DeleteButton;
