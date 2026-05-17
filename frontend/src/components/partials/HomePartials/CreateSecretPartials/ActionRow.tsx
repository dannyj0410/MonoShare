import { memo } from "react";
import { Link } from "react-router-dom";
import AuthActions from "./AuthActions";
import ThickSimpleArrowIcon from "../../../icons/ThickSimpleArrowIcon";

// extract & memoize dropdown svg used in multiple places
const ActionRow = memo(function ActionRow({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  return (
    <div className="flex max-xs:flex-col-reverse max-sm gap-5 items-center justify-between w-140 max-md:w-[90vw] my-8">
      {isAuthenticated && <MySecretsLink />}

      {!isAuthenticated && <AuthActions />}
    </div>
  );
});

export default ActionRow;

export const MySecretsLink = () => {
  return (
    <Link
      to="/my-secrets"
      className="flex max-md:w-[90vw] items-center justify-center relative overflow-hidden py-6.5 w-50 bg-[#3F67E1] cursor-pointer rounded-lg duration-300 transition-colors hover:bg-[#1f4ad6] hover:outline-(--white) hover:outline-3"
    >
      <span className="electrolize font-bold tracking-wider ml-2.5 max-md:text-lg">
        My Secrets
      </span>
      <ThickSimpleArrowIcon />
    </Link>
  );
};
