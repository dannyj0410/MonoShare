import { memo, useState } from "react";
import CheckmarkIcon from "../../icons/CheckmarkIcon";

interface ReceiverEmailInputProps {
  receiverEmail: string;
  error?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: (fieldName: string) => void;
}

const ReceiverEmailInputField = memo(function ReceiverEmailInputField({
  receiverEmail,
  error,
  onChange,
  onClear,
}: ReceiverEmailInputProps) {
  const [placeholderText, setPlaceholderText] = useState("Require Account?");

  return (
    <div
      className={`pl-3 w-140 max-md:w-[90vw] group ${error ? "input-box-red" : "input-box"} ${!receiverEmail && "cursor-pointer opacity-60 focus-within:opacity-100 hover:opacity-100"}`}
    >
      <label
        htmlFor="receiverEmail"
        className={`${error ? "checkbox-red" : "checkbox"}`}
        onClick={() => receiverEmail && onClear("receiverEmail")}
      >
        <CheckmarkIcon
          className={`size-3.75 stroke-(--white) ${(error || error === undefined || !receiverEmail) && "opacity-0"}`}
        />
      </label>

      <input
        type="text"
        name="receiverEmail"
        id="receiverEmail"
        placeholder={placeholderText}
        className={`p-3 text-xs placeholder-(--white) focus:outline-0 w-full focus:placeholder-white/40 ${!receiverEmail && "focus:cursor-auto hover:cursor-pointer"}`}
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
});

export default ReceiverEmailInputField;
