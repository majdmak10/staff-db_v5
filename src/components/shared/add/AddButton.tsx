import Image from "next/image";
import Link from "next/link";

const AddButton: React.FC = () => {
  return (
    <div>
      <Link href="/dashboard/staff/add">
        <button className="bg-mBlue rounded-full p-2" title="Add Staff">
          <Image
            src="/table_icons/add.png"
            alt="Add Staff"
            width={16}
            height={16}
            title="Add Staff"
          />
        </button>
      </Link>
    </div>
  );
};

export default AddButton;
