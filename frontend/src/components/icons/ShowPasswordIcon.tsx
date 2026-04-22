import { memo } from "react";

const ShowPasswordIcon = memo(function ShowPasswordIcon({
  className,
  setShowPassword,
  showPassword,
}: {
  className: string;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  showPassword: boolean;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 16"
      fill="#eee"
      id="Eye--Streamline-Heroicons"
      height="16"
      width="16"
      aria-hidden="true"
      className={`cursor-pointer ${className} ${showPassword ? "visible" : "hidden"}`}
      onClick={() => setShowPassword(!showPassword)}
    >
      <desc>Eye Streamline Icon: https://streamlinehq.com</desc>
      <path d="M8 10a2 2 0 1 0 0 -4 2 2 0 0 0 0 4Z" strokeWidth="0.6667"></path>
      <path
        fillRule="evenodd"
        d="M0.8819999999999999 7.631333333333332C1.8739999999999999 4.650666666666666 4.6853333333333325 2.5 8.000666666666666 2.5c3.313333333333333 0 6.123333333333333 2.1486666666666663 7.116666666666667 5.126666666666667 0.07999999999999999 0.24133333333333332 0.07999999999999999 0.5013333333333333 0 0.742 -0.9913333333333334 2.9806666666666666 -3.8033333333333332 5.131333333333333 -7.117999999999999 5.131333333333333 -3.313333333333333 0 -6.124 -2.1486666666666663 -7.116666666666667 -5.126666666666667a1.1746666666666665 1.1746666666666665 0 0 1 0 -0.742ZM11.5 8a3.5 3.5 0 1 1 -7 0 3.5 3.5 0 0 1 7 0Z"
        clipRule="evenodd"
        strokeWidth="0.6667"
      ></path>
    </svg>
  );
});

export default ShowPasswordIcon;
