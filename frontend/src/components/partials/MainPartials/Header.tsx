import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  return (
    <div className="flex w-full items-center justify-center absolute">
      <Link
        to="/"
        className={`${
          location.pathname === "/"
            ? "bg-gray-500/15 cursor-default"
            : "bg-none cursor-pointer"
        } text-center mt-7 tracking-wider text-sm text-(--white) blur-[0.5px] z-50 px-2 py-0.5 rounded-lg hover:bg-gray-500/15 transition-colors duration-400 `}
      >
        MonoShare
      </Link>
    </div>
  );
};

export default Header;
