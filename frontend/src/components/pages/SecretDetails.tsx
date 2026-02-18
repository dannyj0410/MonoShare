import { useEffect, useState } from "react";
import BackButton from "../partials/BackButton";
import { useSecretDetails } from "../../hooks/secretHooks/useSecretDetails";
import { useLocation, useParams } from "react-router-dom";
import Timeline from "../partials/Timeline";
import SecretTextArea from "../partials/SecretTextArea";

const SecretDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const created = location.state?.secret.created || false;
  const [copyClicked, setCopyClicked] = useState(false);
  useEffect(() => {
    return () => {
      window.history.replaceState({}, document.title);
    };
  }, []);

  useEffect(() => {
    if (!copyClicked) return;
    const timer = setTimeout(() => {
      setCopyClicked(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, [copyClicked]);

  const stateSecret = location.state?.secret;
  const hasState = !!stateSecret;
  const {
    data: fetchedSecret,
    isPending,
    isError,
  } = useSecretDetails(id!, { enabled: !hasState });

  const secret = stateSecret || fetchedSecret;

  if (!hasState && (isError || !secret || isPending)) {
    return (
      <div className="flex flex-col mx-auto pt-40 p-5 w-188 min-w-120 max-w-210">
        <div className="flex items-center justify-center">
          <div className="text-(--gray) electrolize font-bold">Loading...</div>
        </div>
      </div>
    );
  }
  //todo: show gray boxes if no secret instead of loading.
  return (
    <div className="flex flex-col mx-auto pt-40 p-5 w-188 min-w-120 max-w-210">
      <>
        <div className="flex items-center justify-between w-full relative mb-5">
          <BackButton />
          <h1
            className={`electrolize font-bold ${secret.status === "ACTIVE" ? "text-(--main-light-blue)" : secret.status === "VIEWED" ? "text-green-500" : "text-red-500"}`}
          >
            {secret.status}
          </h1>
        </div>
        {secret.receiverEmail && (
          <div className="flex items-center gap-1 pl-5 mb-0.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#babbbd"
              strokeLinecap="round"
              strokeLinejoin="round"
              id="Share--Streamline-Lucide"
              height="14px"
              width="14px"
              className="h-4 w-4 sm:h-5 sm:w-6"
            >
              <desc>Share Streamline Icon: https://streamlinehq.com</desc>
              <path
                d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-8"
                strokeWidth="2"
              ></path>
              <path d="m16 6 -4 -4 -4 4" strokeWidth="2"></path>
              <path d="m12 2 0 13" strokeWidth="2"></path>
            </svg>
            <p className="electrolize mb-0.5 sm:mb-0 text-sm sm:text-base text-(--gray) tracking-tight">
              Was sent to:{" "}
              <span className="font-bold text-(--main-light-blue)">
                {secret.receiverEmail}
              </span>
            </p>
          </div>
        )}
        {created && (
          <div className="flex items-center gap-1 pl-5">
            <svg
              stroke="#02a30f"
              fill="none"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="16px"
              width="16px"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 sm:h-6 sm:w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <p className="electrolize mb-0.5 sm:mb-0 text-sm sm:text-base text-[#02a30f] tracking-tight">
              Your secret has been created successfully!
            </p>
          </div>
        )}
        {/* Secret Link */}
        {created && (
          <>
            <div
              className={`flex items-center justify-center rounded-md border-3 mb-2 transition-all duration-600 ease-in-out ${
                copyClicked
                  ? "border-green-500 bg-green-500/15"
                  : "border-(--main-dark-blue-40) bg-blue-300/5"
              } h-fit`}
            >
              {/*//* SECRET URL */}
              <p className="arvo text-nowrap overflow-hidden text-sm sm:text-base text- w-full h-fit px-5 bg-transparent">
                {secret.shareUrl}#{secret.key}
              </p>
              <div
                onClick={() => {
                  navigator.clipboard.writeText(secret.shareUrl);
                  setCopyClicked(true);
                }}
                className={`group cursor-pointer h-12 w-15 border-3 border-hidden flex items-center justify-center rounded-r-[3px]  transition-all duration-600 ease-in-out ${
                  copyClicked ? "bg-green-500 " : "bg-(--main-dark-blue-40)"
                }
            `}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  id="Documents-Fill--Streamline-Mingcute-Fill"
                  height="24"
                  width="24"
                  className={`${
                    copyClicked ? "hidden" : "block"
                  } group-hover:opacity-70`}
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
                      fill="#eee"
                      d="M9.333333333333332 1.3333333333333333v3.6666666666666665A1 1 0 0 0 10.333333333333332 6H14v4.666666666666666a1.3333333333333333 1.3333333333333333 0 0 1 -1.3333333333333333 1.3333333333333333h-1.3333333333333333v1.3333333333333333a1.3333333333333333 1.3333333333333333 0 0 1 -1.3333333333333333 1.3333333333333333H4a1.3333333333333333 1.3333333333333333 0 0 1 -1.3333333333333333 -1.3333333333333333V5.333333333333333a1.3333333333333333 1.3333333333333333 0 0 1 1.3333333333333333 -1.3333333333333333h1.3333333333333333V2.6666666666666665a1.3333333333333333 1.3333333333333333 0 0 1 1.3333333333333333 -1.3333333333333333h2.6666666666666665ZM5.333333333333333 5.333333333333333H4v8h6v-1.3333333333333333h-3.333333333333333a1.3333333333333333 1.3333333333333333 0 0 1 -1.3333333333333333 -1.3333333333333333V5.333333333333333Zm5.333333333333333 -3.971333333333333a1.3333333333333333 1.3333333333333333 0 0 1 0.6666666666666666 0.362L13.609333333333334 4a1.3333333333333333 1.3333333333333333 0 0 1 0.362 0.6666666666666666H10.666666666666666V1.362Z"
                      strokeWidth="0.6667"
                    ></path>
                  </g>
                </svg>

                <svg
                  stroke="#eee"
                  fill="none"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="24px"
                  width="24px"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${copyClicked ? "block" : "hidden"}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
            </div>
            <div className="flex gap-1 electrolize ml-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                height="24"
                width="24"
                className="h-4 w-4 sm:h-6 sm:w-6"
              >
                <g id="Shield">
                  <path
                    id="Union"
                    fill="#76c4ff"
                    d="M11.7236 2.03903c0.2106 -0.06056 0.4361 -0.05039 0.6416 0.03028l7 2.75 0.1377 0.0664c0.3044 0.17705 0.4971 0.5046 0.4971 0.86426V11.25c-0.0001 4.903 -3.0925 9.1031 -7.6719 10.6943 -0.2125 0.0739 -0.4437 0.0739 -0.6562 0C7.09253 20.3531 4.00006 16.153 4 11.25V5.74997l0.01172 -0.15234c0.05354 -0.34795 0.28838 -0.64683 0.62305 -0.77832l7.00003 -2.75zM6 6.43064V11.25c0.00006 3.9099 2.38495 7.2836 6 8.6846 3.615 -1.401 5.9999 -4.7747 6 -8.6846V6.43064l-6 -2.35743z"
                    strokeWidth="1"
                  ></path>
                </g>
              </svg>
              <p className="text-sm sm:text-base text-(--gray) tracking-tighter">
                Share this link privately with the intended recipient.
              </p>
            </div>
          </>
        )}
        <SecretTextArea
          status={secret.status}
          created={created}
          text={secret.text}
        />
        <Timeline secret={secret} />
      </>
    </div>
  );
};

export default SecretDetails;
