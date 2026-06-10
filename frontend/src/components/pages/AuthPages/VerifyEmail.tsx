import { Link, useSearchParams } from "react-router-dom";
import { useVerifyEmail } from "../../../hooks/authHooks/useVerifyEmail";
import InvalidToken from "./InvalidToken";
import Spinner from "../../loaders/Spinner";
import CheckmarkIcon from "../../icons/CheckmarkIcon";
import { useResendVerification } from "../../../hooks/authHooks/useResendVerification";
import { useState } from "react";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const { isLoading: verificationLoading, isSuccess: verificationSuccess } =
    useVerifyEmail(token);

  if (!token) return <InvalidToken type="emailVerification" />;

  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <title>Email Verification | MonoShare</title>
      <meta name="robots" content="noindex, follow" />

      {verificationLoading ? (
        <Verifying />
      ) : verificationSuccess ? (
        <Verified />
      ) : (
        <FailedVerification />
      )}
    </main>
  );
};

export default VerifyEmail;

const Verifying = () => {
  return (
    <div className="w-full max-w-md flex flex-col items-center gap-4 text-center">
      <Spinner size="size-10" thickness="border-4" />
      <h1 className="noto-sans text-3xl font-semibold text-(--white) animate-pulse mt-4">
        Verifying your email address...
      </h1>
      <p className="noto-sans text-(--gray) text-md">Please wait a moment.</p>
    </div>
  );
};

const Verified = () => {
  return (
    <div className="w-full max-w-md flex flex-col items-center gap-6 text-center">
      <div className="flex items-center gap-2">
        <CheckmarkIcon className="size-8 stroke-emerald-500" />
        <h1 className="electrolize text-2xl font-bold text-(--white)">
          Email Verified
        </h1>
      </div>
      <p className="noto-sans text-(--gray) text-sm leading-relaxed">
        Your email address ownership has been confirmed. <br />
        Your account is now fully active.
      </p>
      <Link
        to="/"
        className="noto-sans text-sm px-2.25 py-1 font-medium rounded-lg border text-(--white)/90 border-(--gray)/30 bg-(--white)/10 hover:text-(--white) hover:bg-(--white)/12"
      >
        Go to MonoShare
      </Link>
    </div>
  );
};

const FailedVerification = () => {
  const { mutate: resend, isPending } = useResendVerification();
  const [resent, setResent] = useState(false);
  return (
    <div className="w-full max-w-md flex flex-col items-center gap-3 text-center">
      <div className="flex gap-2 items-center">
        {/* X icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 10 10"
          fill="none"
          id="Close--Streamline-Majesticons"
          height="40px"
          width="40px"
          className="stroke-red-400 "
        >
          <desc>Close Streamline Icon: https://streamlinehq.com</desc>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="0.8333"
            d="M5 5 2.916666666666667 2.916666666666667m2.0833333333333335 2.0833333333333335 2.0833333333333335 2.0833333333333335m-2.0833333333333335 -2.0833333333333335 2.0833333333333335 -2.0833333333333335m-2.0833333333333335 2.0833333333333335 -2.0833333333333335 2.0833333333333335"
          ></path>
        </svg>
        {/* Title */}
        <h1 className="electrolize text-2xl font-bold text-(--white)">
          Verification Failed
        </h1>
      </div>
      <p className="noto-sans text-(--gray) text-sm leading-relaxed">
        Your verification link may have expired.
      </p>
      <div className="flex gap-3 flex-wrap items-center mt-2">
        <Link
          to="/"
          className="noto-sans text-sm px-2.25 py-1 font-medium rounded-lg border text-(--white)/90 border-(--gray)/30 bg-(--white)/10 hover:text-(--white) hover:bg-(--white)/12"
        >
          Return Home
        </Link>
        <button
          onClick={() => {
            resend();
            setResent(true);
          }}
          disabled={isPending || resent}
          className={`noto-sans text-sm px-2.25 py-1 rounded-lg ${resent && !isPending ? "bg-emerald-500 text-(--white) font-bold cursor-not-allowed" : "bg-(--white) text-black font-medium cursor-pointer"} flex items-center gap-2`}
        >
          {isPending && (
            <Spinner size="size-3" thickness="border-1" clr="text-black" />
          )}
          {resent && !isPending
            ? "Email Sent"
            : isPending
              ? "Sending..."
              : "Resend Email"}
        </button>
      </div>
    </div>
  );
};
