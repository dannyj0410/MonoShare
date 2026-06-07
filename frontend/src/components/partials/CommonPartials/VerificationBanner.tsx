import { useAuthCheck } from "../../../hooks/authHooks/useAuthCheck";
import { useResendVerification } from "../../../hooks/authHooks/useResendVerification";

const VerificationBanner = () => {
  const { user, isAuthenticated } = useAuthCheck();
  const { mutate: resend, isPending } = useResendVerification();
  if (!isAuthenticated || !user || user.emailVerified) return null;

  return (
    <div className="w-full flex items-center justify-center gap-3 px-4 py-2 text-sm border-t border-amber-500/20 bg-amber-500/10 z-20 fixed bottom-0">
      <p className="noto-sans text-amber-300/90">
        Please verify your email address to unlock all features.
      </p>
      <button
        onClick={() => resend()}
        disabled={isPending}
        className="noto-sans text-amber-200 underline underline-offset-2 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
      >
        {isPending ? "Sending…" : "Resend email"}
      </button>
    </div>
  );
};

export default VerificationBanner;
