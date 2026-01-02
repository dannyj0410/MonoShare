const Hero = () => {
  return (
    <main className="text-center mt-75 mb-100 z-10">
      <div className="mb-23 relative cursor-default">
        <div className="hero-glow" />
        <h1 className="text-5xl mb-3 z-10 blur-[0.3px] text-shadow-[0_0_10px_rgb(238_238_238/0.3)]">
          Your Shared Secret
        </h1>
        <h1 className="text-5xl font-bold text-(--main-light-blue) hero-text-glow z-10">
          Delivered. Viewed. Deleted.
        </h1>
      </div>

      <div className="flex flex-col justify-center items-center gap-5">
        <p className="text-(--gray) text-lg electrolize blur-[0.5px] cursor-default">
          The safest choice for discrete information sharing.
        </p>

        <button className="main-btn group relative overflow-hidden border-t-2 border-transparent duration-300 hover:scale-104 hover:border-t-2 hover:border-t-[rgba(255,255,255,0.3)]">
          <span className="electrolize font-bold tracking-wider">Launch</span>
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
      </div>
    </main>
  );
};

export default Hero;
