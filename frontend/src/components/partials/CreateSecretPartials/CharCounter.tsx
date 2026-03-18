import { memo } from "react";

const CharCounter = memo(function CharCounter({
  secret,
  charLimit,
}: {
  secret: string;
  charLimit: number;
}) {
  const charCount = secret.length;
  return (
    <div className="absolute bottom-1 right-2 backdrop-blur-xs p-0.5 rounded-sm pointer-events-none">
      <p
        className={`text-xs ${charCount > charLimit ? "text-red-400" : "text-(--white)"}`}
      >
        {charCount} / {charLimit}
      </p>
    </div>
  );
});

export default CharCounter;
