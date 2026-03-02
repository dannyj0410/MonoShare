interface EmailInputProps {
  email: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus: () => void;
}

const EmailInput = ({
  email,
  error,
  onChange,
  onBlur,
  onFocus,
}: EmailInputProps) => {
  return (
    <div className="flex flex-col noto-sans mt-6 gap-1">
      <p className="font-light text-sm">Email</p>

      <div
        className={`${error ? "border-red-400 outline-3 outline-red-600/25 hover:bg-red-500/5" : "border-gray-400/20 hover:border-gray-400/30 focus-within:bg-blue-300/10"} mb-px group flex gap-2 items-center border px-3 rounded-xl duration-200 focus-within:border-(--main-light-blue) focus-within:hover:border-(--main-light-blue) focus-within:outline-3 focus-within:outline-cyan-600/30`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#a1a1a1"
          strokeLinecap="round"
          strokeLinejoin="round"
          id="Mail--Streamline-Tabler"
          height="20"
          width="20"
          className={`group-focus-within:stroke-(--main-light-blue) ${error && "stroke-red-500"}`}
        >
          <desc>Mail Streamline Icon: https://streamlinehq.com</desc>
          <path
            d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2H5a2 2 0 0 1 -2 -2V7z"
            strokeWidth="2"
          ></path>
          <path d="m3 7 9 6 9 -6" strokeWidth="2"></path>
        </svg>
        <input
          type="email"
          name="email"
          placeholder="example@gmail.com"
          className="text-sm w-full text-(--gray) outline-0 py-2"
          value={email}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      </div>
      <div className="h-4">
        {error && (
          <p className="font-light tracking-wide text-xs ml-2 text-red-400">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default EmailInput;
