const SpotlightGlow = () => {
  return (
    <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none w-full flex justify-center">
      {/* Left White Glow */}
      <div className="glow-white left-[15%] max-md:hidden" />

      {/* Left Blue Glow */}
      <div className="glow-blue left-[31%] max-md:hidden" />

      {/* Center Main Glow */}
      <div className="glow-center left-1/2" />

      {/* Right Blue Glow */}
      <div className="glow-blue right-[30%] max-md:hidden" />

      {/*Right White Glow  */}
      <div className="glow-white right-[15%] [animation-delay:3s] max-md:hidden" />
    </div>
  );
};

export default SpotlightGlow;
