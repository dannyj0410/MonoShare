import { m, type Variants } from "framer-motion";

const containerVariants: Variants = {
  initial: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const heroVariants: Variants = {
  initial: {
    opacity: 0,
    y: 5,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 2,
      ease: "easeInOut",
      type: "spring",
    },
  },
};

const additionalVariants: Variants = {
  initial: { opacity: 0, y: 3 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

const Hero = ({ scroll }: { scroll: () => void }) => {
  return (
    <m.main
      variants={containerVariants}
      initial="initial"
      animate="show"
      className="text-center pt-75 max-md:pt-50 pb-10 mb-100 z-10 w-full overflow-x-hidden"
    >
      <m.div
        variants={heroVariants}
        className="mb-23 max-md:mb-15 relative cursor-default w-full"
      >
        <div className="hero-glow" />
        <h2 className="text-5xl max-md:text-2xl mb-3 z-10 blur-[0.3px] text-shadow-[0_0_10px_rgb(238_238_238/0.3)]">
          Your Shared Secret
        </h2>
        <h1 className="text-5xl max-md:text-3xl  font-bold text-(--main-light-blue) hero-text-glow z-10">
          Delivered. Viewed. Deleted.
        </h1>
      </m.div>

      <m.div
        variants={additionalVariants}
        className="flex flex-col justify-center items-center gap-5"
      >
        <h3 className="text-(--gray) text-lg max-md:text-base max-md:max-w-[80vw] electrolize blur-[0.5px] cursor-default">
          The safest choice for discrete information sharing.
        </h3>

        <button
          onClick={scroll}
          className="main-btn group relative overflow-hidden py-3 pl-12 px-10 rounded-3xl border-t-2 border-transparent duration-300 hover:scale-104 hover:border-t-2 hover:border-t-[rgba(255,255,255,0.3)]"
        >
          <span className="electrolize font-bold tracking-wider max-md:text-sm">
            Launch
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

          <div className="absolute inset-0 flex h-full w-full justify-center transition-transform duration-300 transform -translate-x-full group-hover:translate-x-full">
            <div className="relative h-full w-30 blur-xl bg-white/60"></div>
          </div>
        </button>
      </m.div>
    </m.main>
  );
};

export default Hero;
