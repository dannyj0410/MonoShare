import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <section className="flex flex-col items-center min-h-screen pt-30 pb-0 px-4 text-center">
      <title>Something Went Wrong | MonoShare</title>

      <p className="noto-sans text-sm mb-1">500 - Internal Error</p>
      <p className="noto-sans text-(--gray)/90 text-sm">
        Something went wrong.
      </p>

      <p className="noto-sans text-(--gray)/90 text-sm mt-4">
        An unexpected error occurred. This isn't your fault.
      </p>
      <p className="noto-sans text-(--gray)/90 text-sm mt-1">
        Please try refreshing the page or returning home.
      </p>

      <p className="noto-sans text-(--gray)/70 text-xs mt-6 mb-3">
        Your secrets remain encrypted and unaffected.
      </p>

      <nav
        aria-label="Error recovery options"
        className="flex gap-2 flex-wrap justify-center"
      >
        <button
          onClick={() => window.location.reload()}
          className="cursor-pointer noto-sans text-sm px-2.25 py-1 rounded-lg bg-(--white) text-black font-medium"
        >
          Reload page
        </button>
        <Link
          to="/"
          className="noto-sans text-sm px-2.25 py-1 font-medium rounded-lg border text-(--white)/90 border-(--gray)/30 bg-(--white)/10 hover:text-(--white) hover:bg-(--white)/12"
        >
          Return Home
        </Link>
      </nav>
    </section>
  );
};

export default ErrorPage;
