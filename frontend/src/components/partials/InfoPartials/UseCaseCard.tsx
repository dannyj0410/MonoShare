import UseCaseDropdown from "./UseCaseDropdown";

const UseCaseCard = () => {
  // RESTORE CENTERING
  return (
    <div className="flex flex-col max-2xl:mt-20 max-md:px-4 px-8 pt-10 max-md:w-[98vw] md:min-w-150 w-150 h-fit rounded-xl bg-linear-to-br from-[#6a89f167] to-[#1f4ad628]">
      {/* Dropdown Field */}
      <p className="electrolize font-bold text-(--white) text-2xl text-center mb-10">
        Use Case
      </p>
      <UseCaseDropdown />

      {/* Why choose us section */}
      <div className="mt-10 flex flex-col bg-[#cdd7df21] border-2 border-white/5 p-5 rounded-lg">
        <h3 className="text-white text-base font-bold mb-4">Why choose us?</h3>
        <ul className="space-y-4">
          {[
            "Prevent credential leaks in email and chat logs",
            "Securely share configurations across teams and organizations",
            "Ensure private keys never live permanently in a database",
          ].map((benefit, index) => (
            <li key={index} className="flex items-start">
              <svg
                className="w-5 h-5 text-(--main-light-blue) shrink-0 mr-3 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span className="text-(--gray) text-sm leading-relaxed">
                {benefit}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-15 text-sm text-center text-(--gray)">
        <span className="text-(--main-light-blue)">MonoShare</span> facilitates
        zero-knowledge, end-to-end encrypted sharing, helping teams reduce the
        risk of exposing plaintext secrets in communication channels, aligning
        with data protection principles in{" "}
        <span className="text-orange-300 font-bold">SOC 2</span> and{" "}
        <span className="text-emerald-300 font-bold">ISO 27001</span>.
      </p>

      {/* Footer Text */}
      <div className="mb-4 mt-10">
        <p className="text-white/80 text-xs text-center px-2">
          Your secrets are encrypted, never stored in logs, and automatically
          deleted after viewing.
        </p>
      </div>
    </div>
  );
};

export default UseCaseCard;
