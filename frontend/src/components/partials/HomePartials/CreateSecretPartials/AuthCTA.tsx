import { Link } from "react-router-dom";
import CheckmarkIcon from "../../../icons/CheckmarkIcon";

const AuthCTA = () => {
  return (
    <Link to="/create-account" className="relative overflow-hidden flex group">
      <CreateAccountLink />
      <CTAContent />
    </Link>
  );
};

export default AuthCTA;

const CreateAccountLink = () => {
  return (
    <span className=" flex items-center justify-center bg-(--white) noto-sans text-black font-semibold text-xs h-8 w-30 rounded-sm absolute left-full max-sm:left-34 bottom-1 z-30 group-hover:left-35 group-active:scale-85 duration-200">
      Create Account
    </span>
  );
};

const CTAContent = () => {
  return (
    <div className="flex items-center justify-between p-3 relative h-20 w-65">
      <div className="z-11 absolute w-full h-full top-2 left-2">
        <div className="flex gap-1">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 448 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path>
          </svg>
          <p className="electrolize text-xs font-bold">Account Required</p>
        </div>
      </div>
      <div className="bg-[#01020396] z-10 absolute rounded-lg w-full h-full top-0 left-0 group-hover:bg-[#010203bd] duration-200" />
      <span className="flex items-center justify-center relative overflow-hidden py-3.5 w-40 bg-[#3f67e17a] cursor-pointer rounded-sm">
        <span className="electrolize font-bold tracking-wider ml-2.5">
          My Secrets
        </span>
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="3"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </span>
      <div className="flex flex-col opacity-85 mr-1">
        <div className="flex items-center gap-0.5">
          <CheckmarkIcon className="stroke-[#02a30f] size-4" />
          <p className="electrolize text-xs">timeline</p>
        </div>
        <div className="flex items-center gap-0.5">
          <CheckmarkIcon className="stroke-[#02a30f] size-4" />
          <p className="electrolize text-xs">details</p>
        </div>
        <div className="flex items-center gap-0.5">
          <CheckmarkIcon className="stroke-[#02a30f] size-4" />
          <p className="electrolize text-xs">erase</p>
        </div>
      </div>
    </div>
  );
};
