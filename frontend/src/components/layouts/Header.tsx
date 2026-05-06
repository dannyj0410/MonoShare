import { m, type Variants } from "framer-motion";
import { NavLink } from "react-router-dom";

const MotionNavLink = m.create(NavLink);
const headerVariants: Variants = {
  hidden: {
    opacity: 0,
    y: -40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: "easeInOut",
      type: "spring",
    },
  },
};

const Header = () => {
  return (
    <header className="flex w-full items-center justify-center absolute">
      <MotionNavLink
        to="/"
        initial="hidden"
        animate="show"
        viewport={{ once: true }}
        variants={headerVariants}
        className={({ isActive }) =>
          `${
            isActive
              ? "bg-gray-500/15 cursor-default"
              : "bg-none cursor-pointer"
          } text-center mt-7 tracking-wider text-sm text-(--white) blur-[0.5px] z-50 px-2 py-0.5 rounded-lg hover:bg-gray-500/15 transition-colors duration-400 `
        }
      >
        MonoShare
      </MotionNavLink>
    </header>
  );
};

export default Header;
