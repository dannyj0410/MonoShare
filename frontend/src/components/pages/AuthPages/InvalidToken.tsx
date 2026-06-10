import { Link } from "react-router-dom";

type TokenType = "emailVerification" | "resetPassword";

const InvalidTokenConfig = {
  emailVerification: {
    title: "Invalid Email Verification Link",
    info: "This verification link is missing a token. Please click the link directly from the email we sent you.",
    link: "/",
    linkText: "Back to Home",
  },
  resetPassword: {
    title: "Invalid Reset Link",
    info: "This password reset link is missing a token. Please click the link directly from the email we sent you.",
    link: "/forgot-password",
    linkText: "Request a new link",
  },
};

const InvalidToken = ({ type }: { type: TokenType }) => {
  const cfg = InvalidTokenConfig[type];
  return (
    <main className="flex flex-col items-center justify-center min-h-[70vh] px-4">
      <title>{cfg.title} | MonoShare</title>
      <meta name="robots" content="noindex, follow" />
      <div className="w-full max-w-md p-8 rounded-2xl bg-(--white)/2 border border-(--white)/8 backdrop-blur-md flex flex-col items-center text-center shadow-2xl">
        {/* Warning Icon */}
        <div className="mb-8 mt-6 p-2 rounded-full bg-red-500/15 text-red-500 ring-8 ring-red-500/10">
          <svg
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="electrolize text-2xl font-bold tracking-wide text-(--white) mb-3">
          {cfg.title}
        </h1>

        <p className="noto-sans text-(--gray) text-sm leading-relaxed max-w-sm mb-8">
          {cfg.info}
        </p>

        <Link
          to={cfg.link}
          className="noto-sans text-sm px-2.25 py-1 font-medium rounded-lg border text-(--white)/90 border-(--gray)/30 bg-(--white)/10 hover:text-(--white) hover:bg-(--white)/12"
        >
          {cfg.linkText}
        </Link>
      </div>
    </main>
  );
};

export default InvalidToken;
