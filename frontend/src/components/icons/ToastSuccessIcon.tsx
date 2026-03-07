import { memo } from "react";

const ToastSuccessIcon = memo(function ToastSuccessIcon() {
  return (
    <svg
      stroke="#34D399"
      fill="none"
      strokeWidth="0"
      viewBox="0 0 24 24"
      height="20"
      width="20"
      xmlns="http://www.w3.org/2000/svg"
      className="mr-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="M5 13l4 4L19 7"
      ></path>
    </svg>
  );
});

export default ToastSuccessIcon;
