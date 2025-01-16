import Image from "next/image";

interface DeleteSelectedButtonProps {
  show: boolean;
}

const DeleteSelectedButton: React.FC<DeleteSelectedButtonProps> = ({
  show,
}) => {
  if (!show) return null;

  return (
    <button
      className="p-1 hover:rounded-full hover:bg-red-200"
      aria-label="Delete"
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
