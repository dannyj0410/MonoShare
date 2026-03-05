import type { ExpirationTimeOptions } from "../../../interfaces/secret.interface";

const EXPIRATION_OPTIONS: ExpirationTimeOptions[] = ["7d", "1d", "1h"];

const ExpirationSelector = ({
  onChange,
  timeTillExpiration,
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  timeTillExpiration: string;
}) => {
  return (
    <div className="input-box w-60 justify-between p-2 text-xs">
      <span className="select-none">Expires in:</span>

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
            <svg
              stroke="currentColor"
              fill="none"
              viewBox="0 0 24 24"
              height="16px"
              width="16px"
              xmlns="http://www.w3.org/2000/svg"
              className={`${
                timeTillExpiration === option ? "opacity-100" : "opacity-0"
              }`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </span>
          {option}
        </label>
      ))}
    </div>
  );
};

export default ExpirationSelector;
