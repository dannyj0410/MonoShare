import { Link } from "react-router-dom";
import { useAuthCheck } from "../../hooks/authHooks/useAuthCheck";

const NotFound = () => {
  const { isAuthenticated } = useAuthCheck();
  const linkLocation = isAuthenticated ? "/my-secrets" : "/sign-in";
  const linkText = isAuthenticated ? "View Secrets" : "Sign In";
  return (
    <>
      <meta name="robots" content="noindex" />
      <div className="flex flex-col items-center pt-30 text-center mx-2">
        <p className="noto-sans text-sm mb-2">404 - Not Found</p>
        <p className="noto-sans text-(--gray)/90 text-sm">
          The page you're looking for doesn't exist.
        </p>
        <p className="noto-sans text-(--gray)/90 text-sm mt-1">
          If you have attempted to view a secret, check the URL for typos or
          missing characters.
        </p>
        <div className="flex gap-2 mt-4 mb-3">
          <Link
            to="/"
            state={{ scrollToCreate: true }}
            className="noto-sans text-sm px-2.25 py-1 rounded-lg bg-(--white) text-black font-medium"
          >
            Create Secret
          </Link>
          <Link
            to={linkLocation}
            className="noto-sans text-sm px-2.25 py-1 font-medium rounded-lg border text-(--white)/90 border-(--gray)/30 bg-white/10 hover:text-(--white) hover:bg-white/12"
          >
            {linkText}
          </Link>
        </div>
        <p className="noto-sans text-(--gray)/90 text-sm">
          Return home?{" "}
          <Link
            to="/"
            className="hover:text-(--white) hover: underline underline-offset-4 cursor-pointer"
          >
            Just click here
          </Link>
        </p>
      </div>
    </>
  );
};

export default NotFound;
