import { useAuthCheck } from "../../../hooks/authHooks/useAuthCheck";
import { useLogout } from "../../../hooks/authHooks/useLogout";
import Spinner from "../../loaders/Spinner";

const UserAndLogout = () => {
  const { user, isAuthenticated } = useAuthCheck();
  const { mutate: logoutMutate, isPending: isLoggingOut } = useLogout();

  if (!isAuthenticated && !isLoggingOut && !user) {
    return;
  }

  const displayName = user
    ? user.email.substring(0, user!.email.indexOf("@"))
    : "";

  return (
    <div className="h-70 w-140 flex flex-col fixed pl-7 pb-4 left-0 bottom-0 items-start justify-end electrolize text-center tracking-wider text-md text-(--gray) blur-[0.5px] rounded-md transition-all duration-600 ease-in-out opacity-50 hover:opacity-100 z-0">
      <div
        className="flex gap-1 items-center text-left group cursor-pointer"
        onClick={() => logoutMutate()}
      >
        <p className="rounded-b-md group-hover:text-(--white)">
          {isLoggingOut ? "Logging out " : "Logout"}
        </p>
        {isLoggingOut ? (
          <Spinner size="size-3.5" thickness="border-2" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            id="Logout--Streamline-Sharp-Material"
            height="18"
            width="18"
          >
            <desc>Logout Streamline Icon: https://streamlinehq.com</desc>
            <path
              fill="#babbbd"
              d="M3 21V3h8.975v1.5H4.5v15h7.475v1.5H3Zm13.65 -4.625 -1.075 -1.075 2.55 -2.55H9v-1.5h9.075l-2.55 -2.55 1.075 -1.075 4.4 4.4 -4.35 4.35Z"
              strokeWidth="0.5"
              className="group-hover:fill-(--white)"
            ></path>
          </svg>
        )}
      </div>
      <h1 className="">
        {user ? "Welcome, " : "Goodbye!"}
        <span className="text-(--main-light-blue)">{displayName}</span>
      </h1>
    </div>
  );
};

export default UserAndLogout;
