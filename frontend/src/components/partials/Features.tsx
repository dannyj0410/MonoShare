const Features = () => {
  return (
    <section className="flex flex-col items-center mb-50">
      <h1 className="text-3xl mb-3 arvo">We do it right.</h1>
      <p className="electrolize w-135 text-center mb-15 text-(--gray)">
        Monoshare keeps your secret private from start to finish, providing a
        better way to send passwords, tokens and private messages.
      </p>

      <div>
        <ul className="flex">
          {/* Security first */}
          <li className="features-card group transition-all duration-300 ease-in-out">
            <div className="icon-box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                stroke-linecap="round"
                stroke-linejoin="round"
                id="User-Shield--Streamline-Tabler"
                height="1.5em"
                width="1.5em"
                className="stroke-(--main-light-blue)"
              >
                <path d="M6 21v-2a4 4 0 0 1 4 -4h2" stroke-width="2"></path>
                <path
                  d="M22 16c0 4 -2.5 6 -3.5 6S15 20 15 16c1 0 2.5 -0.5 3.5 -1.5 1 1 2.5 1.5 3.5 1.5z"
                  stroke-width="2"
                ></path>
                <path
                  d="M8 7a4 4 0 1 0 8 0 4 4 0 0 0 -8 0"
                  stroke-width="2"
                ></path>
              </svg>
            </div>

            <h2 className="electrolize text-xl tracking-wide font-bold my-3 text-(--main-clr) transition-all duration-300 ease-in-out group-hover:blur-[0.5px] group-hover:text-shadow-[0_0_10px_rgb(238_238_238/0.5)]">
              Security First
            </h2>
            <p className="noto-sans text-sm font-medium text-(--gray)">
              Our purpose is to protect your secrets at all cost using
              industry-leading security practices.
            </p>
          </li>
          {/* Enhanced Privacy options */}
          <li className="features-card group transition-all duration-300 ease-in-out">
            <div className="icon-box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
                id="Cog--Streamline-Flex"
                height="1.5em"
                width="1.5em"
                className="stroke-(--main-light-blue)"
              >
                <g id="cog--work-loading-cog-gear-settings-machine">
                  <path
                    id="Vector"
                    // stroke="#000000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.808 7.727c0 0.05 0.017 0.1 0.048 0.14l0.667 0.84a0.96 0.96 0 0 1 0.082 1.08l-0.392 0.676a0.96 0.96 0 0 1 -0.975 0.47l-1.063 -0.16a0.23 0.23 0 0 0 -0.145 0.027l-1.26 0.727a0.228 0.228 0 0 0 -0.096 0.112l-0.392 1a0.96 0.96 0 0 1 -0.893 0.611h-0.782a0.96 0.96 0 0 1 -0.893 -0.61l-0.392 -1a0.228 0.228 0 0 0 -0.096 -0.113L3.967 10.8a0.23 0.23 0 0 0 -0.145 -0.028l-1.063 0.162a0.96 0.96 0 0 1 -0.976 -0.47l-0.39 -0.677a0.96 0.96 0 0 1 0.08 -1.08l0.67 -0.84a0.223 0.223 0 0 0 0.05 -0.14V6.273c0 -0.05 -0.018 -0.1 -0.05 -0.14l-0.67 -0.84a0.96 0.96 0 0 1 -0.08 -1.08l0.39 -0.676a0.96 0.96 0 0 1 0.976 -0.47l1.06 0.16a0.23 0.23 0 0 0 0.145 -0.027l1.262 -0.73a0.229 0.229 0 0 0 0.096 -0.113l0.394 -0.996A0.96 0.96 0 0 1 6.61 0.75h0.784a0.96 0.96 0 0 1 0.893 0.61l0.392 0.997c0.018 0.049 0.052 0.09 0.096 0.116l1.26 0.727a0.23 0.23 0 0 0 0.145 0.028l1.062 -0.162a0.96 0.96 0 0 1 0.976 0.47l0.391 0.677a0.96 0.96 0 0 1 -0.081 1.08l-0.67 0.84a0.223 0.223 0 0 0 -0.049 0.14v1.454Z"
                    stroke-width="1"
                  ></path>
                  <path
                    id="Vector_2"
                    // stroke="#000000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M7 8.996c1.277 0 1.996 -0.719 1.996 -1.996 0 -1.277 -0.719 -1.996 -1.996 -1.996 -1.277 0 -1.996 0.719 -1.996 1.996 0 1.277 0.719 1.996 1.996 1.996Z"
                    stroke-width="1"
                  ></path>
                </g>
              </svg>
            </div>
            <h2 className="electrolize text-xl tracking-wide font-bold my-3 text-(--main-clr) transition-all duration-300 ease-in-out group-hover:blur-[0.5px] group-hover:text-shadow-[0_0_10px_rgb(238_238_238/0.5)]">
              Advanced Privacy Options
            </h2>
            <p className="noto-sans text-sm font-medium text-(--gray)">
              You decide your secrets password and how long it stays live.
            </p>
          </li>
          {/* Self-erasing links */}
          <li className="features-card group transition-all duration-300 ease-in-out">
            <div className="icon-box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                stroke-linecap="round"
                stroke-linejoin="round"
                id="Eraser--Streamline-Tabler"
                height="1.5em"
                width="1.5em"
                className="stroke-(--main-light-blue)"
              >
                <path
                  d="M19 20H8.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41L11.5 20"
                  stroke-width="2"
                ></path>
                <path d="M18 13.3 11.7 7" stroke-width="2"></path>
              </svg>
            </div>

            <h2 className="electrolize text-xl tracking-wide font-bold my-3 text-(--main-clr) transition-all duration-300 ease-in-out group-hover:blur-[0.5px] group-hover:text-shadow-[0_0_10px_rgb(238_238_238/0.5)]">
              Self-erasing Links
            </h2>
            <p className="noto-sans text-sm font-medium text-(--gray)">
              Once your secret has been accessed, the link will automatically
              erase itself from existence.
            </p>
          </li>
          {/* Fully encrypted  */}
          <li className="features-card group transition-all duration-300 ease-in-out">
            <div className="icon-box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-0.5 -0.5 16 16"
                fill="none"
                id="Key-Line--Streamline-Majesticons"
                height="1.5em"
                width="1.5em"
                className="stroke-(--main-light-blue)"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9.375 9.375a3.75 3.75 0 1 0 -3.5893750000000004 -2.6606249999999996L5.625 6.875l-3.566875 3.566875a0.625 0.625 0 0 0 -0.18312499999999998 0.44187499999999996V12.5a0.625 0.625 0 0 0 0.625 0.625h1.25a0.625 0.625 0 0 0 0.625 -0.625 0.625 0.625 0 0 1 0.625 -0.625 0.625 0.625 0 0 0 0.625 -0.625 0.625 0.625 0 0 1 0.625 -0.625h0.36624999999999996a0.625 0.625 0 0 0 0.44187499999999996 -0.18312499999999998L8.125 9.375l0.16062500000000002 -0.16062500000000002A3.7493749999999997 3.7493749999999997 0 0 0 9.375 9.375zm1.25 -3.75a1.25 1.25 0 0 0 -1.25 -1.25"
                  stroke-width="1"
                ></path>
              </svg>
            </div>

            <h2 className="electrolize text-xl tracking-wide font-bold my-3 text-(--main-clr) transition-all duration-300 ease-in-out group-hover:blur-[0.5px] group-hover:text-shadow-[0_0_10px_rgb(238_238_238/0.5)]">
              Fully Encrypted
            </h2>
            <p className="noto-sans text-sm font-medium text-(--gray)">
              Both in your browser and in our database, your secret stays fully
              encrypted at all times.
            </p>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Features;
