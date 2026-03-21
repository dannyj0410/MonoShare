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
    <div className="max-md:left-2 max-md:p-2 max-md:bottom-3 max-md:h-fit max-md:w-fit h-70 w-70 fixed md:pl-7 md:pb-4 left-0 bottom-0 flex flex-col-reverse ease-in-out group z-40">
      <div className="w-fit h-fit backdrop-blur-xs rounded-lg border border-white/0 group-hover:border-white/5 max-lg:border-white/4 px-1 py-1 flex flex-col electrolize tracking-wider text-base text-(--gray) blur-[0.5px] max-md:text-sm max-xs:text-xs">
        <div
          className="flex gap-1 items-center group/logout cursor-pointer z-50 w-full px-2 py-0.5 hover:bg-(--main-dark-blue)/25 rounded-md duration-300"
          onClick={() => logoutMutate()}
        >
          <p className="rounded-b-md group-hover/logout:text-(--white) max-sm:text-(--white) opacity-60 group-hover:opacity-100 max-lg:opacity-100 transition-all duration-500">
            {isLoggingOut ? "Logging out " : "Logout"}
          </p>
          {isLoggingOut ? (
            <Spinner size="size-3.5 max-sm:size-2.5" thickness="border-2" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              id="Logout--Streamline-Sharp-Material"
              height="18"
              width="18"
              className="duration-300 group-hover/logout:translate-x-1 opacity-60 group-hover:opacity-100 max-lg:opacity-100 transition-all"
            >
              <desc>Logout Streamline Icon: https://streamlinehq.com</desc>
              <path
                fill="#babbbd"
                d="M3 21V3h8.975v1.5H4.5v15h7.475v1.5H3Zm13.65 -4.625 -1.075 -1.075 2.55 -2.55H9v-1.5h9.075l-2.55 -2.55 1.075 -1.075 4.4 4.4 -4.35 4.35Z"
                strokeWidth="0.5"
                className="group-hover/logout:fill-(--main-light-blue) max-sm:fill-(--white) duration-200 transition-all"
              ></path>
            </svg>
          )}
        </div>
        <h1 className="z-50 px-2 py-0.5 opacity-60 group-hover:opacity-100 max-lg:opacity-100 transition-all duration-500">
          {user ? "Welcome, " : "Goodbye!"}
          <span className="text-(--main-light-blue)">{displayName}</span>
        </h1>
      </div>
    </div>
  );
};

export default UserAndLogout;
