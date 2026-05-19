import { memo } from "react";

const ThinSimpleArrowIcon = memo(function ThinSimpleArrowIcon({
  className = "size-4 text-black duration-200",
  isActive,
  rotate,
  strokeWidth = "2",
}: {
  className?: string;
  isActive?: boolean;
  rotate?: string;
  strokeWidth?: string;
}) {
  return (
    <svg
      className={`${className} ${isActive ? `${rotate}` : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M19 9l-7 7-7-7"
      ></path>
    </svg>
  );
});

export default ThinSimpleArrowIcon;
