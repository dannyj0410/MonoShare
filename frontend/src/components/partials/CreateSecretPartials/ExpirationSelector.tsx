import { memo } from "react";
import type { ExpirationTimeOptions } from "../../../interfaces/secret.interface";
import CheckmarkIcon from "../../icons/CheckmarkIcon";

const EXPIRATION_OPTIONS: ExpirationTimeOptions[] = ["7d", "1d", "1h"];

const ExpirationSelector = memo(function ExpirationSelector({
  onChange,
  timeTillExpiration,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  timeTillExpiration: string;
}) {
  return (
    <div className="input-box w-60 max-md:w-[90vw] gap-2 flex p-3 text-xs">
      <span className="select-none">Expires in:</span>

      <div className="flex gap-2.5">
        {EXPIRATION_OPTIONS.map((option) => (
          <label
            key={option}
            htmlFor={`expire-${option}`}
            className="flex items-center gap-1 select-none text-xs cursor-pointer"
          >
            <input
              type="radio"
              name="expiration"
              id={`expire-${option}`}
              value={option}
              checked={timeTillExpiration === option}
              onChange={onChange}
              className="absolute opacity-0 w-0 h-0"
            />
            <span className="checkbox flex items-center justify-center">
              <CheckmarkIcon
                className={`size-3.75 stroke-(--white) ${
                  timeTillExpiration === option ? "opacity-100" : "opacity-0"
                }`}
              />
            </span>
            {option}
          </label>
        ))}
      </div>
    </div>
  );
});

export default ExpirationSelector;
