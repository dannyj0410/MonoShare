import { m, LazyMotion } from "framer-motion";
import CommunicateCard from "./CommunicateCard";
import UseCaseCard from "./UseCaseCard";
import { useState } from "react";

const loadFeatures = () =>
  import("framer-motion").then((res) => res.domAnimation);

const InfoSection = () => {
  const [hasEnteredView, setHasEnteredView] = useState(false);
  return (
    <LazyMotion features={loadFeatures}>
      <m.section
        onViewportEnter={() => {
          setHasEnteredView(true);
        }}
        viewport={{ once: true, amount: 0.1 }}
        className="flex flex-col items-center usecase-bg w-full pt-20 md:px-20"
      >
        <h2 className="text-4xl max-sm:text-2xl mt-10 mb-10 arvo m-auto">
          What we do.
        </h2>
        {/* cards + usecase container */}
        {hasEnteredView ? (
          <div className="max-2xl:flex-col flex-wrap flex justify-center items-center gap-10 max-w-screen mb-40 cursor-default">
            {/* all 3 cards wrapper */}
            <div className="max-lg:flex-col flex gap-10">
              {/* cards 1-2 column wrapper */}
              <div className="flex flex-col gap-10">
                {/* card1 */}
                <SecurityCard />
                {/* card2 */}
                <CertaintyCard />
              </div>
              {/* card3 */}
              <div className="flex flex-col gap-3 justify-center">
                <CommunicateCard />
                <FreeUsageCard />
              </div>
            </div>

            <UseCaseCard />
          </div>
        ) : (
          <div className="h-225 w-full" />
        )}
      </m.section>
    </LazyMotion>
  );
};

const SecurityCard = () => {
  return (
    <div className="flex flex-col gap-2 max-xs:max-w-screen w-120 h-100 max-xs:min-h-fit border border-[#042741] rounded-xl bg-linear-to-br from-[#0c325062] to-[#0804411c] overflow-hidden">
      <div className="px-8">
        <p className="electrolize font-bold text-(--white) text-2xl pt-10 pb-2">
          Instant Security
        </p>
        <div className="flex flex-col text-lg">
          <div className="flex gap-2 items-center">
            <p className="electrolize text-(--gray)/80">
              Use{" "}
              <span className="text-(--main-light-blue) arvo">MonoShare </span>
              to
            </p>
            <button className="create-btn scale-85 pointer-events-none">
              Create
            </button>
          </div>
          <p className="electrolize text-(--gray)/80">
            and <span className="text-(--white)/80 font-bold">securely</span>{" "}
            share information.
          </p>
        </div>
      </div>
      <div className="w-full h-full bg-[url('/clrbg.webp')] mask-[linear-gradient(to_bottom,transparent_0%,black_5%)] bg-cover flex flex-col items-center">
        <div className="flex items-center gap-2 mt-10">
          <div className="flex max-xs:max-w-screen w-fit rounded-md border-white/5 backdrop-blur-xs border-4">
            <p className="bg-[#00111fd3] max-xs:wrap-break-word px-3 py-2 rounded-md noto-sans text-sm max-xs:text-xs text-(--gray)">
              https://
              <span className="text-(--white)">monoshare.com</span>/
              <span className="text-blue-200">yoursecretid</span>#
              <span className="text-red-200">securekey</span>
            </p>
          </div>
          <div className="max-xs:hidden flex items-center w-fit rounded-md border-white/5 backdrop-blur-xs border-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              id="Documents-Fill--Streamline-Mingcute-Fill"
              className="bg-[#00111fd3] rounded-md px-3 py-2 size-5 box-content"
            >
              <desc>
                Documents Fill Streamline Icon: https://streamlinehq.com
              </desc>
              <g fill="none" fillRule="evenodd">
                <path
                  d="M16 0v16H0V0h16ZM8.395333333333333 15.505333333333333l-0.007333333333333332 0.0013333333333333333 -0.047333333333333324 0.023333333333333334 -0.013333333333333332 0.0026666666666666666 -0.009333333333333332 -0.0026666666666666666 -0.047333333333333324 -0.023333333333333334c-0.006666666666666666 -0.0026666666666666666 -0.012666666666666666 -0.0006666666666666666 -0.016 0.003333333333333333l-0.0026666666666666666 0.006666666666666666 -0.011333333333333334 0.2853333333333333 0.003333333333333333 0.013333333333333332 0.006666666666666666 0.008666666666666666 0.06933333333333333 0.049333333333333326 0.009999999999999998 0.0026666666666666666 0.008 -0.0026666666666666666 0.06933333333333333 -0.049333333333333326 0.008 -0.010666666666666666 0.0026666666666666666 -0.011333333333333334 -0.011333333333333334 -0.2846666666666666c-0.0013333333333333333 -0.006666666666666666 -0.005999999999999999 -0.011333333333333334 -0.011333333333333334 -0.011999999999999999Zm0.17666666666666667 -0.07533333333333334 -0.008666666666666666 0.0013333333333333333 -0.12333333333333332 0.062 -0.006666666666666666 0.006666666666666666 -0.002 0.007333333333333332 0.011999999999999999 0.2866666666666666 0.003333333333333333 0.008 0.005333333333333333 0.004666666666666666 0.134 0.062c0.008 0.0026666666666666666 0.015333333333333332 0 0.019333333333333334 -0.005333333333333333l0.0026666666666666666 -0.009333333333333332 -0.02266666666666667 -0.4093333333333333c-0.002 -0.008 -0.006666666666666666 -0.013333333333333332 -0.013333333333333332 -0.014666666666666665Zm-0.4766666666666666 0.0013333333333333333a0.015333333333333332 0.015333333333333332 0 0 0 -0.018 0.004l-0.004 0.009333333333333332 -0.02266666666666667 0.4093333333333333c0 0.008 0.004666666666666666 0.013333333333333332 0.011333333333333334 0.016l0.009999999999999998 -0.0013333333333333333 0.134 -0.062 0.006666666666666666 -0.005333333333333333 0.0026666666666666666 -0.007333333333333332 0.011333333333333334 -0.2866666666666666 -0.002 -0.008 -0.006666666666666666 -0.006666666666666666 -0.12266666666666666 -0.06133333333333333Z"
                  strokeWidth="0.6667"
                ></path>
                <path
                  fill="currentColor"
                  d="M9.333333333333332 1.3333333333333333v3.6666666666666665A1 1 0 0 0 10.333333333333332 6H14v4.666666666666666a1.3333333333333333 1.3333333333333333 0 0 1 -1.3333333333333333 1.3333333333333333h-1.3333333333333333v1.3333333333333333a1.3333333333333333 1.3333333333333333 0 0 1 -1.3333333333333333 1.3333333333333333H4a1.3333333333333333 1.3333333333333333 0 0 1 -1.3333333333333333 -1.3333333333333333V5.333333333333333a1.3333333333333333 1.3333333333333333 0 0 1 1.3333333333333333 -1.3333333333333333h1.3333333333333333V2.6666666666666665a1.3333333333333333 1.3333333333333333 0 0 1 1.3333333333333333 -1.3333333333333333h2.6666666666666665ZM5.333333333333333 5.333333333333333H4v8h6v-1.3333333333333333h-3.333333333333333a1.3333333333333333 1.3333333333333333 0 0 1 -1.3333333333333333 -1.3333333333333333V5.333333333333333Zm5.333333333333333 -3.971333333333333a1.3333333333333333 1.3333333333333333 0 0 1 0.6666666666666666 0.362L13.609333333333334 4a1.3333333333333333 1.3333333333333333 0 0 1 0.362 0.6666666666666666H10.666666666666666V1.362Z"
                  strokeWidth="0.6667"
                ></path>
              </g>
            </svg>
          </div>
        </div>
        <div className="relative p-1 mt-5 mx-8 rounded-md overflow-hidden group">
          <div className="absolute inset-[-1000%] animate-[spin_10s_linear_infinite] will-change-transform bg-[conic-gradient(from_0deg,#00b4d8,#05134E,#0077b6,#07004b,#00b4d8)]" />
          <p className="noto-sans relative backdrop-blur-xs bg-[#001525ce] text-sm text-center text-(--gray) p-1 py-1.5 rounded-sm">
            You hold the key. Stored only in the generated url's hash, not even
            we can decrypt your secret.
          </p>
        </div>
      </div>
    </div>
  );
};

const CertaintyCard = () => {
  return (
    <div className="flex flex-col w-120 max-xs:max-w-screen h-100 max-xs:min-h-fit border border-[#042741] rounded-xl bg-linear-to-br from-[#0c325062] to-[#0804411c]">
      <p className="electrolize font-bold text-(--white) text-2xl pt-10 px-8 pb-2">
        Absolute Certainty
      </p>
      <p className="noto-sans text-(--gray)/80 text-lg px-8">
        Sign in to gain complete control over your secrets, track their status,
        and erase them through our exclusive dashboard.
      </p>
      <div className="flex rounded-xl opacity-90 mx-2 mt-8 mask-[linear-gradient(to_bottom,black_95%,transparent_100%)]">
        <img src="my-secrets.webp" alt="my secrets page dashboard preview" />
      </div>
    </div>
  );
};

const FreeUsageCard = () => {
  return (
    <div className="flex flex-col w-120 max-xs:max-w-screen h-fit py-5 rounded-xl bg-[#cdd7df21] border-2 border-white/5">
      <p className="noto-sans text-(--gray) text-sm px-5">
        Core features will always remain free for personal use. No account
        creation or credit card is required to start sharing safely today.
      </p>
    </div>
  );
};

export default InfoSection;
