import { useState } from "react";
import { Link } from "react-router-dom";
import BackButton from "../../partials/BackButton";

const CreateAccount = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="w-screen h-screen pt-45">
      <div className="relative flex flex-col w-md h-fit rounded-xl m-auto py-8 px-8 z-10 bg-white/3 border-gray-400/20 border">
        <div className="absolute -top-15 left-0 opacity-70 hover:opacity-100">
          <BackButton />
        </div>
        <h1 className="mx-auto text-3xl">Welcome</h1>
        <h2 className="text-2xl noto-sans mt-7 mb-1">Create Account</h2>
        <p className="text-sm text-(--gray) noto-sans ml-0.5">
          Join MonoShare to unlock even more features.
        </p>
        <form action="" method="post">
          <div className="flex flex-col noto-sans mt-6 gap-1">
            <p className="font-light text-sm">Email</p>
            <div className="group flex gap-2 items-center border border-gray-400/20 hover:border-gray-400/30 px-3 rounded-xl duration-200 focus-within:border-(--main-light-blue) focus-within:hover:border-(--main-light-blue) focus-within:outline-3 focus-within:outline-cyan-600/30 focus-within:bg-blue-300/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#a1a1a1"
                stroke-linecap="round"
                stroke-linejoin="round"
                id="Mail--Streamline-Tabler"
                height="20"
                width="20"
                className="group-focus-within:stroke-(--main-light-blue)"
              >
                <desc>Mail Streamline Icon: https://streamlinehq.com</desc>
                <path
                  d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2H5a2 2 0 0 1 -2 -2V7z"
                  stroke-width="2"
                ></path>
                <path d="m3 7 9 6 9 -6" stroke-width="2"></path>
              </svg>
              <input
                type="email"
                name=""
                id=""
                placeholder="example@gmail.com"
                className="text-sm w-full text-(--gray) outline-0 py-2"
              />
            </div>
          </div>
          {/* Password */}
          <div className="flex flex-col noto-sans mt-6 gap-1">
            <p className="font-light text-sm">Password</p>
            <div className="group flex gap-2 items-center border border-gray-400/20 hover:border-gray-400/30 px-3 rounded-xl transform-all duration-200 focus-within:border-(--main-light-blue) focus-within:hover:border-(--main-light-blue) focus-within:outline-3 focus-within:outline-cyan-600/30 focus-within:bg-blue-300/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-0.5 -0.5 16 16"
                fill="none"
                id="Key-Line--Streamline-Majesticons"
                height="20"
                width="20"
                stroke="#a1a1a1"
                className="group-focus-within:stroke-(--main-light-blue)"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.375 9.375a3.75 3.75 0 1 0 -3.5893750000000004 -2.6606249999999996L5.625 6.875l-3.566875 3.566875a0.625 0.625 0 0 0 -0.18312499999999998 0.44187499999999996V12.5a0.625 0.625 0 0 0 0.625 0.625h1.25a0.625 0.625 0 0 0 0.625 -0.625 0.625 0.625 0 0 1 0.625 -0.625 0.625 0.625 0 0 0 0.625 -0.625 0.625 0.625 0 0 1 0.625 -0.625h0.36624999999999996a0.625 0.625 0 0 0 0.44187499999999996 -0.18312499999999998L8.125 9.375l0.16062500000000002 -0.16062500000000002A3.7493749999999997 3.7493749999999997 0 0 0 9.375 9.375zm1.25 -3.75a1.25 1.25 0 0 0 -1.25 -1.25"
                  stroke-width="1"
                ></path>
              </svg>
              <input
                type={showPassword ? "text" : "password"}
                name=""
                id=""
                placeholder={`${showPassword ? "enter password" : "*******"}`}
                className="text-sm w-full text-(--gray) outline-0  py-2"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="#a1a1a1"
                aria-hidden="true"
                id="Eye--Streamline-Heroicons"
                height="20"
                width="20"
                className={`cursor-pointer ${
                  showPassword ? "hidden" : "visible"
                }`}
                onClick={() => setShowPassword(!showPassword)}
              >
                <desc>Eye Streamline Icon: https://streamlinehq.com</desc>
                <path
                  d="M8 10a2 2 0 1 0 0 -4 2 2 0 0 0 0 4Z"
                  stroke-width="0.6667"
                ></path>
                <path
                  fill-rule="evenodd"
                  d="M0.8819999999999999 7.631333333333332C1.8739999999999999 4.650666666666666 4.6853333333333325 2.5 8.000666666666666 2.5c3.313333333333333 0 6.123333333333333 2.1486666666666663 7.116666666666667 5.126666666666667 0.07999999999999999 0.24133333333333332 0.07999999999999999 0.5013333333333333 0 0.742 -0.9913333333333334 2.9806666666666666 -3.8033333333333332 5.131333333333333 -7.117999999999999 5.131333333333333 -3.313333333333333 0 -6.124 -2.1486666666666663 -7.116666666666667 -5.126666666666667a1.1746666666666665 1.1746666666666665 0 0 1 0 -0.742ZM11.5 8a3.5 3.5 0 1 1 -7 0 3.5 3.5 0 0 1 7 0Z"
                  clip-rule="evenodd"
                  stroke-width="0.6667"
                ></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#a1a1a1"
                aria-hidden="true"
                id="Eye-Slash--Streamline-Heroicons"
                height="20"
                width="20"
                className={`cursor-pointer ${
                  showPassword ? "visible" : "hidden"
                }`}
                onClick={() => setShowPassword(!showPassword)}
              >
                <desc>Eye Slash Streamline Icon: https://streamlinehq.com</desc>
                <path
                  d="M2.9416666666666664 2.0583333333333336a0.625 0.625 0 0 0 -0.8833333333333334 0.8833333333333334l15 15a0.625 0.625 0 1 0 0.8833333333333334 -0.8833333333333334l-15 -15Zm15.955000000000002 8.4025a9.374166666666667 9.374166666666667 0 0 1 -2.1925 3.5916666666666663l-2.5825000000000005 -2.5825000000000005a4.375 4.375 0 0 0 -5.591666666666667 -5.591666666666667L6.465833333333334 3.814166666666667a9.3475 9.3475 0 0 1 3.535 -0.6891666666666667c4.141666666666667 0 7.654166666666668 2.6858333333333335 8.895833333333334 6.408333333333334 0.1 0.3016666666666667 0.1 0.6266666666666667 0 0.9275Z"
                  stroke-width="0.8333"
                ></path>
                <path
                  d="M13.125 10c0 0.15 -0.010833333333333334 0.2975 -0.030833333333333334 0.4416666666666667l-3.5366666666666666 -3.5358333333333336A3.125 3.125 0 0 1 13.125 10Zm-2.6833333333333336 3.0941666666666667 -3.5358333333333336 -3.5366666666666666a3.125 3.125 0 0 0 3.5366666666666666 3.5358333333333336Z"
                  stroke-width="0.8333"
                ></path>
                <path
                  d="M5.625 10c0 -0.5158333333333334 0.08916666666666667 -1.0108333333333335 0.25333333333333335 -1.47l-2.5833333333333335 -2.5833333333333335a9.375 9.375 0 0 0 -2.191666666666667 3.5916666666666663c-0.1 0.3016666666666667 -0.1 0.6266666666666667 0 0.9283333333333335 1.2408333333333335 3.7224999999999997 4.753333333333333 6.408333333333334 8.895833333333334 6.408333333333334 1.25 0 2.444166666666667 -0.245 3.535 -0.6891666666666667l-2.0641666666666665 -2.0641666666666665A4.375 4.375 0 0 1 5.625 10Z"
                  stroke-width="0.8333"
                ></path>
              </svg>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col noto-sans mt-6 gap-1">
            <p className="font-light text-sm">Confirm Password</p>
            <div className="group flex gap-2 items-center border border-gray-400/20 hover:border-gray-400/30 px-3 rounded-xl transform-all duration-200 focus-within:border-(--main-light-blue) focus-within:hover:border-(--main-light-blue) focus-within:outline-3 focus-within:outline-cyan-600/30 focus-within:bg-blue-300/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-0.5 -0.5 16 16"
                fill="none"
                id="Key-Line--Streamline-Majesticons"
                height="20"
                width="20"
                stroke="#a1a1a1"
                className="group-focus-within:stroke-(--main-light-blue)"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.375 9.375a3.75 3.75 0 1 0 -3.5893750000000004 -2.6606249999999996L5.625 6.875l-3.566875 3.566875a0.625 0.625 0 0 0 -0.18312499999999998 0.44187499999999996V12.5a0.625 0.625 0 0 0 0.625 0.625h1.25a0.625 0.625 0 0 0 0.625 -0.625 0.625 0.625 0 0 1 0.625 -0.625 0.625 0.625 0 0 0 0.625 -0.625 0.625 0.625 0 0 1 0.625 -0.625h0.36624999999999996a0.625 0.625 0 0 0 0.44187499999999996 -0.18312499999999998L8.125 9.375l0.16062500000000002 -0.16062500000000002A3.7493749999999997 3.7493749999999997 0 0 0 9.375 9.375zm1.25 -3.75a1.25 1.25 0 0 0 -1.25 -1.25"
                  stroke-width="1"
                ></path>
              </svg>
              <input
                type={showConfirmPassword ? "text" : "password"}
                name=""
                id=""
                placeholder={`${showConfirmPassword ? "confirm password" : "*******"}`}
                className="text-sm w-full text-(--gray) outline-0  py-2"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="#a1a1a1"
                aria-hidden="true"
                id="Eye--Streamline-Heroicons"
                height="20"
                width="20"
                className={`cursor-pointer ${
                  showConfirmPassword ? "hidden" : "visible"
                }`}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <desc>Eye Streamline Icon: https://streamlinehq.com</desc>
                <path
                  d="M8 10a2 2 0 1 0 0 -4 2 2 0 0 0 0 4Z"
                  stroke-width="0.6667"
                ></path>
                <path
                  fill-rule="evenodd"
                  d="M0.8819999999999999 7.631333333333332C1.8739999999999999 4.650666666666666 4.6853333333333325 2.5 8.000666666666666 2.5c3.313333333333333 0 6.123333333333333 2.1486666666666663 7.116666666666667 5.126666666666667 0.07999999999999999 0.24133333333333332 0.07999999999999999 0.5013333333333333 0 0.742 -0.9913333333333334 2.9806666666666666 -3.8033333333333332 5.131333333333333 -7.117999999999999 5.131333333333333 -3.313333333333333 0 -6.124 -2.1486666666666663 -7.116666666666667 -5.126666666666667a1.1746666666666665 1.1746666666666665 0 0 1 0 -0.742ZM11.5 8a3.5 3.5 0 1 1 -7 0 3.5 3.5 0 0 1 7 0Z"
                  clip-rule="evenodd"
                  stroke-width="0.6667"
                ></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#a1a1a1"
                aria-hidden="true"
                id="Eye-Slash--Streamline-Heroicons"
                height="20"
                width="20"
                className={`cursor-pointer ${
                  showConfirmPassword ? "visible" : "hidden"
                }`}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <desc>Eye Slash Streamline Icon: https://streamlinehq.com</desc>
                <path
                  d="M2.9416666666666664 2.0583333333333336a0.625 0.625 0 0 0 -0.8833333333333334 0.8833333333333334l15 15a0.625 0.625 0 1 0 0.8833333333333334 -0.8833333333333334l-15 -15Zm15.955000000000002 8.4025a9.374166666666667 9.374166666666667 0 0 1 -2.1925 3.5916666666666663l-2.5825000000000005 -2.5825000000000005a4.375 4.375 0 0 0 -5.591666666666667 -5.591666666666667L6.465833333333334 3.814166666666667a9.3475 9.3475 0 0 1 3.535 -0.6891666666666667c4.141666666666667 0 7.654166666666668 2.6858333333333335 8.895833333333334 6.408333333333334 0.1 0.3016666666666667 0.1 0.6266666666666667 0 0.9275Z"
                  stroke-width="0.8333"
                ></path>
                <path
                  d="M13.125 10c0 0.15 -0.010833333333333334 0.2975 -0.030833333333333334 0.4416666666666667l-3.5366666666666666 -3.5358333333333336A3.125 3.125 0 0 1 13.125 10Zm-2.6833333333333336 3.0941666666666667 -3.5358333333333336 -3.5366666666666666a3.125 3.125 0 0 0 3.5366666666666666 3.5358333333333336Z"
                  stroke-width="0.8333"
                ></path>
                <path
                  d="M5.625 10c0 -0.5158333333333334 0.08916666666666667 -1.0108333333333335 0.25333333333333335 -1.47l-2.5833333333333335 -2.5833333333333335a9.375 9.375 0 0 0 -2.191666666666667 3.5916666666666663c-0.1 0.3016666666666667 -0.1 0.6266666666666667 0 0.9283333333333335 1.2408333333333335 3.7224999999999997 4.753333333333333 6.408333333333334 8.895833333333334 6.408333333333334 1.25 0 2.444166666666667 -0.245 3.535 -0.6891666666666667l-2.0641666666666665 -2.0641666666666665A4.375 4.375 0 0 1 5.625 10Z"
                  stroke-width="0.8333"
                ></path>
              </svg>
            </div>
          </div>
          <button className="noto-sans w-full py-3 mt-6 text-sm font-medium cursor-pointer bg-(--white) text-black rounded-lg">
            Sign In
          </button>
        </form>
        <div className="m-auto mt-5">
          <p className="noto-sans text-sm font-normal text-(--gray)">
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="text-(--main-light-blue) font-normal hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
