interface ReceiverEmailInputProps {
  receiverEmail: string;
  error?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

const ReceiverEmailInputField = ({
  receiverEmail,
  error,
  onChange,
  onBlur,
  onClear,
}: ReceiverEmailInputProps) => {
  return (
    <div
      className={`pl-3 w-140 group ${error ? "input-box-red" : "input-box"}`}
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
          className={`${!receiverEmail && "opacity-0"}`}
          onClick={() => receiverEmail && onClear()}
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
        placeholder="Send to an email"
        className="p-3 text-xs placeholder-(--white) focus:outline-0 w-full"
        value={receiverEmail}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default ReceiverEmailInputField;
