import { IconType } from "react-icons/lib";

export default function GraphButton({
  text,
  Icon,
  backgroundColor,
  hoverColor,
  iconColor,
  textColor,
  onClick,
}: {
  text: string;
  Icon: IconType;
  backgroundColor: string;
  hoverColor: string;
  iconColor: string;
  textColor: string;

  onClick: () => void;
}) {
  return (
    <button
      className={` flex  max-w-[300px]  ${hoverColor} justify-center  items-center py-4 px-4 rounded-md gap-4 ${backgroundColor}`}
      onClick={onClick}
    >
      <Icon className="size-6 " color={iconColor}></Icon>
      <p className={`${textColor} text-lg`}>{text}</p>
    </button>
  );
}
