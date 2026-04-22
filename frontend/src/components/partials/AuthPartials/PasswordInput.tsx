import { useState } from "react";
import ShowPasswordIcon from "../../icons/ShowPasswordIcon";
import HidePasswordIcon from "../../icons/HidePasswordIcon";

interface PasswordInputProps {
  type: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus: () => void;
}

const PasswordInput = ({
  type,
  value,
  error,
  onChange,
  onBlur,
  onFocus,
}: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const name = type.toLowerCase();
  const placeholder = !showPassword
    ? "********"
    : type === "Password"
      ? "enter password"
      : "confirm password";

  return (
    <div className="flex flex-col noto-sans gap-1">
      <p className="font-light text-sm">
        {type} {type === "Confirm" && "Password"}
      </p>
      <div
        className={`${error ? "border-red-400 outline-3 outline-red-600/25 hover:bg-red-500/5" : "border-gray-400/20 hover:border-gray-400/30 focus-within:bg-blue-300/10"} mb-px group flex gap-2 items-center border px-3 rounded-xl duration-200 focus-within:border-(--main-light-blue) focus-within:hover:border-(--main-light-blue) focus-within:outline-3 focus-within:outline-cyan-600/30`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-0.5 -0.5 16 16"
          fill="none"
          id="Key-Line--Streamline-Majesticons"
          height="20"
          width="20"
          className={`group-focus-within:stroke-(--main-light-blue) stroke-(--gray) ${error && "stroke-red-500"}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.375 9.375a3.75 3.75 0 1 0 -3.5893750000000004 -2.6606249999999996L5.625 6.875l-3.566875 3.566875a0.625 0.625 0 0 0 -0.18312499999999998 0.44187499999999996V12.5a0.625 0.625 0 0 0 0.625 0.625h1.25a0.625 0.625 0 0 0 0.625 -0.625 0.625 0.625 0 0 1 0.625 -0.625 0.625 0.625 0 0 0 0.625 -0.625 0.625 0.625 0 0 1 0.625 -0.625h0.36624999999999996a0.625 0.625 0 0 0 0.44187499999999996 -0.18312499999999998L8.125 9.375l0.16062500000000002 -0.16062500000000002A3.7493749999999997 3.7493749999999997 0 0 0 9.375 9.375zm1.25 -3.75a1.25 1.25 0 0 0 -1.25 -1.25"
            strokeWidth="1"
          ></path>
        </svg>
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          placeholder={placeholder}
          className="text-sm w-full text-(--gray) outline-0 py-2"
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
        <ShowPasswordIcon
          className={`fill-(--gray) size-5 ${showPassword ? "visible" : "hidden"}`}
          setShowPassword={setShowPassword}
          showPassword={showPassword}
        />
        <HidePasswordIcon
          className={`fill-(--gray) size-5 ${!showPassword ? "visible" : "hidden"}`}
          setShowPassword={setShowPassword}
          showPassword={showPassword}
        />
      </div>
      <div className="h-4">
        {error && (
          <p className="font-light tracking-wide text-xs ml-2 text-red-400">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
