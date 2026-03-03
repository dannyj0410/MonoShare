import { memo } from "react";

const ActiveItemIcon = memo(function ActiveItemIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="#76c4ff"
      className="bi bi-three-dots"
      viewBox="0 0 16 16"
      id="Three-Dots--Streamline-Bootstrap"
      height="16"
      width="16"
    >
      <desc>Three Dots Streamline Icon: https://streamlinehq.com</desc>
      <path
        d="M3 9.5a1.5 1.5 0 1 1 0 -3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0 -3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0 -3 1.5 1.5 0 0 1 0 3"
        strokeWidth="1"
      ></path>
    </svg>
  );
});

export default ActiveItemIcon;
