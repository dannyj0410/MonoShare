import type { ToastType } from "../../../interfaces/toast.interface";
import ToastErrorIcon from "../../icons/ToastErrorIcon";
import ToastInfoIcon from "../../icons/ToastInfoIcon";
import ToastSuccessIcon from "../../icons/ToastSuccessIcon";

const TOAST_CONFIG = {
  error: {
    containerStyle: "animate-shake font-bold bg-red-400/15 border-red-400/30",
    closeIcon: "border-red-400/30 bg-red-950 stroke-[#ff64674d]",
  },
  success: {
    containerStyle:
      "animate-rise font-bold bg-emerald-400/15 border-emerald-400/30",
    closeIcon: "border-emerald-400/30 bg-emerald-950 stroke-[#00ffbc]",
  },
  info: {
    containerStyle: "animate-rise font-normal bg-[#37415170] border-[#374151]",
    closeIcon: "border-[#374151] bg-gray-950 stroke-[#374151]",
  },
};

const Toast = ({
  message,
  isVisible,
  onClose,
  type,
}: {
  message: string;
  isVisible: boolean;
  onClose: () => void;
  type: ToastType;
}) => {
  const cfg = TOAST_CONFIG[type];

  return (
    <div
      className={`${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-100 translate-y-5 pointer-events-none"
      } z-50 fixed text-base electrolize flex items-center bottom-0 right-0 mb-10 mr-20 px-3 py-3 rounded-lg backdrop-blur-xs border ${cfg.containerStyle} cursor-pointer hover:opacity-70`}
      onClick={onClose}
    >
      {type === "error" ? (
        <ToastErrorIcon />
      ) : type === "success" ? (
        <ToastSuccessIcon />
      ) : (
        <ToastInfoIcon />
      )}

      <p className="mr-2">{message}</p>
      <div
        className={`absolute -top-2.25 right-2 p-0.2 rounded-4xl border ${cfg.closeIcon}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 10 10"
          fill="none"
          id="Close--Streamline-Majesticons"
          height="16"
          width="16"
        >
          <desc>Close Streamline Icon: https://streamlinehq.com</desc>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.8333"
            d="M5 5 2.916666666666667 2.916666666666667m2.0833333333333335 2.0833333333333335 2.0833333333333335 2.0833333333333335m-2.0833333333333335 -2.0833333333333335 2.0833333333333335 -2.0833333333333335m-2.0833333333333335 2.0833333333333335 -2.0833333333333335 2.0833333333333335"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default Toast;
