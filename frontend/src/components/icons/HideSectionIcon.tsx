import { memo } from "react";

const HideSectionIcon = memo(function ({
  hideSection,
  iconClr = "text-(--white)",
}: {
  hideSection: boolean;
  iconClr?: string;
}) {
  return (
    <svg
      className={`w-4 h-4 duration-200 group-hover:opacity-100 opacity-0 absolute -left-5 ease-in-out ${iconClr} ${hideSection ? "-rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 9l-7 7-7-7"
      ></path>
    </svg>
  );
});

export default HideSectionIcon;
