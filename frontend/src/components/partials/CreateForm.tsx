// import { useState } from "react";

import { Link } from "react-router-dom";

const CreateForm = () => {
  // const [sendEmail, setSendEmail] = useState(false);

  // const handleCheckboxChange = () => {
  //   setSendEmail((prev) => !prev); // Toggle the state
  // };

  return (
    <div className="flex flex-col items-center mb-70 w-140 noto-sans">
      <h1 className="text-3xl mb-6 arvo">Create Your Secret</h1>
      <form action="" className="flex flex-col gap-3">
        {/* Email */}
        <div className="input-box pl-3 w-140 group">
          <span className="checkbox">
            <svg
              stroke="currentColor"
              fill="none"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="16px"
              width="16px"
              xmlns="http://www.w3.org/2000/svg"
              className="group-focus-within:opacity-100 opacity-0"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </span>

          <input
            type="email"
            name="email"
            id="email"
            placeholder="Send to an email"
            className="p-3 text-xs placeholder-(--white) focus:outline-0"
          />
        </div>

        {/* Secret */}

        <textarea
          name="secret"
          id="secret"
          className="hide-scrollbar resize-none noto-sans w-140 h-45 p-5 input-box text-xs placeholder-(--white) focus:outline-0"
          placeholder="Write your secret here"
        ></textarea>

        {/* Password, Expiration Time, Create Button */}
        <div className="flex gap-4 w-140">
          {/* Password */}
          <div className="input-box pl-3 w-55 group">
            <span className="checkbox">
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="16px"
                width="16px"
                xmlns="http://www.w3.org/2000/svg"
                className="group-focus-within:opacity-100 opacity-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
            </span>

            <input
              type="text"
              name="password"
              id="password"
              placeholder="Require Password"
              className="p-3 text-xs placeholder-(--white) focus:outline-0"
            />
          </div>

          {/* Expiration Time */}
          <div className="input-box w-60 justify-between p-2 text-xs">
            <span className="select-none">Expires in:</span>

            {/* --- 7 Days Option --- */}
            <span className="flex items-center gap-1.5 select-none text-xs">
              <input
                type="radio"
                name="expiration"
                id="expire-7d"
                value="7d"
                defaultChecked
                className="absolute opacity-0 w-0 h-0 cursor-pointer"
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
                  className="group-focus-within:opacity-100 opacity-0"
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
            </span>

            {/* --- 1 Day Option --- */}
            <span className="flex items-center gap-1.5 select-none text-xs">
              <input
                type="radio"
                name="expiration"
                id="expire-1d"
                value="1d"
                className="absolute opacity-0 w-0 h-0 cursor-pointer"
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
                  className="group-focus-within:opacity-100 opacity-0"
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
            </span>

            {/* --- 1 Hour Option --- */}
            <span className="flex items-center gap-1.5 select-none text-xs">
              <input
                type="radio"
                name="expiration"
                id="expire-1h"
                value="1h"
                className="absolute opacity-0 w-0 h-0 cursor-pointer"
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
                  className="group-focus-within:opacity-100 opacity-0"
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
            </span>
          </div>

          {/* Create Button */}

          <Link
            to="/details"
            className="group relative overflow-hidden action-btn py-2.5 px-7 border-3 rounded-xl arvo"
          >
            <span>Create</span>
            <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-12deg)_translateX(-100%)] group-hover:duration-500 group-hover:transform-[skew(-30deg)_translateX(100%)]">
              <div className="relative h-full w-8 bg-white/20"></div>
            </div>
          </Link>
        </div>
      </form>

      {/* Sign in, Login features */}
      <div className="flex items-center justify-between w-140 my-10">
        <Link
          to="/sign-in"
          className="group relative overflow-hidden action-btn text-xl h-20 w-65 border-4 rounded-xl arvo"
        >
          <span>Sign in</span>
          <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-5deg)_translateX(-100%)] group-hover:duration-600 group-hover:transform-[skew(-30deg)_translateX(100%)]">
            <div className="relative h-full w-15 bg-white/20"></div>
          </div>
        </Link>

        <Link to="/mysecrets">
          <div className="flex items-center justify-between p-3 relative h-20 w-65">
            <div className="z-11 absolute rounded-sm w-full h-full top-2 left-2">
              <div className="flex gap-1">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 448 512"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path>
                </svg>
                <p className="electrolize text-xs font-bold">
                  Sign in required!
                </p>
              </div>
            </div>
            <div className="bg-[#010203a9] z-10 absolute rounded-sm w-full h-full top-0 left-0" />
            <button className="action-btn opacity-85 relative text-lg py-3 px-6 border-3 rounded-md arvo">
              View Secrets
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
                <p className="electrolize text-xs">destroy</p>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CreateForm;
