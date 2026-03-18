import { memo, useState } from "react";

interface SecretPasswordFieldProps {
  password: string;
  error?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: (fieldName: string) => void;
}

const SecretPasswordField = memo(function SecretPasswordField({
  password,
  error,
  onChange,
  onClear,
}: SecretPasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className={`pl-3 pr-3 w-50 flex items-center group max-md:w-[90vw] ${
        error ? "input-box-red" : "input-box"
      } ${!password && "opacity-60 focus-within:opacity-100 hover:opacity-100 transition-all duration-300 cursor-pointer"}`}
    >
      <label
        htmlFor="password"
        className={`mr-3 ${error ? "checkbox-red" : "checkbox"}`}
        onClick={() => password && onClear("password")}
      >
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="16px"
          width="16px"
          xmlns="http://www.w3.org/2000/svg"
          className={`${(!password || error || error === undefined) && "opacity-0"}`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
      </label>

      <input
        type={showPassword ? "text" : "password"}
        name="password"
        id="password"
        placeholder="Require Password?"
        className={`py-3 text-xs placeholder-(--white) w-30 max-md:w-full pr-2 h-full focus:outline-0 ${!password && "focus:cursor-auto hover:cursor-pointer"}`}
        value={password}
        onChange={onChange}
      />

      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="#eee"
          aria-hidden="true"
          id="Eye--Streamline-Heroicons"
          height="16"
          width="16"
          className={`cursor-pointer ${showPassword ? "visible" : "hidden"}`}
          onClick={() => setShowPassword(!showPassword)}
        >
          <desc>Eye Streamline Icon: https://streamlinehq.com</desc>
          <path
            d="M8 10a2 2 0 1 0 0 -4 2 2 0 0 0 0 4Z"
            strokeWidth="0.6667"
          ></path>
          <path
            fillRule="evenodd"
            d="M0.8819999999999999 7.631333333333332C1.8739999999999999 4.650666666666666 4.6853333333333325 2.5 8.000666666666666 2.5c3.313333333333333 0 6.123333333333333 2.1486666666666663 7.116666666666667 5.126666666666667 0.07999999999999999 0.24133333333333332 0.07999999999999999 0.5013333333333333 0 0.742 -0.9913333333333334 2.9806666666666666 -3.8033333333333332 5.131333333333333 -7.117999999999999 5.131333333333333 -3.313333333333333 0 -6.124 -2.1486666666666663 -7.116666666666667 -5.126666666666667a1.1746666666666665 1.1746666666666665 0 0 1 0 -0.742ZM11.5 8a3.5 3.5 0 1 1 -7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
            strokeWidth="0.6667"
          ></path>
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="#eee"
          aria-hidden="true"
          id="Eye-Slash--Streamline-Heroicons"
          height="16"
          width="16"
          className={`cursor-pointer ${showPassword ? "hidden" : "visible"}`}
          onClick={() => setShowPassword(!showPassword)}
        >
          <desc>Eye Slash Streamline Icon: https://streamlinehq.com</desc>
          <path
            d="M2.9416666666666664 2.0583333333333336a0.625 0.625 0 0 0 -0.8833333333333334 0.8833333333333334l15 15a0.625 0.625 0 1 0 0.8833333333333334 -0.8833333333333334l-15 -15Zm15.955000000000002 8.4025a9.374166666666667 9.374166666666667 0 0 1 -2.1925 3.5916666666666663l-2.5825000000000005 -2.5825000000000005a4.375 4.375 0 0 0 -5.591666666666667 -5.591666666666667L6.465833333333334 3.814166666666667a9.3475 9.3475 0 0 1 3.535 -0.6891666666666667c4.141666666666667 0 7.654166666666668 2.6858333333333335 8.895833333333334 6.408333333333334 0.1 0.3016666666666667 0.1 0.6266666666666667 0 0.9275Z"
            strokeWidth="0.8333"
          ></path>
          <path
            d="M13.125 10c0 0.15 -0.010833333333333334 0.2975 -0.030833333333333334 0.4416666666666667l-3.5366666666666666 -3.5358333333333336A3.125 3.125 0 0 1 13.125 10Zm-2.6833333333333336 3.0941666666666667 -3.5358333333333336 -3.5366666666666666a3.125 3.125 0 0 0 3.5366666666666666 3.5358333333333336Z"
            strokeWidth="0.8333"
          ></path>
          <path
            d="M5.625 10c0 -0.5158333333333334 0.08916666666666667 -1.0108333333333335 0.25333333333333335 -1.47l-2.5833333333333335 -2.5833333333333335a9.375 9.375 0 0 0 -2.191666666666667 3.5916666666666663c-0.1 0.3016666666666667 -0.1 0.6266666666666667 0 0.9283333333333335 1.2408333333333335 3.7224999999999997 4.753333333333333 6.408333333333334 8.895833333333334 6.408333333333334 1.25 0 2.444166666666667 -0.245 3.535 -0.6891666666666667l-2.0641666666666665 -2.0641666666666665A4.375 4.375 0 0 1 5.625 10Z"
            strokeWidth="0.8333"
          ></path>
        </svg>
      </div>
    </div>
  );
});

export default SecretPasswordField;
