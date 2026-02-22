import EraseButton from "./EraseButton";

const SecretTextArea = ({
  status,
  created,
  text,
  passwordProtected,
}: {
  status: string;
  created?: boolean;
  text?: string;
  passwordProtected: boolean;
}) => {
  const secretText =
    created && text
      ? text
      : status !== "ACTIVE"
        ? "empty."
        : "*!kuSL%GYM*Ad1#oL$*RtV!&*ml|EXAMPLE|UaPl^HSV@!&*$DJSDWAlpoQm.%#QzX;P&^";
  return (
    <div className="flex flex-col w-full">
      <div className="flex electrolize px-5 pt-7 pb-1 text-xs sm:text-sm text-(--gray)">
        <p>
          {created
            ? "You will only see this once."
            : status === "VIEWED"
              ? "Your secret has been viewed and erased."
              : status === "EXPIRED"
                ? "Your secret has been erased and is no longer accessible."
                : `Your secret is fully encrypted${passwordProtected ? " and" : "."}`}
          <span className="font-bold">
            {passwordProtected && status === "ACTIVE" && " password protected"}
          </span>
          {passwordProtected && "."}
        </p>
      </div>
      <textarea
        readOnly
        name="secret-content"
        className={`
    bg-(--main-dark-blue-40) px-5 py-3 min-h-40 max-w-180 
    field-sizing-content rounded-md noto-sans resize-none border-2 
    border-white/5 outline-0
    ${
      !created && status === "ACTIVE"
        ? "text-transparent shadow-none select-none pointer-events-none"
        : "text-(--white)"
    }
  `}
        style={
          !created && status === "ACTIVE"
            ? { textShadow: "0 0 10px rgba(255,255,255,0.8)" }
            : {}
        }
        defaultValue={secretText}
      ></textarea>

      <EraseButton status={status} />
    </div>
  );
};

export default SecretTextArea;
