import { memo } from "react";

const CheckmarkIcon = memo(function CheckmarkIcon({
  className = "stroke-(--white) size-4",
}: {
  className?: string;
}) {
  return (
    <svg
      fill="none"
      strokeWidth="0"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M5 13l4 4L19 7"
      ></path>
    </svg>
  );
});

export default CheckmarkIcon;
