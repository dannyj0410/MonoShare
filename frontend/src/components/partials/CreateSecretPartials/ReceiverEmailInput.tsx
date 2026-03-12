import { useState } from "react";

interface ReceiverEmailInputProps {
  receiverEmail: string;
  error?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

const ReceiverEmailInputField = ({
  receiverEmail,
  error,
  onChange,
  onClear,
}: ReceiverEmailInputProps) => {
  const [placeholderText, setPlaceholderText] = useState("Require Account?");

  return (
    <div
      className={`pl-3 w-140 group ${error ? "input-box-red" : "input-box"} ${!receiverEmail && "cursor-pointer opacity-60 focus-within:opacity-100 hover:opacity-100"}`}
    >
      <label
        htmlFor="receiverEmail"
        className={`${error ? "checkbox-red" : "checkbox"}`}
      >
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="16px"
          width="16px"
          xmlns="http://www.w3.org/2000/svg"
          className={`${(error || error === undefined || !receiverEmail) && "opacity-0"}`}
          onClick={() => !!error && receiverEmail && onClear()}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
      </label>

      <input
        type="text"
        name="receiverEmail"
        id="receiverEmail"
        placeholder={placeholderText}
        className={`p-3 text-xs placeholder-(--white) focus:outline-0 w-full ${!receiverEmail && "focus:cursor-auto hover:cursor-pointer"}`}
        value={receiverEmail}
        onChange={onChange}
        onFocus={() => {
          setPlaceholderText("email@example.com");
        }}
        onBlur={() => {
          setPlaceholderText("Require Account?");
        }}
      />
    </div>
  );
};

export default ReceiverEmailInputField;
