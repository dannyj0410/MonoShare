import { Link } from "react-router-dom";
import AuthCTA from "./AuthCTA";

const AuthActions = () => {
  return (
    <>
      <SignInLink />
      <AuthCTA /> {/* + Create Account Link */}
    </>
  );
};

export default AuthActions;

const SignInLink = () => {
  return (
    <Link
      to="/sign-in"
      className="group relative overflow-hidden action-btn text-xl h-20 w-65 border-4 rounded-xl arvo"
    >
      <span>Sign in</span>
      <div className="absolute inset-0 flex h-full w-full justify-center transform-[skew(-5deg)_translateX(-100%)] group-hover:duration-600 group-hover:transform-[skew(-30deg)_translateX(100%)]">
        <div className="relative h-full w-15 bg-(--white)/20" />
      </div>
    </Link>
  );
};
