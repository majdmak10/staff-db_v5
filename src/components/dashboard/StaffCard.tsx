import Image from "next/image";
import Link from "next/link";

interface StaffCardProps {
  iconSrc: string;
  title: string;
  number: number | null;
  link: string;
  altText: string;
  textColor: string;
}

const StaffCard = ({
  iconSrc,
  title,
  number,
  link,
  altText,
  textColor,
}: StaffCardProps) => {
  return (
    <div className="rounded-lg bg-white p-6 flex flex-1 items-center w-full lg:w-1/3">
      <div className="flex-shrink-0">
        <Image src={iconSrc} alt={altText} width={40} height={40} />
      </div>
      <div className="ml-3 flex flex-col">
        <Link
          href={link}
          className={`no-underline hover:underline mb-2 ${textColor}`}
        >
          <span>{title}</span>
        </Link>
        <span className={`${textColor}`}>
          {number !== null ? number : "Loading..."}
        </span>
      </div>
    </div>
  );
};

export default StaffCard;
