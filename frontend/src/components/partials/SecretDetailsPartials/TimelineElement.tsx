import TimelineElementIcon from "../../icons/TimelineElementIcon";

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
    if (timelinePoint === "expires" || timelinePoint === "wouldExpire") {
      if (Number(timePassedPercent) === 0) return "100%";
      return `${100 - (Number(timePassedPercent) + 5)}%`;
    } else return "100%";
  };

  return (
    <>
      {dashed && (
        <div
          className={`opacity-70 border-l-2 border-dashed h-12 ml-8 w-3 ${dashedBorder}`}
          aria-hidden="true"
        />
      )}

      <div className={`flex items-center gap-4 ${faded && "opacity-60"}`}>
        <div
          className={`relative flex h-16 w-16 items-center justify-center rounded-3xl border-4 overflow-hidden
            ${cfg.border}
            ${cfg.glow}`}
          aria-hidden="true"
        >
          {timelinePoint !== "created" && (
            <div
              className={`absolute bottom-0 w-20 flex justify-center items-center ${cfg.fill}
                ${
                  (timelinePoint === "expires" ||
                    timelinePoint === "wouldExpire") &&
                  Number(timePassedPercent) > 1 &&
                  "wave-animation"
                }`}
              style={
                (timelinePoint === "expires" ||
                  timelinePoint === "wouldExpire") &&
                Number(timePassedPercent) > 1
                  ? { clipPath: WAVE_CLIP_PATH, height: getFillHeight() }
                  : { height: getFillHeight() }
              }
            />
          )}

          <TimelineElementIcon status={timelinePoint} />
        </div>

        <div className="flex flex-col">
          {timelinePoint !== "viewed" && (
            <p
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
            </p>
          )}

          {timelinePoint === "viewed" && (
            <p className="electrolize">
              <span className="text-green-500">Viewed</span> and{" "}
              <span className="text-red-500">Erased</span>
            </p>
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
