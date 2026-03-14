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
    containerStyle: "animate-rise font-normal bg-gray-400/20 border-white/20",
    closeIcon: "border-white/30 bg-neutral-950 stroke-white/30",
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
      className={`max-sm:bottom-5 max-sm:mx-auto max-sm:left-0 max-sm:right-0 max-sm:w-fit ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-10 pointer-events-none"
      } z-50 fixed text-base electrolize flex items-center bottom-10 sm:right-0 sm:mr-20 px-3 py-3 rounded-lg backdrop-blur-xs border duration-400 ${cfg.containerStyle} cursor-pointer hover:opacity-70`}
      onClick={onClose}
    >
      {type === "error" ? (
        <ToastErrorIcon />
      ) : type === "success" ? (
        <ToastSuccessIcon />
      ) : (
        <ToastInfoIcon />
      )}

      <p className="mr-2 max-sm:text-xs">{message}</p>
      <div
        className={`absolute max-sm:-top-1.75 max-sm:right-1.75 -top-2.25 right-2 p-0.2 rounded-4xl border ${cfg.closeIcon}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 10 10"
          fill="none"
          id="Close--Streamline-Majesticons"
          height="16"
          width="16"
          className="max-sm:size-2.75 "
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
