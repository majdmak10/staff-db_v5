import Image from "next/image";
import { useTransition } from "react";
import { DeleteActionResult } from "@/lib/actions";

interface DeleteSelectedButtonProps {
  show: boolean;
  selectedIds: string[];
  deleteAction: (formData: FormData) => Promise<DeleteActionResult>;
  onDeleteComplete?: () => void;
}

const DeleteSelectedButton: React.FC<DeleteSelectedButtonProps> = ({
  show,
  selectedIds,
  deleteAction,
  onDeleteComplete,
}) => {
  const [isPending, startTransition] = useTransition();

  if (!show) return null;

  const handleDelete = () => {
    if (
      !confirm(
        `Are you sure you want to delete ${selectedIds.length} selected items?`
      )
    ) {
      return;
    }

    startTransition(async () => {
      try {
        // Delete each selected item
        const results = await Promise.all(
          selectedIds.map(async (id) => {
            const formData = new FormData();
            formData.append("id", id);
            return deleteAction(formData);
          })
        );

        // Check if all deletions were successful
        const allSuccessful = results.every((result) => result.success);

        if (allSuccessful) {
          onDeleteComplete?.();
        } else {
          console.error("Some items failed to delete");
          alert("Some items could not be deleted. Please try again.");
        }
      } catch (error) {
        console.error("Error deleting items:", error);
        alert("An error occurred while deleting items. Please try again.");
      }
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="p-1 hover:rounded-full hover:bg-red-200 transition-colors duration-200 disabled:opacity-50"
      aria-label="Delete selected items"
    >
      <Image
        src="/table_icons/delete.png"
        alt="Delete"
        width={20}
        height={20}
      />
    </button>
  );
};

export default DeleteSelectedButton;
