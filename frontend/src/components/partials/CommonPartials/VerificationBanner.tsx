import { useAuthCheck } from "../../../hooks/authHooks/useAuthCheck";
import { useResendVerification } from "../../../hooks/authHooks/useResendVerification";

const VerificationBanner = () => {
  const { user, isAuthenticated } = useAuthCheck();
  const { mutate: resend, isPending } = useResendVerification();
  if (!isAuthenticated || !user || user.emailVerified) return null;

  return (
    <div className="w-full flex items-center justify-center gap-3 px-4 py-2 text-sm border-t border-(--main-light-blue)/20 bg-(--main-light-blue)/10 max-md:bg-(--main-dark-blue) z-20 fixed bottom-0 duration-300 md:opacity-70 hover:opacity-100">
      <p className="noto-sans text-(--main-light-blue) max-md:text-xs">
        Please verify your email address to prove your identity and unlock all
        features.
      </p>
      <button
        onClick={() => resend()}
        disabled={isPending}
        className="noto-sans text-(--gray) underline underline-offset-2 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
      >
        {isPending ? "Sending…" : "Resend email"}
      </button>
    </div>
  );
};

export default VerificationBanner;
