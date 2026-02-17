import { Link } from "react-router-dom";
import { forwardRef, useState } from "react";
import {
  validateReceiverEmail,
  validateSecretPassword,
  validateSecretText,
} from "../../utils/validators/secret.validator";

const CreateForm = forwardRef<HTMLDivElement, { isAuthenticated: boolean }>(
  ({ isAuthenticated }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const [secretFormData, setSecretFormData] = useState({
      receiverEmail: "",
      secret: "",
      password: "",
      expirationTime: "7d",
    });

    const [secretFormErrors, setSecretFormErrors] = useState<{
      receiverEmail?: boolean;
      password?: boolean;
      secret?: boolean;
    }>({ receiverEmail: false, password: false, secret: false });

    const onChangeHandler = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      const { name, value } = e.target;
      setSecretFormData({ ...secretFormData, [name]: value });
    };

    const onExpirationChangeHandler = (
      e: React.ChangeEvent<HTMLInputElement>,
    ) => {
      setSecretFormData({ ...secretFormData, expirationTime: e.target.value });
    };

    const onBlurHandler = (
      e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      const { name, value } = e.target;
      let error: boolean;

      if (name === "receiverEmail") {
        error = validateReceiverEmail(value);
      }
      if (name === "password") {
        error = validateSecretPassword(value);
      }
      if (name === "secret") {
        error = validateSecretText(value);
      }

      setSecretFormErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const emailError = validateReceiverEmail(secretFormData.receiverEmail);
      const passwordError = validateSecretPassword(secretFormData.password);
      const secretError = validateSecretText(secretFormData.secret);

      if (emailError || secretError || passwordError) {
        setSecretFormErrors({
          receiverEmail: emailError,
          password: passwordError,
          secret: secretError,
        });
        console.log(
          secretFormErrors.receiverEmail ||
            secretFormErrors.password ||
            secretFormErrors.secret,
        );
        return;
      }
    };

    return (
      <div
        className="flex flex-col items-center mb-70 w-140 noto-sans"
        ref={ref}
      >
        <h1 className="text-3xl mb-6 arvo">Create Your Secret</h1>
        <form onSubmit={onSubmit} className="flex flex-col gap-3">
          {/* Email */}
          {isAuthenticated && (
            <div
              className={`pl-3 w-140 group ${secretFormErrors.receiverEmail ? "input-box-red" : "input-box"}`}
            >
              <label
                htmlFor="receiverEmail"
                className={`${secretFormErrors.receiverEmail ? "checkbox-red" : "checkbox"}`}
              >
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="16px"
                  width="16px"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${!secretFormData.receiverEmail && "opacity-0"}`}
                  onClick={() =>
                    secretFormData.receiverEmail &&
                    setSecretFormData({ ...secretFormData, receiverEmail: "" })
                  }
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
                type="text"
                name="receiverEmail"
                id="receiverEmail"
                placeholder="Send to an email"
                className="p-3 text-xs placeholder-(--white) focus:outline-0 w-full"
                value={secretFormData.receiverEmail}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
              />
            </div>
          )}

          {/* Secret */}
          <textarea
            name="secret"
            id="secret"
            className={`hide-scrollbar resize-none noto-sans w-full h-45 p-5 text-xs placeholder-(--white) focus:outline-0 ${secretFormErrors.secret ? "input-box-red" : "input-box"}`}
            placeholder="Write your secret here"
            value={secretFormData.secret}
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
          ></textarea>

          {/* Password, Expiration Time, Create Button */}
          <div className="flex gap-4 w-140">
            {/* Password */}
            <div
              className={`input-box pl-3 pr-3 w-50 group ${secretFormErrors.password ? "input-box-red" : "input-box"}`}
            >
              <label
                htmlFor="password"
                className={`mr-3 ${secretFormErrors.password ? "checkbox-red" : "checkbox"}`}
                onClick={() =>
                  secretFormData.password &&
                  setSecretFormData({ ...secretFormData, password: "" })
                }
              >
                <svg
                  stroke="currentColor"
                  fill="none"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="16px"
                  width="16px"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${!secretFormData.password && "opacity-0"}`}
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
                placeholder="Require Password"
                className="text-xs placeholder-(--white) w-30 pr-2 focus:outline-0"
                value={secretFormData.password}
                onChange={onChangeHandler}
                onBlur={onBlurHandler}
              />
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="#eee"
                  aria-hidden="true"
                  id="Eye--Streamline-Heroicons"
                  height="16"
                  width="16"
                  className={`cursor-pointer ${
                    showPassword ? "hidden" : "visible"
                  }`}
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
                  className={`cursor-pointer ${
                    showPassword ? "visible" : "hidden"
                  }`}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <desc>
                    Eye Slash Streamline Icon: https://streamlinehq.com
                  </desc>
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

            {/* Expiration Time */}
            <div className="input-box w-60 justify-between p-2 text-xs">
              <span className="select-none">Expires in:</span>

              {/* --- 7 Days Option --- */}
              <label
                htmlFor="expire-7d"
                className="flex items-center gap-1 select-none text-xs cursor-pointer"
              >
                <input
                  type="radio"
                  name="expiration"
                  id="expire-7d"
                  value="7d"
                  checked={secretFormData.expirationTime === "7d"}
                  onChange={onExpirationChangeHandler}
                  className="absolute opacity-0 w-0 h-0"
                />
                <span className="checkbox flex items-center justify-center">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    height="16px"
                    width="16px"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`group-focus-within:opacity-100 ${secretFormData.expirationTime === "7d" ? "opacity-100" : "opacity-0"}`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </span>
                7d
              </label>

              {/* --- 1 Day Option --- */}
              <label
                htmlFor="expire-1d"
                className="flex items-center gap-1 select-none text-xs cursor-pointer"
              >
                <input
                  type="radio"
                  name="expiration"
                  id="expire-1d"
                  value="1d"
                  checked={secretFormData.expirationTime === "1d"}
                  onChange={onExpirationChangeHandler}
                  className="absolute opacity-0 w-0 h-0"
                />
                <span className="checkbox flex items-center justify-center">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    height="16px"
                    width="16px"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`group-focus-within:opacity-100 ${secretFormData.expirationTime === "1d" ? "opacity-100" : "opacity-0"}`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </span>
                1d
              </label>

              {/* --- 1 Hour Option --- */}
              <label
                htmlFor="expire-1h"
                className="flex items-center gap-1 select-none text-xs cursor-pointer"
              >
                <input
                  type="radio"
                  name="expiration"
                  id="expire-1h"
                  value="1h"
                  checked={secretFormData.expirationTime === "1h"}
                  onChange={onExpirationChangeHandler}
                  className="absolute opacity-0 w-0 h-0"
                />
                <span className="checkbox flex items-center justify-center">
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    height="16px"
                    width="16px"
                    xmlns="http://www.w3.org/2000/svg"
                    className={`group-focus-within:opacity-100 ${secretFormData.expirationTime === "1h" ? "opacity-100" : "opacity-0"}`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </span>
                1h
              </label>
            </div>

            {/* Create Button */}

            <button
              className={`relative overflow-hidden action-btn py-2.5 px-7 border-3 rounded-xl arvo ${secretFormErrors.receiverEmail || secretFormErrors.password || secretFormErrors.secret ? "bg-red-400/10! bg-none! border-red-400/15! hover:bg-red-400/15! hover:border-red-400/20!" : "group"}`}
            >
              <span>Create</span>
              <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-12deg)_translateX(-100%)] group-hover:duration-500 group-hover:transform-[skew(-30deg)_translateX(100%)]">
                <div className="relative h-full w-8 bg-white/20"></div>
              </div>
            </button>
          </div>
        </form>

        {/* Sign in, Login features */}
        <div className="flex items-center justify-between w-140 my-10">
          {!isAuthenticated ? (
            <Link
              to="/sign-in"
              className="group relative overflow-hidden action-btn text-xl h-20 w-65 border-4 rounded-xl arvo"
            >
              <span>Sign in</span>
              <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-5deg)_translateX(-100%)] group-hover:duration-600 group-hover:transform-[skew(-30deg)_translateX(100%)]">
                <div className="relative h-full w-15 bg-white/20"></div>
              </div>
            </Link>
          ) : (
            <Link
              to="/my-secrets"
              className="flex items-center justify-center relative overflow-hidden py-6.5 w-50 bg-[#3F67E1] cursor-pointer rounded-sm duration-300 transition-colors hover:bg-[#1f4ad6] hover:outline-(--white) hover:outline-3"
            >
              <span className="electrolize font-bold tracking-wider ml-2.5">
                View My Secrets
              </span>
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="3"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </Link>
          )}

          {!isAuthenticated && (
            <Link to="/create-account">
              <div className="flex items-center justify-between p-3 relative h-20 w-65">
                <div className="z-11 absolute rounded-sm w-full h-full top-2 left-2">
                  <div className="flex gap-1">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 448 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path>
                    </svg>
                    <p className="electrolize text-xs font-bold">
                      Account required!
                    </p>
                  </div>
                </div>
                <div className="bg-[#010203a9] z-10 absolute rounded-sm w-full h-full top-0 left-0" />
                <button className="flex items-center justify-center relative overflow-hidden py-3.5 w-40 bg-[#3f67e17a] cursor-pointer rounded-sm">
                  <span className="electrolize font-bold tracking-wider ml-2.5">
                    View Secrets
                  </span>
                  <svg
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
                <div className="flex flex-col opacity-85">
                  <div className="flex items-center">
                    <svg
                      stroke="#02a30f"
                      fill="none"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      height="15px"
                      width="15px"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <p className="electrolize text-xs">timeline</p>
                  </div>
                  <div className="flex items-center">
                    <svg
                      stroke="#02a30f"
                      fill="none"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      height="15px"
                      width="15px"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <p className="electrolize text-xs">details</p>
                  </div>
                  <div className="flex items-center">
                    <svg
                      stroke="#02a30f"
                      fill="none"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      height="15px"
                      width="15px"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    <p className="electrolize text-xs">erase</p>
                  </div>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    );
  },
);

export default CreateForm;
