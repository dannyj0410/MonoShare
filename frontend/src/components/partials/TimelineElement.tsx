type TimelineStatus =
  | "created"
  | "expires"
  | "wouldExpire"
  | "expired"
  | "viewed";

const TIMELINE_CONFIG = {
  created: {
    label: "Created",
    border: "border-(--main-light-blue)",
    fill: "",
    glow: "",
  },
  expires: {
    label: "Expires in:",
    border: "border-(--main-light-blue)",
    fill: "bg-blue-200/20",
    glow: "",
  },
  wouldExpire: {
    label: "Would expire in:",
    border: "border-(--main-light-blue)",
    fill: "bg-blue-200/20",
    glow: "",
  },
  expired: {
    label: "Expired",
    border: "border-red-500",
    fill: "bg-red-500/20",
    glow: "shadow-[0px_0px_30px_1px_#fb2c3659]",
  },
  viewed: {
    label: "Viewed and ",
    border: "border-(--main-light-blue)",
    fill: "bg-blue-200/20",
    glow: "shadow-[0px_0px_30px_3px_#76c4ff] animate-glow",
  },
} as const;

const WAVE_CLIP_PATH =
  "polygon(100% 100%, 0% 100% , 0.00% 15.19%, 2.00% 14.74%, 4.00% 14.16%, 6.00% 13.46%, 8.00% 12.68%, 10.00% 11.83%, 12.00% 10.95%, 14.00% 10.08%, 16.00% 9.23%, 18.00% 8.44%, 20.00% 7.74%, 22.00% 7.15%, 24.00% 6.70%, 26.00% 6.40%, 28.00% 6.26%, 30.00% 6.28%, 32.00% 6.47%, 34.00% 6.82%, 36.00% 7.32%, 38.00% 7.94%, 40.00% 8.66%, 42.00% 9.47%, 44.00% 10.33%, 46.00% 11.22%, 48.00% 12.09%, 50.00% 12.92%, 52.00% 13.68%, 54.00% 14.34%, 56.00% 14.89%, 58.00% 15.29%, 60.00% 15.54%, 62.00% 15.62%, 64.00% 15.55%, 66.00% 15.30%, 68.00% 14.90%, 70.00% 14.37%, 72.00% 13.71%, 74.00% 12.95%, 76.00% 12.12%, 78.00% 11.25%, 80.00% 10.37%, 82.00% 9.50%, 84.00% 8.69%, 86.00% 7.96%, 88.00% 7.34%, 90.00% 6.84%, 92.00% 6.48%, 94.00% 6.29%, 96.00% 6.26%, 98.00% 6.39%, 100.00% 6.69%)";

const TimelineElement = ({
  timelinePoint,
  time,
  timePassedPercent,
  dashed,
  faded,
  extraInfo,
}: {
  timelinePoint: TimelineStatus;
  time: string;
  timePassedPercent?: string;
  dashed?: boolean;
  faded?: boolean;
  extraInfo?: string;
}) => {
  const cfg = TIMELINE_CONFIG[timelinePoint];
  const dashedBorder =
    timelinePoint === "expires"
      ? "border-(--gray)"
      : timelinePoint === "wouldExpire"
        ? "border-(--gray)"
        : timelinePoint === "expired"
          ? "border-red-400/60"
          : timelinePoint === "viewed"
            ? "border-(--main-light-blue)"
            : "";

  const getFillHeight = () => {
    if (timelinePoint === "expired" || timelinePoint === "viewed")
      return "100%";
    if (timelinePoint === "expires" || timelinePoint === "wouldExpire")
      return `${Number(timePassedPercent) + 5}%`;
    return "0%";
  };

  return (
    <>
      {dashed && (
        <div
          className={`opacity-70 border-l-2 border-dashed h-12 ml-8 w-3 ${dashedBorder}`}
        />
      )}

      <div className={`flex items-center gap-4 ${faded && "opacity-60"}`}>
        <div
          className={`relative flex h-16 w-16 items-center justify-center rounded-3xl border-4 overflow-hidden
            ${cfg.border}
            ${cfg.glow}`}
        >
          {timelinePoint !== "created" && (
            <div
              className={`absolute bottom-0 w-20 flex justify-center items-center ${cfg.fill}
                ${
                  (timelinePoint === "expires" ||
                    timelinePoint === "wouldExpire") &&
                  Number(timePassedPercent) < 99 &&
                  "wave-animation"
                }`}
              style={
                (timelinePoint === "expires" ||
                  timelinePoint === "wouldExpire") &&
                Number(timePassedPercent) < 99
                  ? { clipPath: WAVE_CLIP_PATH, height: getFillHeight() }
                  : { height: getFillHeight() }
              }
            />
          )}

          <Icon status={timelinePoint} />
        </div>

        <div className="flex flex-col">
          {timelinePoint !== "viewed" && (
            <h1
              className={`electrolize ${
                timelinePoint === "expired" && "text-red-500"
              }`}
            >
              {Number(timePassedPercent) < 100 || !timePassedPercent
                ? `${cfg.label}`
                : "Would have"}{" "}
              {extraInfo && (
                <span
                  className={`${Number(timePassedPercent) < 90 || !timePassedPercent ? "text-(--main-light-blue)" : "text-red-400/80"}`}
                >
                  {Number(timePassedPercent) < 100 || !timePassedPercent
                    ? `${extraInfo}`
                    : "Expired"}
                </span>
              )}
            </h1>
          )}

          {timelinePoint === "viewed" && (
            <h1 className="electrolize">
              <span className="text-green-500">Viewed</span> and{" "}
              <span className="text-red-500">Erased</span>
            </h1>
          )}

          <p
            className={`${
              timelinePoint === "expired" ? "text-red-400/50" : "text-(--gray)"
            }`}
          >
            {time}
          </p>
        </div>
      </div>
    </>
  );
};

export default TimelineElement;

const Icon = ({ status }: { status: string }) => {
  if (status === "created")
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 16 16"
        id="Plus--Streamline-Font-Awesome"
        height="24"
        width="24"
      >
        <desc>Plus Streamline Icon: https://streamlinehq.com</desc>
        <path
          d="M9.20615357142857 1.3661535714285713C9.20615357142857 0.699 8.667153571428571 0.16 8 0.16s-1.2061535714285714 0.539 -1.2061535714285714 1.2061535714285714v5.4276928571428575H1.3661535714285713C0.699 6.793846428571428 0.16 7.332846428571429 0.16 8s0.539 1.2061535714285714 1.2061535714285714 1.2061535714285714h5.4276928571428575v5.4276928571428575c0 0.6671535714285713 0.539 1.2061535714285714 1.2061535714285714 1.2061535714285714s1.2061535714285714 -0.539 1.2061535714285714 -1.2061535714285714V9.20615357142857h5.4276928571428575c0.6671535714285713 0 1.2061535714285714 -0.539 1.2061535714285714 -1.2061535714285714s-0.539 -1.2061535714285714 -1.2061535714285714 -1.2061535714285714H9.20615357142857V1.3661535714285713Z"
          fill="#76c4ff"
          strokeWidth="0.0357"
        ></path>
      </svg>
    );

  if (status === "expires" || status === "wouldExpire")
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        id="Remove-Bold--Streamline-Ultimate"
        height="24"
        width="24"
      >
        <desc>Remove Bold Streamline Icon: https://streamlinehq.com</desc>
        <path
          d="M22.66 5.58a1.5 1.5 0 0 0 0 -2.12l-2.12 -2.12a1.49 1.49 0 0 0 -2.12 0l-6.24 6.24a0.27 0.27 0 0 1 -0.36 0L5.58 1.34a1.49 1.49 0 0 0 -2.12 0L1.34 3.46a1.5 1.5 0 0 0 0 2.12l6.24 6.24a0.25 0.25 0 0 1 0 0.36l-6.24 6.24a1.5 1.5 0 0 0 0 2.12l2.12 2.12a1.49 1.49 0 0 0 2.12 0l6.24 -6.24a0.27 0.27 0 0 1 0.36 0l6.24 6.24a1.47 1.47 0 0 0 1.06 0.44 1.45 1.45 0 0 0 1.06 -0.44l2.12 -2.12a1.5 1.5 0 0 0 0 -2.12l-6.24 -6.24a0.25 0.25 0 0 1 0 -0.36Z"
          fill="#76c4ff"
          strokeWidth="1"
        ></path>
      </svg>
    );

  if (status === "expired")
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        id="Remove-Bold--Streamline-Ultimate"
        height="24"
        width="24"
        className="z-20"
      >
        <desc>Remove Bold Streamline Icon: https://streamlinehq.com</desc>
        <path
          d="M22.66 5.58a1.5 1.5 0 0 0 0 -2.12l-2.12 -2.12a1.49 1.49 0 0 0 -2.12 0l-6.24 6.24a0.27 0.27 0 0 1 -0.36 0L5.58 1.34a1.49 1.49 0 0 0 -2.12 0L1.34 3.46a1.5 1.5 0 0 0 0 2.12l6.24 6.24a0.25 0.25 0 0 1 0 0.36l-6.24 6.24a1.5 1.5 0 0 0 0 2.12l2.12 2.12a1.49 1.49 0 0 0 2.12 0l6.24 -6.24a0.27 0.27 0 0 1 0.36 0l6.24 6.24a1.47 1.47 0 0 0 1.06 0.44 1.45 1.45 0 0 0 1.06 -0.44l2.12 -2.12a1.5 1.5 0 0 0 0 -2.12l-6.24 -6.24a0.25 0.25 0 0 1 0 -0.36Z"
          fill="#fb2c36"
          strokeWidth="1"
        ></path>
      </svg>
    );
  if (status === "viewed")
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        id="Sync-Saved-Locally-Fill--Streamline-Rounded-Fill-Material"
        height="24"
        width="24"
      >
        <desc>
          Sync Saved Locally Fill Streamline Icon: https://streamlinehq.com
        </desc>
        <path
          fill="#76c4ff"
          d="m10.925 11.575 -1.6 -1.6c-0.15 -0.15 -0.325 -0.22085 -0.525 -0.2125 -0.2 0.00835 -0.375 0.0875 -0.525 0.2375 -0.15 0.15 -0.225 0.325 -0.225 0.525s0.075 0.375 0.225 0.525l2.125 2.125c0.15 0.15 0.325 0.225 0.525 0.225s0.375 -0.075 0.525 -0.225l4.55 -4.25c0 -0.18335 -0.01665 -0.37085 -0.05 -0.5625 -0.03335 -0.19165 -0.11665 -0.35415 -0.25 -0.4875 -0.15 -0.15 -0.32915 -0.225 -0.5375 -0.225 -0.20835 0 -0.3875 0.075 -0.5375 0.225l-3.7 3.7ZM1 21v-1.5h21.25c0.21665 0 0.39585 0.07085 0.5375 0.2125S23 20.03335 23 20.25c0 0.21665 -0.07085 0.39585 -0.2125 0.5375S22.46665 21 22.25 21H1Zm2.5 -3c-0.4 0 -0.75 -0.15 -1.05 -0.45 -0.3 -0.3 -0.45 -0.65 -0.45 -1.05V4.5c0 -0.4 0.15 -0.75 0.45 -1.05C2.75 3.15 3.1 3 3.5 3h17c0.4 0 0.75 0.15 1.05 0.45 0.3 0.3 0.45 0.65 0.45 1.05v12c0 0.4 -0.15 0.75 -0.45 1.05 -0.3 0.3 -0.65 0.45 -1.05 0.45H3.5Z"
          strokeWidth="0.5"
        ></path>
      </svg>
    );
};
