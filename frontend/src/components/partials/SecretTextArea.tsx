import EraseButton from "./EraseButton";

const SecretTextArea = ({
  status,
  created,
}: {
  status: string;
  created?: boolean;
}) => {
  const secretText = created
    ? "Your skype password is 123123!"
    : status === "VIEWED"
      ? "empty."
      : "*!kuSL%*Ad1#oL$*RtV!&*mlUaPl^HSV@!&*$DSAlpoQm.^&";
  return (
    <div className="flex flex-col">
      <div className="flex electrolize px-5 pt-7 pb-1 text-xs sm:text-sm text-(--gray)">
        <p>
          {created
            ? "You will only see this once."
            : status === "VIEWED"
              ? "Your secret has been viewed and erased."
              : "Your secret is fully encrypted."}
        </p>
      </div>
      <textarea
        readOnly
        name="secret-content"
        className={`
    bg-(--main-dark-blue-40) px-4 py-3 min-h-40 max-w-180 
    field-sizing-content rounded-md noto-sans resize-none border-2 
    border-white/5 outline-0
    ${
      !created && status !== "VIEWED"
        ? "text-transparent shadow-none select-none pointer-events-none"
        : "text-(--white)"
    }
  `}
        style={
          !created && status !== "VIEWED"
            ? { textShadow: "0 0 7px rgba(255,255,255,1)" }
            : {}
        }
        defaultValue={secretText}
      ></textarea>

      <EraseButton status={status} />
    </div>
  );
};

export default SecretTextArea;
