const ErrorPopup = ({
  message,
  isVisible,
  onClose,
}: {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}) => {
  return (
    <div
      className={`${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-5 pointer-events-none"
      } z-50 animate-shake fixed electrolize text-md font-bold flex items-center bottom-0 right-0 mb-10 mr-20 px-3 py-3 rounded-lg border-red-400/30 border backdrop-blur-xs bg-red-400/15 cursor-pointer hover:opacity-70`}
      onClick={onClose}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="#ff646723"
        viewBox="0 0 48 48"
        id="Alert--Streamline-Ionic-Filled"
        height="18"
        width="18"
        className="mr-2"
      >
        <desc>Alert Streamline Icon: https://streamlinehq.com</desc>
        <path
          stroke="#ff6467"
          fill-rule="evenodd"
          d="M24 0.48c-2.008 0 -4.0538 1.6754 -3.9178 4.0168l0.9782 26.4091c0.0118 0.7632 0.3202 1.4925 0.8608 2.0331 0.5512 0.5511 1.2991 0.861 2.0788 0.861s1.5275 -0.3099 2.0789 -0.861c0.5405 -0.5406 0.8488 -1.2698 0.8607 -2.0331l0.9782 -26.4091C28.0538 2.1554 26.008 0.48 24 0.48Zm-0.0384 3.9489v0.0001s0.0001 -0.0002 0.0004 -0.0006c-0.0003 0.0002 -0.0004 0.0004 -0.0004 0.0005Zm0.0383 35.2511c-2.1649 0 -3.9201 1.755 -3.9201 3.92 0 2.1649 1.7552 3.92 3.9201 3.92s3.92 -1.7551 3.92 -3.92 -1.7551 -3.92 -3.92 -3.92Z"
          clip-rule="evenodd"
          stroke-width="1"
        ></path>
      </svg>

      <p className="mr-2">{message}</p>
      <div className="absolute -top-2.25 right-2 p-0.2 rounded-4xl border-red-400/30 border bg-red-950 ">
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
            stroke="#ff64674d"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="0.8333"
            d="M5 5 2.916666666666667 2.916666666666667m2.0833333333333335 2.0833333333333335 2.0833333333333335 2.0833333333333335m-2.0833333333333335 -2.0833333333333335 2.0833333333333335 -2.0833333333333335m-2.0833333333333335 2.0833333333333335 -2.0833333333333335 2.0833333333333335"
          ></path>
        </svg>
      </div>
    </div>
  );
};

export default ErrorPopup;
