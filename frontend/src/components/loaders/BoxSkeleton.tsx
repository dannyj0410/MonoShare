const BoxSkeleton = ({
  className = "w-32 h-8",
  colour = "rgb(55 65 81)", // Default base color
  highlightColour = "rgba(77, 91, 110, 0.9)",
}: {
  className?: string;
  colour?: string;
  highlightColour?: string;
}) => {
  return (
    <div
      className={`skeleton animate-[pulse_1.5s_linear_infinite] ${className}`}
      style={
        {
          "--skltn-box-clr": colour,
          "--skltn-box-highlight-clr": highlightColour,
        } as React.CSSProperties
      }
    />
  );
};

export default BoxSkeleton;
